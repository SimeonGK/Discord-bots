const { model, Schema } = require("mongoose");

module.exports = model(
  "Royaldatabase",
  new Schema({
    Guild: String,
    User: String,
    Royal_Jelly: Number,
    WeeklyRj: Boolean,
    Pollinator: Boolean,
  })
);
