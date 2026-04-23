export const parsePayload = (schema, payload, response) => {
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    response.status(400).json({
      error: "Validation failed",
      details: parsed.error.issues.map((issue) => issue.message)
    });
    return null;
  }
  return parsed.data;
};

export const readWardOrNull = (auth) => {
  if (!auth) {
    return null;
  }
  if (auth.role === "city_admin") {
    return null;
  }
  return auth.wardCode ?? null;
};

export const safeWardScope = (auth, requestedWardCode) => {
  const scopedWard = readWardOrNull(auth);
  if (!scopedWard) {
    return requestedWardCode ?? null;
  }
  return scopedWard;
};
