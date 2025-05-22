const eventModel = require("../models/eventModel");

const createEventController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the details",
      });
    }
    console.log(req.auth, "req.auth");
    const event = await eventModel({
      title,
      description,
      createdBy: req.auth.id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating event",
      error,
    });
  }
};

module.exports = {
  createEventController,
};
