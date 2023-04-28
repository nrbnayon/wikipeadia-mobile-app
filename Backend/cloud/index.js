const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    // cloud_name: process.env.CLOUD_NAME, 
    // api_key: process.env.CLOUD_API_KEY, 
    // api_secret: process.env.CLOUD_SECRET,
    // secure: true,
    cloud_name: "duhq2xow7", 
    api_key: 812485139414855, 
    api_secret: "NQ6GtSeZlPDM0hkZlnIgo3KsYLI",
    secure: true,
  });


module.exports = cloudinary;