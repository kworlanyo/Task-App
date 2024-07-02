import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import createHttpError from "http-errors";

export default async function authenticateToken(req, res, next) {
  try {
    const { accessCookie, refreshCookie } = req.cookies;

    if (!accessCookie && !refreshCookie) {
      throw new Error("Authentication required. Please log in");
    }

    let token = accessCookie;
    let isAccessToken = true;

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundUser = await User.findById(id);

      if (!foundUser) {
        throw new Error("User not found");
      }

      req.user = foundUser;

      return next();
    } catch (error) {
      isAccessToken = false;
    }

    if (!isAccessToken && refreshCookie) {
      console.log("access token expired");

      token = refreshCookie;
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const foundUser = await User.findById(id);

      if (!foundUser) {
        throw new Error("User not found");
      }

      const newAccessToken = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15s" });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 30,
      };

      res.cookie("accessCookie", newAccessToken, cookieOptions);

      console.log("New access token created");

      req.user = foundUser;

      return next();
    } else {
      throw new Error("Authentication required. Please log in");
    }
  } catch (error) {
    next(createHttpError(401, error.message));
  }
}
