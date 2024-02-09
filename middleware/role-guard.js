const roleGuard = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: true, message: "Access denied" });
    }
  };
};

module.exports = { roleGuard };
