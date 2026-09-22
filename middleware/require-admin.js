export const requireAdmin = (request, response, next) => {
  if (request.user.role !== admin) {
    response.status(400).json({ message: "Admin only" });
  } else {
    next();
  }
};
