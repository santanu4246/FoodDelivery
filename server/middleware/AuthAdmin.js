import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function AuthAdmin(req, res, next) {
  const adtoken = req.cookies.adtoken;
  
  
  if (!adtoken) {
    return res.status(401).json({
      msg: "No token provided, admin authorization denied!",
      success: false
    });
  }
  try {
    const decoded = jwt.verify(adtoken, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.type = decoded.type;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token, authorization denied",
      success: false
    });
  }
}

export default AuthAdmin;
