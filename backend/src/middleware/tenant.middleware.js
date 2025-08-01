export function setTenant(req, res, next) {
  req.tenantId = req.headers['x-tenant-id'] || null;
  next();
}
