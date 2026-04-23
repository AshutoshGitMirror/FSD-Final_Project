import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_DB_PATH = join(__dirname, "../../data/vayusetu.db");

export const initializeDatabase = (dbPath = DEFAULT_DB_PATH) => {
  const db = new Database(dbPath);
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'citizen',
      ward_code TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS wards (
      code TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      vulnerability_index REAL NOT NULL,
      density_index REAL NOT NULL,
      tree_cover_pct REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ward_live_inputs (
      ward_code TEXT PRIMARY KEY,
      pm25 REAL NOT NULL DEFAULT 0,
      pm10 REAL NOT NULL DEFAULT 0,
      no2 REAL NOT NULL DEFAULT 0,
      o3 REAL NOT NULL DEFAULT 0,
      so2 REAL NOT NULL DEFAULT 0,
      co REAL NOT NULL DEFAULT 0,
      last_updated TEXT NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code)
    );

    CREATE TABLE IF NOT EXISTS risk_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ward_code TEXT NOT NULL,
      pm25 REAL NOT NULL,
      pm10 REAL NOT NULL,
      no2 REAL NOT NULL,
      o3 REAL NOT NULL,
      so2 REAL NOT NULL,
      co REAL NOT NULL,
      open_report_count INTEGER NOT NULL,
      computed_score REAL NOT NULL,
      computed_level TEXT NOT NULL,
      top_drivers_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code)
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL,
      severity TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      ward_code TEXT NOT NULL,
      source TEXT NOT NULL,
      priority_score REAL NOT NULL DEFAULT 50,
      reported_at TEXT NOT NULL,
      resolved_at TEXT,
      assigned_to INTEGER,
      created_by INTEGER NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code),
      FOREIGN KEY (assigned_to) REFERENCES users(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS monitoring_stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ward_code TEXT NOT NULL,
      capacity INTEGER NOT NULL,
      current_load INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'active',
      sensors TEXT,
      last_updated TEXT NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code)
    );

    CREATE TABLE IF NOT EXISTS outreach_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ward_code TEXT NOT NULL,
      target_group TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      due_at TEXT NOT NULL,
      notes TEXT,
      assigned_to INTEGER,
      created_by INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code),
      FOREIGN KEY (assigned_to) REFERENCES users(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS advisories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ward_code TEXT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'en',
      priority TEXT NOT NULL,
      public INTEGER NOT NULL DEFAULT 1,
      source_url TEXT,
      created_by INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (ward_code) REFERENCES wards(code),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      actor_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      payload TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (actor_id) REFERENCES users(id)
    );
  `);

  // Seed users
  const userCount = db.prepare("SELECT count(*) as count FROM users").get().count;
  if (userCount === 0) {
    const now = new Date().toISOString();
    db.prepare(`INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES (1, ?, ?, ?, ?, ?)`)
      .run("City Admin", "admin@vayusetu.in", bcrypt.hashSync("Admin@123", 10), "city_admin", now);
    db.prepare(`INSERT INTO users (name, email, password_hash, role, ward_code, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run("Zone Officer - Kurla", "zone.l@vayusetu.in", bcrypt.hashSync("Zone@123", 10), "zone_officer", "L", now);
    db.prepare(`INSERT INTO users (name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)`)
      .run("Dr. Priya Sharma", "health@vayusetu.in", bcrypt.hashSync("Health@123", 10), "health_advisor", now);
  }

  // Seed wards (BMC ward divisions)
  const wardCount = db.prepare("SELECT count(*) as count FROM wards").get().count;
  if (wardCount === 0) {
    const insertWard = db.prepare("INSERT INTO wards (code, name, vulnerability_index, density_index, tree_cover_pct) VALUES (?, ?, ?, ?, ?)");
    const insertInput = db.prepare("INSERT INTO ward_live_inputs (ward_code, pm25, pm10, no2, o3, so2, co, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    const now = new Date().toISOString();
    const bmcWards = [
      ["A", "Churchgate", 0.35, 0.82, 8.2],
      ["B", "Sandhurst Road", 0.52, 0.78, 5.1],
      ["C", "Marine Lines", 0.28, 0.65, 12.4],
      ["D", "Malabar Hill", 0.18, 0.42, 24.8],
      ["E", "Byculla", 0.61, 0.88, 4.6],
      ["F/S", "Parel", 0.55, 0.85, 6.3],
      ["F/N", "Matunga", 0.38, 0.62, 14.1],
      ["G/S", "Worli", 0.32, 0.71, 10.5],
      ["G/N", "Dharavi", 0.82, 0.96, 1.8],
      ["H/E", "Santacruz E", 0.44, 0.73, 9.2],
      ["H/W", "Bandra W", 0.22, 0.58, 16.7],
      ["K/E", "Andheri E", 0.48, 0.81, 7.5],
      ["K/W", "Andheri W", 0.35, 0.68, 11.8],
      ["L", "Kurla", 0.68, 0.91, 3.4],
      ["M/E", "Govandi", 0.78, 0.93, 2.1],
      ["M/W", "Chembur", 0.58, 0.76, 8.8],
      ["N", "Ghatkopar", 0.45, 0.79, 7.9],
      ["P/S", "Goregaon", 0.38, 0.72, 13.2],
      ["P/N", "Malad", 0.42, 0.74, 10.6],
      ["R/S", "Kandivali", 0.36, 0.69, 12.1],
      ["R/C", "Borivali", 0.25, 0.55, 22.4],
      ["R/N", "Dahisar", 0.31, 0.61, 15.3],
      ["S", "Bhandup", 0.40, 0.67, 11.5],
      ["T", "Mulund", 0.33, 0.60, 18.6]
    ];

    db.transaction(() => {
      for (const [code, name, vuln, density, tree] of bmcWards) {
        insertWard.run(code, name, vuln, density, tree);
        // Seed with realistic AQI values (Mumbai averages)
        const basePm25 = 35 + density * 60 + vuln * 30;
        const basePm10 = 55 + density * 80 + vuln * 40;
        insertInput.run(code, basePm25.toFixed(1), basePm10.toFixed(1), (18 + density * 20).toFixed(1), (32 + tree * 0.5).toFixed(1), (8 + density * 6).toFixed(1), (0.4 + density * 0.3).toFixed(2), now);
      }
    })();
  }

  // Seed monitoring stations
  const stationCount = db.prepare("SELECT count(*) as count FROM monitoring_stations").get().count;
  if (stationCount === 0) {
    const insertStation = db.prepare("INSERT INTO monitoring_stations (name, ward_code, capacity, current_load, status, sensors, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const now = new Date().toISOString();
    insertStation.run("Bandra CAAQMS", "H/W", 8, 6, "active", '["PM2.5","PM10","NO2","O3","SO2","CO"]', now);
    insertStation.run("Andheri AQI Station", "K/E", 6, 4, "active", '["PM2.5","PM10","NO2"]', now);
    insertStation.run("Chembur MPCB Station", "M/W", 10, 8, "active", '["PM2.5","PM10","NO2","O3","SO2","CO","Benzene"]', now);
    insertStation.run("Worli Coastal Monitor", "G/S", 5, 3, "active", '["PM2.5","PM10","O3"]', now);
  }

  // Seed advisories
  const advisoryCount = db.prepare("SELECT count(*) as count FROM advisories").get().count;
  if (advisoryCount === 0) {
    const insertAdvisory = db.prepare("INSERT INTO advisories (ward_code, title, message, priority, public, source_url, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    const now = new Date().toISOString();
    insertAdvisory.run(null, "SAFAR AQI Alert — Mumbai", "PM2.5 levels elevated across Mumbai. Sensitive groups should avoid prolonged outdoor activity.", "high", 1, "https://safar.tropmet.res.in/", 1, now);
    insertAdvisory.run("G/N", "Dharavi — Very Unhealthy AQI", "AQI exceeds 200 in Dharavi zone. Industrial emissions and traffic contributing. Masks recommended.", "critical", 1, null, 1, now);
  }

  return db;
};

export const insertAuditLog = (db, { actorId, action, entityType, entityId, payload }) => {
  return db.prepare(`
    INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, payload, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(actorId, action, entityType, entityId, JSON.stringify(payload), new Date().toISOString());
};

export const upsertLiveInput = (db, payload) => {
  return db.prepare(`
    INSERT INTO ward_live_inputs (ward_code, pm25, pm10, no2, o3, so2, co, last_updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(ward_code) DO UPDATE SET
      pm25 = excluded.pm25,
      pm10 = excluded.pm10,
      no2 = excluded.no2,
      o3 = excluded.o3,
      so2 = excluded.so2,
      co = excluded.co,
      last_updated = excluded.last_updated
  `).run(
    payload.wardCode,
    payload.pm25,
    payload.pm10,
    payload.no2,
    payload.o3,
    payload.so2,
    payload.co,
    new Date().toISOString()
  );
};

export const getOpenIncidentCountByWard = (db, wardCode) => {
  return db.prepare("SELECT count(*) as count FROM incidents WHERE ward_code = ? AND status != 'resolved' AND status != 'closed'").get(wardCode).count;
};

export const insertRiskSnapshot = (db, payload) => {
  return db.prepare(`
    INSERT INTO risk_snapshots (ward_code, pm25, pm10, no2, o3, so2, co, open_report_count, computed_score, computed_level, top_drivers_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    payload.wardCode,
    payload.pm25,
    payload.pm10,
    payload.no2,
    payload.o3,
    payload.so2,
    payload.co,
    payload.openReportCount,
    payload.computedScore,
    payload.computedLevel,
    JSON.stringify(payload.topDrivers),
    new Date().toISOString()
  );
};

export const toPublicUser = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    wardCode: row.ward_code
  };
};

export const toStationRecord = (row) => {
  if (!row) return null;
  const utilizationPct = row.capacity > 0
    ? Number(((row.current_load / row.capacity) * 100).toFixed(2))
    : 0;
  return {
    id: row.id,
    name: row.name,
    wardCode: row.ward_code,
    capacity: row.capacity,
    currentLoad: row.current_load,
    utilizationPct,
    status: row.status,
    sensors: JSON.parse(row.sensors || "[]"),
    lastUpdated: row.last_updated
  };
};

export const toIncidentRecord = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    severity: row.severity,
    status: row.status,
    wardCode: row.ward_code,
    source: row.source,
    priorityScore: row.priority_score,
    reportedAt: row.reported_at,
    resolvedAt: row.resolved_at,
    assignedTo: row.assigned_to
  };
};

export const toAdvisoryRecord = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    wardCode: row.ward_code,
    title: row.title,
    message: row.message,
    language: row.language,
    priority: row.priority,
    public: row.public === 1,
    sourceUrl: row.source_url,
    createdBy: row.created_by,
    createdAt: row.created_at
  };
};

export const toTaskRecord = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    wardCode: row.ward_code,
    targetGroup: row.target_group,
    priority: row.priority,
    status: row.status,
    dueAt: row.due_at,
    notes: row.notes,
    assignedTo: row.assigned_to,
    createdBy: row.created_by,
    createdAt: row.created_at
  };
};

// Backward compat aliases
export const toCenterRecord = toStationRecord;
