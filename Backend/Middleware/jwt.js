import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authMiddleWare = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({
      message: "Token is not available or expired",
    });
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, token expired or invalid",
    });
  }
};

export default authMiddleWare;
