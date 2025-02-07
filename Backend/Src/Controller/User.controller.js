import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import prisma from "../DB/Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Handler : To manage user registration
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    throw new ApiError(404, "Email and Name field is req for Registration");
  }
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existedUser) {
    throw new ApiError(409, "User with Email. already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Register Succesfully"));
};

//Handler : To manage user LogIn
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(404, "email & password is Required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user password");
  }
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged In Successfully", {
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );
};


export {
  registerUser,
  loginUser,
 
};
