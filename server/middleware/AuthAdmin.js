import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function AuthAdmin(req, res, next) {
  console.log('=== AUTH ADMIN DEBUG ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Request origin:', req.headers.origin);
  console.log('Request headers cookie:', req.headers.cookie);
  console.log('Authorization header:', req.headers.authorization);
  console.log('All cookies:', req.cookies);
  console.log('Specific adtoken cookie:', req.cookies?.adtoken);
  
  // Try to get token from cookies first, then from Authorization header
  let adtoken = req.cookies.adtoken;
  
  if (!adtoken && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      adtoken = authHeader.substring(7);
      console.log('Using token from Authorization header');
    }
  }
  
  if (!adtoken) {
    console.log('No adtoken found in cookies or headers');
    console.log('Available cookies:', Object.keys(req.cookies || {}));
    return res.status(401).json({
      msg: "No token provided, admin authorization denied!",
      success: false,
      debug: {
        cookies: req.cookies,
        headers: req.headers.cookie,
        authorization: req.headers.authorization,
        environment: process.env.NODE_ENV
      }
    });
  }
  
  try {
    console.log('Attempting to verify token...');
    const decoded = jwt.verify(adtoken, process.env.JWT_SECRET);
    console.log('Token verified successfully for admin:', decoded.id);
    req.id = decoded.id;
    req.type = decoded.type;
    next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({
      msg: "Invalid token, authorization denied",
      success: false,
      debug: {
        error: error.message,
        token: adtoken ? 'Token exists but invalid' : 'No token'
      }
    });
  }
}

export default AuthAdmin;
