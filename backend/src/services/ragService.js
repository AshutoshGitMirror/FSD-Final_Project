const CHROMA_URL = process.env.CHROMA_URL || 'http://127.0.0.1:8081';

async function search(query, nResults = 3) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(`${CHROMA_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, n_results: nResults }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`ChromaDB search failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn('ChromaDB search timed out (1.5s), skipping RAG');
    } else {
      console.warn('ChromaDB unavailable, skipping RAG:', err.message);
    }
    return null;
  }
}

async function buildContext(query) {
  const results = await search(query);
  if (!results || results.length === 0) return null;

  const sources = [];
  const context = results
    .filter(r => (r.similarity ?? r.score ?? 0) > 0.5)
    .map((r, i) => {
      const source = r.metadata?.source || 'reference';
      if (!sources.includes(source)) sources.push(source);
      return `[Source ${i + 1}] ${r.document}`;
    })
    .join('\n\n');

  if (!context) return null;

  return {
    context,
    sources,
    resultCount: results.length
  };
}

async function health() {
  try {
    const res = await fetch(`${CHROMA_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

module.exports = { search, buildContext, health };
