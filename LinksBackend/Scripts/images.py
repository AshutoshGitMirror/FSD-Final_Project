import logging
from ddgs import DDGS

def ddgs_images(query: str):
    results_list = []
    print(f"Searching for: {query}...")
    try:
        with DDGS() as ddgs:
            results = ddgs.images(
                query=f"{query} labeled diagram for students",
                region="wt-wt",
                type_image="clipart",
                safesearch="moderate",
                max_results=5
            )
            for res in results:
                if "image" in res:
                    results_list.append(res["image"])
        return results_list
    except Exception as e:
        logging.error(f"Error during DDGS image search for '{query}': {e}", exc_info=True)
        return []
