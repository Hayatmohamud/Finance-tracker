export const validateZod = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Halkan ka sax: Hubi haddii error.errors uu jiro ka hor intaadan .map dhihin
    const errorMessages = error.errors
      ? error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        }))
      : [{ message: error.message }];

    return res.status(400).json({
      message: "Xogta aad soo dirtay ma saxna",
      errors: errorMessages,
    });
  }
};
