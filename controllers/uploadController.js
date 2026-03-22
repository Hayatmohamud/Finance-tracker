import cloudinary from "../utils/cloudinary.js";
import User from "../model/User.js";

export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Fadlan soo geli sawir" });

    cloudinary.uploader
      .upload_stream({ folder: "finance_avatars" }, async (error, result) => {
        if (error) return next(error);

        await User.findByIdAndUpdate(req.user.id, {
          profilePicture: result.secure_url,
        });
        res.json({
          message: "Profile picture updated",
          url: result.secure_url,
        });
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
