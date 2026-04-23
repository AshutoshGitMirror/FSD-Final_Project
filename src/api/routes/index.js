import { Router } from "express";
import { createAdvisoryRouter } from "./advisoryRoutes.js";
import { createAlertRouter } from "./alertRoutes.js";
import { createAuthRouter } from "./authRoutes.js";
import { createExternalDataRouter } from "./externalDataRoutes.js";
import { createHealthRouter } from "./healthRoutes.js";
import { createIncidentRouter } from "./incidentRoutes.js";
import { createRiskRouter } from "./riskRoutes.js";
import { createWardRouter } from "./wardRoutes.js";

export const createApiRouter = (ctx) => {
  const router = Router();
  router.use(createHealthRouter(ctx));
  router.use(createAuthRouter(ctx));
  router.use(createWardRouter(ctx));
  router.use(createRiskRouter(ctx));
  router.use(createExternalDataRouter(ctx));
  router.use(createIncidentRouter(ctx));
  router.use(createAdvisoryRouter(ctx));
  router.use(createAlertRouter(ctx));
  return router;
};
