//const Garden = require("../models/garden");
const asyncHandler = require("express-async-handler");

// Display list of all Gardens for a User (GET)
exports.garden_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden List");
});
// Display detail page for a specific Garden
exports.garden_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: Garden detail: ${req.params.id}`);
});
// Display Garden create form (GET)
exports.garden_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden create GET");
});
// Handle Garden create (POST)
exports.garden_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden create POST");
});
// Display Garden update form (GET)
exports.garden_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden update GET");
});
// Handle Garden update (POST)
exports.garden_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden update POST");
});
// Display Garden delete form (GET)
exports.garden_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden delete GET");
});
// Handle Garden delete (POST)
exports.garden_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Garden delete POST");
});