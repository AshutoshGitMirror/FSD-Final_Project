import { Router } from "express";

export const createHealthRouter = () => {
  const router = Router();

  router.get("/health", (_request, response) => {
    response.json({
      status: "ok",
      service: "vayusetu-mumbai-api",
      timestamp: new Date().toISOString()
    });
  });

  return router;
};
