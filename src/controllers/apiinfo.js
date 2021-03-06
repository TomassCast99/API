const axios = require("axios");
const { Dog } = require("../db");
const { YOUR_API_KEY } = process.env;

const getApiInfo = async () => {
  try {
    const apiUrl = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    apiUrl.data.map(async (e) => {
      await Dog.findOrCreate({
        where: {
          name: e.name,
          //id: e.id,
          weight: e.weight.imperial,
          height: e.height.imperial,
          life_span: e.life_span,
          temperament: e.temperament ? e.temperament : "No tiene temperamento",
          image: e.image.url,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getApiInfo };
