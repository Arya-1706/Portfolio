
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase()
  });

  const valid =
    user && (await bcrypt.compare(password, user.passwordHash));


  if (!valid) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
};
