import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar majburiy" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email mavjud" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, surname, email, role, password } = req.body;

    const updateData = {
      name,
      surname,
      email,
      role,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    res.json({ message: "User o‘chirildi" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
