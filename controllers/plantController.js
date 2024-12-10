//const Plant = require("../models/plant");
const asyncHandler = require("express-async-handler");

// Display list of all Plants for a Garden (GET)
exports.plant_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant List");
});
// Display detail page for a specific Plant (GET)
exports.plant_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: Plant detail: ${req.params.id}`);
});
// Display Plant create form (GET)
exports.plant_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant create GET");
});
// Handle Plant create (POST)
exports.plant_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant create POST");
});
// Display Plant update form (GET)
exports.plant_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant update GET");
});
// Handle Plant update (POST)
exports.plant_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant update POST");
});
// Display Plant delete form (GET)
exports.plant_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant delete GET");
});
// Handle Plant delete (POST)
exports.plant_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Plant delete POST");
});