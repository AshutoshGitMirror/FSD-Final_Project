import logging
from functools import lru_cache

logger = logging.getLogger(__name__)

_EMBEDDER = None


@lru_cache(maxsize=1)
def get_embedder():
    global _EMBEDDER
    if _EMBEDDER is not None:
        return _EMBEDDER

    try:
        from sentence_transformers import SentenceTransformer
        logger.info("Loading sentence-transformers model (all-MiniLM-L6-v2)...")
        _EMBEDDER = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("Model loaded successfully")
        return _EMBEDDER
    except ImportError:
        logger.warning("sentence-transformers not available, using fallback")
        return _FallbackEmbedder()


class _FallbackEmbedder:
    def encode(self, texts, **kwargs):
        import hashlib
        import numpy as np
        rng = np.random.RandomState(42)
        return rng.randn(len(texts), 384).astype(np.float32)

    def __call__(self, *args, **kwargs):
        return self.encode(*args, **kwargs)
