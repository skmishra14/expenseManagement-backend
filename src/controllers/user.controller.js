import asyncHandler from "../utils/asyncHandler.js";

const working = asyncHandler(async (req, res) => {
    return res.send("Say Hi");
});

export { working };
