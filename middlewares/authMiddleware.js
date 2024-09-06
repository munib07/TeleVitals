const JWT = require("jsonwebtoken");
const logger = require("../libs/logger");

module.exports = async (req, res, next) => {
  try {
    logger.info(JSON.stringify(req.headers));
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};