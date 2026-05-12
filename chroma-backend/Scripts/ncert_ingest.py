import json
import logging
import re
import sys
from pathlib import Path

logger = logging.getLogger(__name__)

try:
    import pdfplumber
except ImportError:
    pdfplumber = None


def extract_text_from_pdf(pdf_path: str) -> str:
    if pdfplumber is None:
        logger.warning("pdfplumber not installed, using placeholder text")
        return f"[PDF extraction requires pdfplumber: {pdf_path}]"

    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                text += page_text + "\n"
    except Exception as e:
        logger.error(f"Failed to extract {pdf_path}: {e}")
        return ""

    return text.strip()


def chunk_text(text: str, chunk_size_words: int = 500, overlap_words: int = 50) -> list[str]:
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        end = min(i + chunk_size_words, len(words))
        chunk = " ".join(words[i:end])
        chunks.append(chunk)
        i += chunk_size_words - overlap_words
        if end == len(words):
            break
    return chunks


def prepare_ncert_ingest(
    pdf_dir: str = "ncert-pdfs",
    output_file: str | None = None
) -> list[dict]:
    pdf_path = Path(pdf_dir)
    if not pdf_path.exists():
        logger.warning(f"PDF directory not found: {pdf_dir}")
        return []

    documents = []
    for pdf_file in sorted(pdf_path.glob("*.pdf")):
        logger.info(f"Processing {pdf_file.name}...")
        text = extract_text_from_pdf(str(pdf_file))
        if not text:
            continue

        chunks = chunk_text(text)
        for chunk_idx, chunk_text_content in enumerate(chunks):
            documents.append({
                "document": chunk_text_content,
                "metadata": {
                    "source": pdf_file.name,
                    "chunk_index": chunk_idx,
                    "total_chunks": len(chunks),
                }
            })

    logger.info(f"Prepared {len(documents)} chunks from {len(list(pdf_path.glob('*.pdf')))} PDFs")

    if output_file:
        with open(output_file, "w") as f:
            json.dump(documents, f, indent=2)
        logger.info(f"Saved ingest data to {output_file}")

    return documents


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    pdf_dir = sys.argv[1] if len(sys.argv) > 1 else "ncert-pdfs"
    out = sys.argv[2] if len(sys.argv) > 2 else None
    prepare_ncert_ingest(pdf_dir, out)
