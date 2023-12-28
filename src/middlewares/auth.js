var jwt = require("jsonwebtoken");
const keys = require("../keys/index");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("access_token");

  if (!authHeader) {
    return res.json({
      code: 401,
      message: "Lỗi Truyền Request từ Client Vui Lòng Kiểm Tra Lại !",
    });
  } else {
    try {
      const decode = jwt.verify(authHeader, keys.access_token_secret);
      console.log(decode);
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  }
};

module.exports = verifyToken;
