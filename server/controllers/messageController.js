import Message from '../models/Message.js';
import { sendNotification } from '../utils/mailer.js';

// CREATE a contact message
export const createMessage = async (req, res) => {
  const { name, email, body } = req.body;

  // 1. Save the message in MongoDB
  const message = await Message.create({
    name,
    email,
    body,
  });

  // 2. Attempt email notification
  try {
    await sendNotification({ name, email, body });
  } catch (err) {
    console.error('Mail failed:', err.message);
  }

  // 3. Respond after the notification attempt
  res.status(201).json({
    message: 'Thanks, your message was sent.',
    id: message._id,
  });
};


// GET all messages
export const listMessages = async (req, res) => {
  const messages = await Message.find().sort({
    createdAt: -1
  });

  res.json(messages);
};

// MARK a message as read
export const markRead = async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  if (!message) {
    return res.status(404).json({
      message: 'Message not found'
    });
  }

  res.json(message);
};

// DELETE a message
export const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(
    req.params.id
  );

  if (!message) {
    return res.status(404).json({
      message: 'Message not found'
    });
  }

  res.json({ message: 'Deleted' });
};
