import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Scripts.images import ddgs_images
from Scripts.imagefallback import wikimedia_images
from Scripts.videos import ddgs_videos
from Scripts.videosfallback import ytdlp_videos
from Scripts.links import ddgs_links
from urllib.parse import quote_plus
import asyncio
from fastapi.concurrency import run_in_threadpool

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Educational Content API! Use /imglinks, /ytlinks, or /shaalaalinks endpoints with a query parameter."}

@app.get("/imglinks")
async def get_images(query:str = ""):
    query = query
    if not query:
        return {
            "error": "Please provide a 'query' parameter"
        }
    # First DDGs
    images  = ddgs_images(query)

    # Just in case it fails we use fallback
    if len(images) < 3:
        fallback = wikimedia_images(query)

        for img in fallback:
            if img not in images:
                images.append(img)
            if len(images) == 5:
                break

    return {
        "images": images[:5]
    }

@app.get("/ytlinks")
async def get_videos(std: int, query:str = "", limit:int = 5):
    query = query
    if not query:
        return {
            "error": "Please provide a 'query' parameter"
        }
    
    # First DDGs
    videos  = ddgs_videos(query , std , limit)

    # Just in case it fails we use fallback
    if len(videos) < limit:
        fallback = ytdlp_videos(query , std , limit)

        for vid in fallback:
            if vid not in videos:
                videos.append(vid)
            if len(videos) == limit:
                break

    return {
        "videos": videos[:limit]
    }

@app.get("/shaalaalinks")
async def get_links(std: int, query: str = "", limit: int = 2):
    if not query:
        return {"error": "Please provide a 'query' parameter"}

    links = ddgs_links(query, std, limit) or []

    # build relevant fallback
    encoded_query = quote_plus(f"{query} english class {std}")
    fallback_link = f"https://www.shaalaa.com/search?q={encoded_query}"

    # fill until limit
    while len(links) < limit:
        if fallback_link not in links:
            links.append(fallback_link)
        else:
            break

    return {
        "links": links[:limit]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0" , port= 8080)