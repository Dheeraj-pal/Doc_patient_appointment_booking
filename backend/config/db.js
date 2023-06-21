const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://dheerajpal:dheerajpal@cluster0.lzhy20p.mongodb.net/PocoCare?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
