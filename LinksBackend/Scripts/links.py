from ddgs import DDGS

def ddgs_links(query:str , std:int , limit:int):
    results = []
    try:
        search_query = f"{query} class {std} site:shaalaa.com"
        with DDGS() as ddgs:
            data = ddgs.text(search_query, max_results=limit)
            for item in data:
                if "shaalaa.com" in item["href"]:
                    results.append(item["href"])
                    if len(results) == limit:
                        break

        return results
    except Exception as e:
        return []
