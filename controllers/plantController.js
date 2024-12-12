const db = require("../prisma/queries");
const asyncHandler = require("express-async-handler");
const renderErrorPage = require("../helpers/renderErrorPage");
const axios = require("axios");

// Display Plant search form (GET)
exports.plant_search_get = (req, res, next) => {
    res.render("plantSearch", {
        message: ""
    });
}

// Handle Plant search (POST)
exports.plant_search_post = asyncHandler(async(req, res, next) => {
    try {
        const url = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}&q=${req.body.plant}`;
        const response = await axios.get(url);
        const plants = response.data.data;
        if (!plants[0]) {
            return res.render("plantSearch", {
                message: "No plant found with given name. Please try again",
            });
        } else {
            const gardens = await db.getAllGardens(parseInt(req.params.id));
            res.render("plantCreate", {
                gardens,
                plants,
                message: ""
            })
        }
    } catch (err) {
        renderErrorPage(res, err);
    }
})

// Handle Plant create (POST)
exports.plant_create_post = asyncHandler(async(req, res, next) => {
    try {
        const gardens = await db.getAllGardens(parseInt(req.params.id));
        const plant_id = req.body.plant_id;
        const plantUrl = `https://perenual.com/api/species/details/${plant_id}?key=${process.env.PERENUAL_KEY}`;
        const plantResponse = await axios.get(plantUrl);
        const data = plantResponse.data;
        console.log(data);
        if (!data || !data.scientific_name) {
            return res.render("plantSearch", {
                message: "Plant details could not be fetched. Please try again.",
            });
        }
        const existingPlant = await db.getPlantByName(Array.isArray(data.scientific_name) ? data.scientific_name[0] : data.scientific_name);
        if (existingPlant.garden_id === parseInt(req.body.garden_id)) {
            return res.render("plantCreate", {
                gardens,
                plants: [data],
                message: "Plant already exists in that garden. Please select a different garden",
            });
        }
        const plant = await db.createPlant({
            common_name: data.common_name,
            scientific_name: Array.isArray(data.scientific_name) ? data.scientific_name[0] : data.scientific_name,
            cycle: data.cycle,
            watering: data.watering,
            sunlight: data.sunlight,
            image_url: data.image_url,
            indoor: data.indoor,
            poisonous: data.poisonous,
            type: data.type,
            dimensions_min: data.dimensions_min,
            dimensions_max: data.dimensions_max,
            dimensions_unit: data.dimensions_unit,
            pruning_months: data.pruning_months,
            pruning_count_amount: data.pruning_count_amount,
            pruning_count_interval: data.pruning_count_interval,
            hardiness_min: data.hardiness_min,
            hardiness_max: data.hardiness_max,
            flowering_season: data.flowering_season,
            description: data.description,
            growth_rate: data.growth_rate,
            garden_id: parseInt(req.body.garden_id),
        });
        res.redirect(`/planner/plant/${plant.id}`);
    } catch (err) {
        renderErrorPage(res, err);
    }
});

// Return list of all Plants for a Garden (GET)
exports.plant_list = asyncHandler(async(req, res, next) => {
    try {
        const plants = await db.getAllPlants(parseInt(req.params.id));
        res.json(plants);
    } catch (err) {
        renderErrorPage(res, err);
    }
});

// Display detail page for a specific Plant (GET)
exports.plant_detail = asyncHandler(async(req, res, next) => {
    try {
        const plant = await db.getPlantByID(parseInt(req.params.id));
        const garden = await db.getGardenByID(plant.garden_id);
        res.render("plantDetails", { plant, garden });
    } catch (err) {
        renderErrorPage(res, err);
    }
});

// Display Plant update form (GET)
exports.plant_update_get = asyncHandler(async(req, res, next) => {
    try {
        const plant = await db.getPlantByID(parseInt(req.params.id));
        const garden = await db.getGardenByID(plant.garden_id);
        const user = await db.getUserByID(garden.user_id);
        res.render("plantUpdate", {
          plant,
          gardens: user.gardens,
          message: "",
        });
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Handle Plant update (POST)
exports.plant_update_post = asyncHandler(async(req, res, next) => {
    try {
        const garden_id = parseInt(req.body.garden_id);
        const plant = { id: parseInt(req.params.id), garden_id };
        if (!garden_id) {
          const oldPlant = await db.getPlantByID(parseInt(req.params.id));
          const garden = await db.getGardenByID(oldPlant.garden_id);
          const user = await db.getUserByID(garden.user_id);
          return res.render("plantUpdate", {
            plant: oldPlant,
            gardens: user.gardens,
            message: "Garden is required",
          });
        }
        await db.updatePlant(plant);
        res.redirect(`/planner/plant/${plant.id}`);
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Display Plant delete form (GET)
exports.plant_delete_get = asyncHandler(async(req, res, next) => {
    try {
        const plant = await db.getPlantByID(parseInt(req.params.id));
        res.render("plantDelete", { plant });
      } catch (err) {
        renderErrorPage(res, err);
      }
});

// Handle Plant delete (POST)
exports.plant_delete_post = asyncHandler(async(req, res, next) => {
    try {
        await db.deletePlant(parseInt(req.params.id));
        res.render("plantDeleted");
      } catch (err) {
        renderErrorPage(res, err);
      }
});