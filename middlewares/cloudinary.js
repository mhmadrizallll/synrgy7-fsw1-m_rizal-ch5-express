const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dgaeoqlao",
  api_key: "297258927634288",
  api_secret: "wZ4imFIhtISDjSDO-J5WNXmbXyk",
});

module.exports = cloudinary;
