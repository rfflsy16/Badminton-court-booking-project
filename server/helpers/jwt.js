import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET || "amanaza";

export const signToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

export const verifyToken = (token) => {
  if(!token){
    throw { name: "Unauthorized" } 
  }
  return jwt.verify(token, secretKey);
};
