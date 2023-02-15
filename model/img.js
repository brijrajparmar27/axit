const mongoose = require("mongoose");

const ImgSchema = mongoose.Schema(
  {
    msg: String
  },{
    timestamps:true
  },
  { collection: "Image" }
);

module.exports = mongoose.model("Image", ImgSchema);
