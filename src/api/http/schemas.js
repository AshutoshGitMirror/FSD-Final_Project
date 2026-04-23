import { z } from "zod";

export const roleEnum = z.enum([
  "city_admin",
  "zone_officer",
  "health_advisor",
  "citizen"
]);

export const severityEnum = z.enum(["low", "moderate", "high", "hazardous"]);
export const incidentStatusEnum = z.enum(["open", "investigating", "assigned", "resolved", "closed"]);
export const stationStatusEnum = z.enum(["active", "degraded", "offline"]);
export const advisoryPriorityEnum = z.enum(["low", "moderate", "high", "critical"]);
export const taskStatusEnum = z.enum(["open", "in_progress", "completed"]);
export const taskPriorityEnum = z.enum(["low", "moderate", "high", "critical"]);

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8),
  role: roleEnum.default("citizen"),
  wardCode: z.string().min(1).max(8).nullable().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const liveInputSchema = z.object({
  wardCode: z.string().min(1).max(8),
  pm25: z.number().min(0).max(500),
  pm10: z.number().min(0).max(600),
  no2: z.number().min(0).max(400),
  o3: z.number().min(0).max(400),
  so2: z.number().min(0).max(300),
  co: z.number().min(0).max(50)
});

export const incidentSchema = z.object({
  title: z.string().min(6).max(180),
  description: z.string().min(12).max(2000),
  type: z.string().min(2).max(60),
  severity: severityEnum,
  wardCode: z.string().min(1).max(8),
  source: z.string().min(2).max(60),
  priorityScore: z.number().min(0).max(100).optional()
});

export const advisorySchema = z.object({
  wardCode: z.string().min(1).max(8).nullable().optional(),
  title: z.string().min(3).max(180),
  message: z.string().min(10).max(3000),
  language: z.string().min(2).max(10).default("en"),
  priority: advisoryPriorityEnum.default("moderate"),
  public: z.boolean().default(true),
  sourceUrl: z.string().url().nullable().optional()
});

export const stationSchema = z.object({
  name: z.string().min(4).max(180),
  wardCode: z.string().min(1).max(8),
  capacity: z.number().int().min(1).max(50),
  currentLoad: z.number().int().min(0).max(50),
  status: stationStatusEnum,
  sensors: z.array(z.string().min(2).max(60)).min(1).max(20)
});

export const stationUpdateSchema = z.object({
  currentLoad: z.number().int().min(0).max(50).optional(),
  status: stationStatusEnum.optional()
});

export const taskSchema = z.object({
  wardCode: z.string().min(1).max(8),
  targetGroup: z.string().min(3).max(120),
  priority: taskPriorityEnum,
  status: taskStatusEnum.default("open"),
  dueAt: z.string().datetime(),
  notes: z.string().min(4).max(1000),
  assignedTo: z.number().int().positive().optional().nullable()
});

export const statusPatchSchema = z.object({
  status: z.union([incidentStatusEnum, taskStatusEnum])
});

export const assignIncidentSchema = z.object({
  assignedTo: z.number().int().positive()
});

// Backward compat
export const centerSchema = stationSchema;
export const centerUpdateSchema = stationUpdateSchema;
export const centerStatusEnum = stationStatusEnum;
