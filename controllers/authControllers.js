import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const getAllUsers = async (req, res) => {
  try {
    // .select('-password') waxay ka dhigan tahay password-ka ha soo tusin
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Cillad baa dhacday" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hubi in xogtu soo gaartay
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fadlan buuxi meelaha banaan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      _id: user._id,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ token: generateToken(user._id, user.role) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// controllers/authControllers.js dhexdiisa ku dar:

export const getProfile = async (req, res, next) => {
    try {
        // req.user wuxuu ka imaanayaa auth middleware-kaaga
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User ma jiro" });
        
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Update User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User-ka lama helin" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User-ka lama helin" });
    res.json({ message: "User-ka waa la tirtiray" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
