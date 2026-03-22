import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Magaca waa khasab"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email-ka waa khasab"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password-ka waa khasab"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Wuxuu si otomaatig ah u samaynayaa createdAt iyo updatedAt
  },
);

const User = mongoose.model("User", userSchema);
export default User;
