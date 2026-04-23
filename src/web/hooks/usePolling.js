import { useEffect } from "react";

export const usePolling = (callback, intervalMs, enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const id = setInterval(() => {
      callback();
    }, intervalMs);

    return () => clearInterval(id);
  }, [callback, intervalMs, enabled]);
};
