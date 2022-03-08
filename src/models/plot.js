const mongooose = require("mongoose");
const Joi = require("joi");

const plotSchema = new mongooose.Schema({
  sqft: { type: String, required: true },
  phase: { type: String, required: true },
  catogoery: { type: String, required: true },
  type: {
    type: String,
    enum: ["Residential", "Commercial", "Industrial"],
    required: true,
  },
  issold: { type: Boolean, default: false },
});

const validatePlot = Joi.object().keys({
  sqft: Joi.string().required(),
  phase: Joi.string().required(),
  catogoery: Joi.string().required(),
  type: Joi.string()
    .valid("Residential", "Commercial", "Industrial")
    .required(),
  issold: Joi.boolean(),
});

const Plot = mongooose.model("plot", plotSchema);

module.exports = { Plot, validatePlot };
