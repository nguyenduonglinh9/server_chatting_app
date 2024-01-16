const { response } = require("express");
const Invitations = require("../models/invitations");
const mongoose = require("mongoose");

const InvitationsController = {
  createOne: async (req, res, next) => {
    console.log(req.body);
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

  findByTwoid: async (req, res, next) => {
    try {
      const invitation = await Invitations.findOne({
        send_id: req.query.sendID,
        receive_id: req.query.receiveID,
      });
      if (invitation) {
        res.json({
          code: 200,
          message: "Found invitation",
          infor: invitation,
        });
      } else {
        res.json({
          code: 404,
          message: "Invitation not found",
        });
      }
    } catch (error) {
      res.json({
        code: 400,
        message: error.message,
      });
    }
  },
};

module.exports = InvitationsController;
