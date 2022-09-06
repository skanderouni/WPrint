import express from "express";
import asyncHandler from "express-async-handler";
import  {protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password, } = req.body;
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
  );

// REGISTER
userRouter.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { name, email,adress,country,postalCode,phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      adress,
      country,
      postalCode,
      phone,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        adress:user.adress,
        country:user.country,
        postalCode:user.postalCode,
        phone:user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
userRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    console.log(user._id);
    
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.patch(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
// console.log(user)
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.adress = req.body.adress || user.adress;
      user.country = req.body.country || user.country;
      user.postalCode = req.body.postalCode || user.postalCode;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      // console.log(body)
      console.log(updatedUser)

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        adress: updatedUser.adress,
        country: updatedUser.country,
        postalCOde: updatedUser.postalCOde,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// get all users (page and search)
userRouter.get("/all/",
  protect,admin,
  asyncHandler(async (req,res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
      const count = await User.countDocuments({ ...keyword });
      const users = await User.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
        console.log(users);
      res.json({ users, page, pages: Math.ceil(count / pageSize) });
    // const users = await User.find({});
    // console.log(User);
    // res.json(users);
}));


export default userRouter;
