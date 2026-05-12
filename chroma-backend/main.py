import logging
import os
import uuid
from pathlib import Path

import chromadb
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from Scripts.embedder import get_embedder

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ChromaBackend - RAG Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_DIR = os.environ.get("CHROMA_DIR", str(Path(__file__).parent / "chroma_data"))
os.makedirs(CHROMA_DIR, exist_ok=True)

client = chromadb.PersistentClient(path=CHROMA_DIR)

try:
    collection = client.get_or_create_collection(
        name="ncert_textbooks",
        metadata={"hnsw:space": "cosine"}
    )
    logger.info(f"ChromaDB ready at {CHROMA_DIR}, collection has {collection.count()} documents")
except Exception as e:
    logger.error(f"ChromaDB init failed: {e}")
    raise


class IngestRequest(BaseModel):
    documents: list[str]
    metadatas: list[dict]
    ids: list[str] | None = None


class SearchRequest(BaseModel):
    query: str
    n_results: int = 3


class EmbedRequest(BaseModel):
    texts: list[str]


@app.get("/health")
def health():
    return {
        "status": "ok",
        "collection_size": collection.count(),
        "collection_name": collection.name
    }


@app.post("/embed")
def embed_text(req: EmbedRequest):
    embedder = get_embedder()
    embeddings = embedder.encode(req.texts, show_progress_bar=False).tolist()
    return {"embeddings": embeddings, "dimension": len(embeddings[0]) if embeddings else 0}


@app.post("/ingest")
def ingest(req: IngestRequest):
    if len(req.documents) != len(req.metadatas):
        raise HTTPException(400, "documents and metadatas must have same length")

    ids = req.ids or [str(uuid.uuid4()) for _ in req.documents]

    embedder = get_embedder()
    embeddings = embedder.encode(req.documents, show_progress_bar=False).tolist()

    collection.add(
        documents=req.documents,
        metadatas=req.metadatas,
        embeddings=embeddings,
        ids=ids
    )

    logger.info(f"Ingested {len(req.documents)} documents. Total: {collection.count()}")
    return {"ingested": len(req.documents), "total": collection.count()}


@app.post("/search")
def search(req: SearchRequest):
    embedder = get_embedder()
    query_emb = embedder.encode([req.query], show_progress_bar=False).tolist()[0]

    results = collection.query(
        query_embeddings=[query_emb],
        n_results=min(req.n_results, collection.count() or 1)
    )

    documents = results.get("documents", [[]])[0] if results.get("documents") else []
    metadatas = results.get("metadatas", [[]])[0] if results.get("metadatas") else []
    distances = results.get("distances", [[]])[0] if results.get("distances") else []

    output = []
    for i in range(len(documents)):
        output.append({
            "document": documents[i],
            "metadata": metadatas[i] if i < len(metadatas) else {},
            "score": round(1 - (distances[i] if i < len(distances) else 0), 4),
        })

    return {"results": output, "query": req.query}


@app.post("/clear")
def clear():
    global collection
    client.delete_collection("ncert_textbooks")
    collection = client.get_or_create_collection(
        name="ncert_textbooks",
        metadata={"hnsw:space": "cosine"}
    )
    logger.info("Collection cleared and recreated")
    return {"status": "cleared", "total": 0}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)
