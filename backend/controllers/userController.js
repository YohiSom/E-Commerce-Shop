import User from "../model/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //req.body.email
  //req.body.password

  const user = await User.findOne({ email: email });

  const token = user.createJWT();

  if (user && (await user.comparePassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //req.body.email
  //req.body.password

  const emailExists = await User.findOne({ email: email });

  if (emailExists) {
    res.status(400);
    throw new Error(
      "Email already exists. Please login with email or register with a new email"
    );
  }

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please provide all the values");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  if (user) {
    res.status(201);
    // res.json({ message: "success" });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const profile = asyncHandler(async (req, res) => {
  const userDetails = await User.findById(req.user.userId, "-password");
  // -password means that i will get the object minus the password which i dont want to pass

  if (userDetails) {
    res.json(userDetails);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  //name
  //email
  //password
  const user = await User.findById(req.user.userId);

  const id = { _id: user.id };

  if (!user) {
    res.status(400);
    throw new Error("user not found!");
  }

  if (user) {
    if (req.body.name) {
      await User.findOneAndUpdate(id, { name: req.body.name }, { new: true });
    }
    if (req.body.email) {
      // const emailExists = await User.findOne({ email: req.body.email });

      // if (emailExists) {
      //   res.status(400);
      //   throw new Error(
      //     "You are trying to update an email that already exists in our database. Please try another email!"
      //   );
      // }
      await User.findOneAndUpdate(id, { email: req.body.email }, { new: true });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      await User.findOneAndUpdate(
        id,
        { password: hashPassword },
        { runValidators: true, useFindAndModify: false, new: true }
      );
    }
  }

  const userDetails = await User.findById(req.user.userId, "-password");

  const token = userDetails.createJWT();

  res.json({
    id: userDetails._id,
    name: userDetails.name,
    email: userDetails.email,
    isAdmin: userDetails.isAdmin,
    token,
  });
});

export { userAuth, userRegister, profile, updateProfile };
