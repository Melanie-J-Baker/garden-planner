const pool = require("./pool");

async function createUser(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
}

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function getUser(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows;
}

async function updateUser(id, username, password) {
    if (username && password) {
        await pool.query("UPDATE users SET username = $1, password = $2 WHERE id = $3", [username, password, id]);
    } else if (!username && password) {
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [password, id]);
    } else if (!password && username) {
        await pool.query("UPDATE users SET username = $1 WHERE id = $2", [username, id])
    }
}

async function deleteUser(id) {
    await pool.query("DELETE * FROM users WHERE id = $1", [id]);
}

async function createGarden(user_id, name) {
    await pool.query("INSERT INTO gardens (user_id, name) VALUES ($1, $2)", [user_id, name]);
}

async function getAllGardens(user_id) {
    const { rows } = await pool.query("SELECT * FROM gardens WHERE user_id = $1", [user_id]);
    return rows;
}

async function getGarden(id) {
    const { rows } = await pool.query("SELECT * FROM gardens WHERE id = $1", [id]);
    return rows;
}

async function updateGarden(id, name) {
    await pool.query("UPDATE gardens SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteGarden(id) {
    await pool.query("DELETE * FROM gardens WHERE id = $1", [id]);
}

async function createPlant(garden_id, common_name, scientific_name, cycle, watering, sunlight, image_url, indoor, poisonous, type, dimensions_min, dimensions_max, dimensions_unit, pruning_months, pruning_count_amount, pruning_count_interval, hardiness_min, hardiness_max, flowering_season, description, growth_rate) {
    await pool.query("INSERT INTO plants (garden_id, common_name, scientific_name, cycle, watering, sunlight, image_url, indoor, poisonous, type, dimensions_min, dimensions_max, dimensions_unit, pruning_months, pruning_count_amount, pruning_count_interval, hardiness_min, hardiness_max, flowering_season, description, growth_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21", [garden_id, common_name, scientific_name, cycle, watering, sunlight, image_url, indoor, poisonous, type, dimensions_min, dimensions_max, dimensions_unit, pruning_months, pruning_count_amount, pruning_count_interval, hardiness_min, hardiness_max, flowering_season, description, growth_rate]);
}

async function getAllPlants(garden_id) {
    const { rows } = await pool.query("SELECT * FROM plants WHERE garden_id = $1", [garden_id]);
    return rows;
}

async function getPlant(id) {
    const { rows } = await pool.query("SELECT * FROM plants WHERE id = $1", [id]);
    return rows;
}

async function updatePlant(id, garden_id) {
    await pool.query("UPDATE plants SET garden_id = $1 WHERE id = $2", [garden_id, id]);
}

async function deletePlant(id) {
    await pool.query("DELETE * FROM plants WHERE id = $1", [id]);
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    createGarden,
    getAllGardens,
    getGarden,
    updateGarden,
    deleteGarden,
    createPlant,
    getAllPlants,
    getPlant,
    updatePlant,
    deletePlant
};