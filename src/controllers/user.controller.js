import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

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

export { registerUser };
