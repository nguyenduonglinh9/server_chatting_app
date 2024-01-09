const Conversations = require("../models/conversations");

const conversationsController = {
  createOne: async (req, res, next) => {
    try {
      const newConversation = new Conversations({
        title: req.body.title,
        createdAt: req.body.createdAt,
        members: req.body.members,
        type: req.body.type,
      });

      await newConversation.save();

      res.json({
        code: 200,
        message: "Conversation saved successfully",
      });
    } catch (error) {
      res.json({
        code: 200,
        message: error,
      });
    }
  },
};

module.exports = conversationsController;
