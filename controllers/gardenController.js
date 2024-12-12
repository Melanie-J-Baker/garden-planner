const db = require("../prisma/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const renderErrorPage = require("../helpers/renderErrorPage");

// Display Garden create form (GET)
exports.garden_create_get = (req, res, next) => {
    res.render("gardenCreate", { message: "" });
  }

// Handle Garden create (POST)
exports.garden_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Name must be provided. Maximum 100 characters"),
  // Process request after validation and sanitisation
  asyncHandler(async (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("gardenCreate", {
        message: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    try {
      const user_id = parseInt(req.params.id);
      const gardenExists = await db.getGardenByName(req.body.name);
      if (gardenExists) {
        return res.render("gardenCreate", {
          message: "A garden with that name already exists",
        });
      }
      const newGarden = await db.createGarden({
        name: req.body.name,
        user_id: user_id,
        plants: [],
      });
      res.redirect(`/planner/garden/${newGarden.id}`);
    } catch (err) {
      renderErrorPage(res, err);
    }
  }),
];

// Display list of all Gardens for a User (GET)
exports.garden_list = asyncHandler(async(req, res, next) => {
    try {
        const gardens = await db.getAllGardens(parseInt(req.params.id));
        res.json(gardens);
    } catch (err) {
    renderErrorPage(res, err);
    }
});

// Display detail page for a specific Garden (GET)
exports.garden_detail = asyncHandler(async(req, res, next) => {
    try {
        const garden = await db.getGardenByID(parseInt(req.params.id));
        res.render("gardenDetails", {
          garden,
          plants: garden.plants,
        });
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Display Garden update form (GET)
exports.garden_update_get = asyncHandler(async(req, res, next) => {
    try {
        const garden = await db.getGardenByID(parseInt(req.params.id));
        res.render("gardenUpdate", {
          garden,
          message: "",
        });
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Handle Garden update (POST)
exports.garden_update_post = [
    body("name")
      .trim()
      .isLength({ min: 1, max: 100 })
      .escape()
      .withMessage("Name must be provided. Maximum 100 characters"),
    // Process request after validation and sanitisation
    asyncHandler(async (req, res, next) => {
      const garden = await db.getGardenByID(parseInt(req.params.id));
      // Extract validation errors from a request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.render("gardenUpdate", {
          garden,
          message: errors
            .array()
            .map((err) => err.msg)
            .join(", "),
        });
      }
      try {
        const existingGarden = await db.getGardenByName(req.body.name);
        const garden_id = parseInt(req.params.id);
        if (existingGarden && existingGarden.id !== garden_id) {
          return res.render("gardenUpdate", {
            message: "A garden with that name already exists",
          });
        }
        await db.updateGarden({
          id: garden_id,
          name: req.body.name,
        });
        res.redirect(`/planner/garden/${garden_id}`);
      } catch (err) {
        renderErrorPage(res, err);
      }
    }),
  ];
// Display Garden delete form (GET)
exports.garden_delete_get = asyncHandler(async(req, res, next) => {
    try {
        const garden = await db.getGardenByID(parseInt(req.params.id));
        res.render("gardenDelete", { garden });
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Handle Garden delete (POST)
exports.garden_delete_post = asyncHandler(async(req, res, next) => {
    try {
        await db.deleteGarden(parseInt(req.params.id));
        res.render("gardenDeleted");
      } catch (err) {
        renderErrorPage(res, err);
      }
});