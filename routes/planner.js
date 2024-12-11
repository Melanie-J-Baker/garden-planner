const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const garden_controller = require("../controllers/gardenController");
const plant_controller = require("../controllers/plantController");

// USER ROUTES

// Display welcome page (GET)
router.get("/", user_controller.index);

// Display User create form (GET)
router.get("/user/create", user_controller.user_create_get);

// Handle User create (POST)
router.post("/user/create", user_controller.user_create_post);

// Display User login form (GET)
router.get("/user/login", user_controller.user_login_get);

// Handle User login (POST)
router.post("/user/login", user_controller.user_login_post);

// Logout confirmation on GET
router.get("/user/logout/confirm", user_controller.user_logout_confirm_get);

// Handle User log out on GET
router.get("/user/logout", user_controller.user_logout_get);

// Return details of all users (GET)
router.get("/users", user_controller.user_list);

// Return details for a specific User (GET)
router.get("/user/:id", user_controller.user_detail);

// Display User details page (GET)
router.get("/user/:id/home", user_controller.user_home_get);

// Display User update form (GET)
router.get("/user/:id/update", user_controller.user_update_get);

// Handle User update (POST)
router.post("/user/:id/update", user_controller.user_update_post);

// Display User delete form (GET)
router.get("/user/:id/delete", user_controller.user_delete_get);

// Handle User delete (POST)
router.post("/user/:id/delete", user_controller.user_delete_post);

// GARDEN ROUTES

// Display Garden create form (GET)
router.get("/user/:id/garden/create", garden_controller.garden_create_get);

// Handle Garden create (POST)
router.post("/user/:id/garden/create", garden_controller.garden_create_post);

// Display list of all Gardens for a User (GET)
router.get("/user/:id/gardens", garden_controller.garden_list);

// Display detail page for a specific Garden (GET)
router.get("/garden/:id", garden_controller.garden_detail);

// Display Garden update form (GET)
router.get("/garden/:id/update", garden_controller.garden_update_get);

// Handle Garden update (POST)
router.post("/garden/:id/update", garden_controller.garden_update_post);

// Display Garden delete form (GET)
router.get("/garden/:id/delete", garden_controller.garden_delete_get);

// Handle Garden delete (POST)
router.post("/garden/:id/delete", garden_controller.garden_delete_post);

// PLANT ROUTES

// Display Plant create form (GET)
router.get("/garden/:id/plant/create", plant_controller.plant_create_get);

// Handle Plant create (POST)
router.post("/garden/:id/plant/create", plant_controller.plant_create_post);

// Display list of all Plants for a Garden (GET)
router.get("/garden/:id/plants". plant_controller.plant_list);

// Display detail page for a specific Plant (GET)
router.get("/plant/:id", plant_controller.plant_detail);

// Display Plant update form (GET)
router.get("/plant/:id/update", plant_controller.plant_update_get);

// Handle Plant update (POST)
router.post("/plant/:id/update", plant_controller.plant_update_post);

// Display Plant delete form (GET)
router.get("/plant/:id/delete", plant_controller.plant_delete_get);

// Handle Plant delete (POST)
router.post("/plant/:id/delete", plant_controller.plant_delete_post);

module.exports = router;