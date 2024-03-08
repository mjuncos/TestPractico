const axios = require("axios");

const BASE_URL = "https://api.mercadolibre.com";

const getItems = async (req, res) => {
  const { q } = req.query;

  try {
    const url = `${BASE_URL}/sites/MLA/search?q=${q}&limit=4`;

    const response = await axios.get(url);

    const data = response.data;

    const result = {
      author: {
        name: "Juan Martin",
        lastname: "Juncos Gomes",
      },
      categories:
        data.filters.length > 0
          ? data.filters[0].values[0].path_from_root.map(
              (category) => category.name
            )
          : [],
      items: data.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: item.price % 1,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const itemUrl = `${BASE_URL}/items/${itemId}`;
    const descriptionUrl = `${BASE_URL}/items/${itemId}/description`;

    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(itemUrl),
      axios.get(descriptionUrl),
    ]);

    if (!itemResponse || !descriptionResponse) {
      throw new Error("Error fetching item details");
    }

    const itemData = itemResponse.data;
    const descriptionData = descriptionResponse.data;

    const itemResult = {
      author: {
        name: "Juan Martin",
        lastname: "Juncos Gomes",
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.floor(itemData.price),
          decimals: itemData.price % 1,
        },
        picture: itemData.pictures[0],
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: descriptionData.plain_text,
      },
    };
    res.json(itemResult);
  } catch (error) {
    console.log("Error fetching item details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getItems,
  getItem,
};
