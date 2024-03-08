const fetch = require('node-fetch');
const express = require("express");
const cors = require('cors');
app.use(cors());
const app = express();
const port = 3000;

app.use(express.json());

app.get('/items', async (req, res) => {
    const query = req.query.q;
    const limit = req.query.limit || 4;
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;
    try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error(`Error: ${response.status} - ${response.statusText}`);
       }
       const data = await response.json();
       res.json(data); 
    } catch (error) {
       console.log("Error fetching data:", error);
       res.status(500).send("Internal server error");
    }
   });

app.get("/items/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemUrl = `${BASE_URL}/items/${itemId}`;
    const descriptionUrl = `${BASE_URL}/items/${itemId}/description`;

    const [itemResponse, descriptionResponse] = await Promise.all([
      fetch(itemUrl),
      fetch(descriptionUrl),
    ]);

    if (!itemResponse.ok || !descriptionResponse.ok) {
      throw new Error(
        `Error: ${itemResponse.status} - ${itemResponse.statusText}, ${descriptionResponse.status} - ${descriptionResponse.statusText}`
      );
    }

    const itemData = await itemResponse.json();
    const descriptionData = await descriptionResponse.json();

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
    store.dispatch(setItem(itemResult.item));
    res.json(itemResult);
  } catch (error) {
    console.log("Error fetching item details: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
