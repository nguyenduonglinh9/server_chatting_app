const Invitations = require("../models/invitations");

const InvitationsController = {
  createOne: async (req, res, next) => {
    const newInvitation = new Invitations({
      send_id: req.body.send_id,
      receive_id: req.body.receive_id,
      createdAt: req.body.createdAt,
      status: req.body.status,
    });
    try {
      await newInvitation.save();
      res.json({
        code: 200,
        message: "Create invitation successfully",
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error,
      });
    }
  },
};

module.exports = InvitationsController;
