import hashlib
import logging
from functools import lru_cache

logger = logging.getLogger(__name__)

_EMBEDDER = None


@lru_cache(maxsize=1)
def get_embedder():
    global _EMBEDDER
    if _EMBEDDER is not None and not isinstance(_EMBEDDER, _FallbackEmbedder):
        return _EMBEDDER

    try:
        from sentence_transformers import SentenceTransformer
        logger.info("Loading sentence-transformers model (all-MiniLM-L6-v2)...")
        _EMBEDDER = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("Model loaded successfully")
        return _EMBEDDER
    except ImportError:
        logger.warning("sentence-transformers not available, using deterministic hash fallback")
        _EMBEDDER = _FallbackEmbedder()
        return _EMBEDDER


class _FallbackEmbedder:
    DIM = 384

    def encode(self, texts, **kwargs):
        import numpy as np
        out = np.zeros((len(texts), self.DIM), dtype=np.float32)
        for i, text in enumerate(texts):
            h = hashlib.sha256(text.encode("utf-8")).digest()
            seed = int.from_bytes(h[:4], "little")
            rng = np.random.RandomState(seed)
            out[i] = rng.randn(self.DIM).astype(np.float32)
        return out

    def __call__(self, *args, **kwargs):
        return self.encode(*args, **kwargs)
