import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Can't genarate access or refresh Token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get the data of user entered fields
  // validate the required inputs should not be empty
  // check if the user is already exist using username and email
  // store the data to db
  // return the response

  const { fullName, userName, email, salary, password, role } = req.body;
  if (
    [fullName, userName, email, password, role].some(
      (fieldItem) => fieldItem?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Required is empty");
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or userName already exist");
  }

  const user = await User.create({
    fullName: fullName,
    userName: userName.toLowerCase(),
    email: email,
    salary: salary || 0,
    role: role,
    password: password,
  });

  if (!user) {
    throw new ApiError(500, "something went wrong while creating the user");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(201)
    .json(new ApiResponse(200, "Created user successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  // get the details: email, userName, password
  // check if all the 3 are present
  // userName and email should match with any of the user
  // password should match with the entered password
  // genarate access and refresh tokens
  // send the response that user is logged-In
  const { userName, email, password } = req.body;

  if (!email || !userName) {
    throw new ApiError(400, "email or userName is missing");
  }

  if (!password) {
    throw new ApiError(400, "password field can't be empty");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(400, "No user with email or username is present!");
  }
  
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOption: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(201, "User LoggedIn successfully", loggedInUser));
});

export { registerUser, loginUser };
