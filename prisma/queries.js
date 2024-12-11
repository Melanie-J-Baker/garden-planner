const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser(user) {
    return await prisma.users.create({
        data: {
          username: user.username,
          password: user.password,
        },
      });
}

async function getAllUsers() {
    return await prisma.users.findMany();
}

async function getUserByID(id) {
    return await prisma.users.findUnique({
        include: {
            gardens: true,
        },
        where: {
            id: id
        }
    });
}

async function getUserByUsername(username) {
    const user = await prisma.users.findMany({
        where: {
          username: username,
        },
      });
      return user[0];
}

async function updateUser(user) {
    const data =
    user.username && user.password
      ? { username: user.username, password: user.password }
      : user.username
        ? { username: user.username }
        : { password: user.password };
    return await prisma.users.update({
      where: { id: user.id },
      data: data,
    });
}

async function deleteUser(id) {
    // Find all gardens created by user
  const allGardens = await prisma.gardens.findMany({
    where: {
      user_id: id,
    },
  });
  // Delete all plants in gardens created by user
  allGardens.map(async (garden) => {
    await prisma.plants.deleteMany({
      where: {
        garden_id: garden.id,
      },
    });
  });
  // Delete all gardens created by user
  await prisma.gardens.deleteMany({
    where: {
      user_id: id,
    },
  });
  // Delete user
  await prisma.users.delete({
    where: {
      id: id,
    },
  });
}

async function createGarden(garden) {
    return await prisma.gardens.create({
        data: {
          name: garden.name,
          user_id: garden.user_id,
        },
    });
}

async function getAllGardens(id) {
    return await prisma.gardens.findMany({
        include: {
          plants: true,
        },
        where: {
          user_id: id,
        },
    });
}

async function getGardenByID(id) {
    return await prisma.gardens.findUnique({
        include: {
          plants: true,
        },
        where: {
          id: id,
        },
      });
}

async function getGardenByName(name) {
    const gardens = await prisma.gardens.findMany({
        include: {
          plants: true,
        },
        where: {
          name: name,
        },
      });
      return gardens[0];
}

async function updateGarden(garden) {
    return await prisma.gardens.update({
        where: {
          id: garden.id,
        },
        data: {
          name: garden.name,
        },
    });
}

async function deleteGarden(id) {
    // Delete all plants in garden
  await prisma.plants.deleteMany({
    where: {
      garden_id: id,
    },
  });
  // Delete garden
  await prisma.gardens.delete({
    where: {
      id: id,
    },
  });
}

async function createPlant(plant) {
    return await prisma.plants.create({
        data: plant
    });
}

async function getAllPlants(id) {
    return await prisma.plants.findMany({
        where: {
          garden_id: id,
        },
    });
}

async function getPlantByID(id) {
    return await prisma.plants.findUnique({
        where: {
          id: id,
        },
    });
}

async function getPlantByName(name) {
    const plants = await prisma.plants.findMany({
        where: {
          name: name,
        },
    });
    return plants[0];
}

async function updatePlant(plant) {
    return await prisma.plants.update({
        where: {
          id: plant.id,
        },
        data: plant,
    });
}

async function deletePlant(id) {
    await prisma.plants.delete({
        where: {
          id: id,
        },
      });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    getUserByUsername,
    updateUser,
    deleteUser,
    createGarden,
    getAllGardens,
    getGardenByID,
    getGardenByName,
    updateGarden,
    deleteGarden,
    createPlant,
    getAllPlants,
    getPlantByID,
    getPlantByName,
    updatePlant,
    deletePlant
};