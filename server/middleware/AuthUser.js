import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function AuthToken(req, res, next) {
  const  token  = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;
    req.name = decoded.name;
    req.cart=decoded.cart
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while verifying token" });
  }
}
export default AuthToken;
