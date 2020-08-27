const Message = require("../../models/Message");
const { body, validationResult } = require("express-validator");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messagesList = await Message.find();
    res.json(messagesList);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again" });
  }
});

router.post(
  "/send",
  [body("name").isLength({ min: 2 }), body("message").isLength({ min: 2 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Your name and message should include more than 2 symbols",
        });
      }
      const data = req.body;
      const newMessage = new Message(data);
      await newMessage.save();
      res.status(201).json({ message: "Your message was added successfully" });
    } catch (error) {
      res.status(500).json({ message: 'Your message wasn"t added' });
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Message.findById(id).remove();
    res.json({ message: "Removed" });
  } catch (error) {
    res.status(404).json({ message: "Message not found" });
  }
});

module.exports = router;
