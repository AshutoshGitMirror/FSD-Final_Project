export const MUMBAI_WARDS = [
  { code: "A", name: "A Ward - Colaba", population: 185000, vulnerabilityIndex: 0.42, densityIndex: 0.68, treeCoverPct: 12.5 },
  { code: "B", name: "B Ward - Bhuleshwar", population: 232000, vulnerabilityIndex: 0.57, densityIndex: 0.86, treeCoverPct: 6.4 },
  { code: "C", name: "C Ward - Marine Lines", population: 196000, vulnerabilityIndex: 0.46, densityIndex: 0.72, treeCoverPct: 9.8 },
  { code: "D", name: "D Ward - Grant Road", population: 259000, vulnerabilityIndex: 0.61, densityIndex: 0.88, treeCoverPct: 5.9 },
  { code: "E", name: "E Ward - Byculla", population: 274000, vulnerabilityIndex: 0.64, densityIndex: 0.9, treeCoverPct: 7.1 },
  { code: "F/N", name: "F North Ward - Matunga", population: 243000, vulnerabilityIndex: 0.49, densityIndex: 0.74, treeCoverPct: 11.3 },
  { code: "F/S", name: "F South Ward - Parel", population: 266000, vulnerabilityIndex: 0.58, densityIndex: 0.82, treeCoverPct: 8.4 },
  { code: "G/N", name: "G North Ward - Dadar", population: 251000, vulnerabilityIndex: 0.52, densityIndex: 0.79, treeCoverPct: 9.1 },
  { code: "G/S", name: "G South Ward - Worli", population: 228000, vulnerabilityIndex: 0.43, densityIndex: 0.65, treeCoverPct: 13.4 },
  { code: "H/E", name: "H East Ward - Bandra East", population: 302000, vulnerabilityIndex: 0.66, densityIndex: 0.84, treeCoverPct: 7.7 },
  { code: "H/W", name: "H West Ward - Bandra West", population: 219000, vulnerabilityIndex: 0.41, densityIndex: 0.63, treeCoverPct: 14.5 },
  { code: "K/E", name: "K East Ward - Andheri East", population: 359000, vulnerabilityIndex: 0.62, densityIndex: 0.81, treeCoverPct: 8.6 },
  { code: "K/W", name: "K West Ward - Andheri West", population: 334000, vulnerabilityIndex: 0.55, densityIndex: 0.76, treeCoverPct: 10.2 },
  { code: "L", name: "L Ward - Kurla", population: 418000, vulnerabilityIndex: 0.74, densityIndex: 0.93, treeCoverPct: 4.2 },
  { code: "M/E", name: "M East Ward - Govandi", population: 496000, vulnerabilityIndex: 0.81, densityIndex: 0.97, treeCoverPct: 3.5 },
  { code: "M/W", name: "M West Ward - Chembur", population: 341000, vulnerabilityIndex: 0.69, densityIndex: 0.85, treeCoverPct: 6.8 },
  { code: "N", name: "N Ward - Ghatkopar", population: 381000, vulnerabilityIndex: 0.63, densityIndex: 0.83, treeCoverPct: 7.9 },
  { code: "P/N", name: "P North Ward - Malad", population: 437000, vulnerabilityIndex: 0.67, densityIndex: 0.88, treeCoverPct: 6.2 },
  { code: "P/S", name: "P South Ward - Goregaon", population: 362000, vulnerabilityIndex: 0.54, densityIndex: 0.75, treeCoverPct: 11.8 },
  { code: "R/C", name: "R Central Ward - Borivali", population: 352000, vulnerabilityIndex: 0.53, densityIndex: 0.73, treeCoverPct: 12.1 },
  { code: "R/N", name: "R North Ward - Dahisar", population: 297000, vulnerabilityIndex: 0.48, densityIndex: 0.67, treeCoverPct: 13.2 },
  { code: "R/S", name: "R South Ward - Kandivali", population: 388000, vulnerabilityIndex: 0.59, densityIndex: 0.8, treeCoverPct: 8.1 },
  { code: "S", name: "S Ward - Bhandup", population: 409000, vulnerabilityIndex: 0.71, densityIndex: 0.89, treeCoverPct: 5.7 },
  { code: "T", name: "T Ward - Mulund", population: 326000, vulnerabilityIndex: 0.47, densityIndex: 0.7, treeCoverPct: 14.7 }
];

export const DEFAULT_CENTERS = [
  { name: "BMC School Relief Hub - Colaba", wardCode: "A", capacity: 250, currentOccupancy: 72, status: "open", amenities: ["water", "ors", "medical_desk"] },
  { name: "Byculla Community Hall Cooling Center", wardCode: "E", capacity: 320, currentOccupancy: 118, status: "open", amenities: ["water", "rest_area", "first_aid"] },
  { name: "Kurla Night Shelter Cooling Center", wardCode: "L", capacity: 410, currentOccupancy: 356, status: "stretched", amenities: ["water", "ors", "child_support"] },
  { name: "Govandi Transit Camp Relief Site", wardCode: "M/E", capacity: 460, currentOccupancy: 431, status: "stretched", amenities: ["water", "medical_desk", "power_backup"] },
  { name: "Andheri East Sports Complex Hub", wardCode: "K/E", capacity: 300, currentOccupancy: 96, status: "open", amenities: ["water", "rest_area", "mobile_charging"] },
  { name: "Dahisar Civic Shelter Center", wardCode: "R/N", capacity: 220, currentOccupancy: 63, status: "open", amenities: ["water", "ors", "toilets"] }
];
