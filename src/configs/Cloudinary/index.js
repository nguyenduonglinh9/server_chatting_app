const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dznigtf2h",
  api_key: "565637355553974",
  api_secret: "WMVyEiylLdfpXhSm9JE7MVJxsp8",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, req.body.image);
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
