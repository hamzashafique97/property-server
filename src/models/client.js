const mongooose = require("mongoose");
const Joi = require("joi");

const clientSchema = new mongooose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  cnic: { type: String, required: true },
  plotId: [{ type: mongooose.Schema.Types.ObjectId, ref: "Plot" }],
});

const validateClient = Joi.object()
  .keys({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    cnic: Joi.string().required(),
    plotId: Joi.array().required(),
  })
  .options({ allowUnknown: true });

const Client = mongooose.model("Client", clientSchema);

module.exports = { Client, validateClient };
