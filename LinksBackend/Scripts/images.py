import os
import requests
from ddgs import DDGS

def ddgs_images(query:str):
    results_list = []
    fallback = False
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
    }

    print(f"Searching for: {query}...")
    try:
        with DDGS() as ddgs:
            # We use .images() for direct image results
            # 'type_image="transparent"' or "clipart" can be used for cleaner diagrams
            results = ddgs.images(
                query = f"{query} labeled diagram for students",
                region="wt-wt",
                type_image="clipart",
                safesearch="moderate",
                max_results=5
            ) # params
            # Extract image URLs from results
            for res in results:
                if "image" in res:
                    results_list.append(res["image"])
        return results_list
    except Exception as e:
        print(f"Error during DDGS search: {e}")
        return []
