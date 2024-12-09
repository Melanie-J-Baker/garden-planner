//const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Display welcome page (GET)
exports.index = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});
// Display list of all users (GET)
exports.user_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User List");
});
// Display detail page for a specific User
exports.user_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
});
// Display User create form (GET)
exports.user_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User create GET");
});
// Handle User create (POST)
exports.user_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User create POST");
});
// Display User update form (GET)
exports.user_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User update GET");
});
// Handle User update (POST)
exports.user_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User update POST");
});
// Display User delete form (GET)
exports.user_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User delete GET");
});
// Handle User delete (POST)
exports.user_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: User delete POST");
});