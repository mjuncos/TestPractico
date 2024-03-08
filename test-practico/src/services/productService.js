import axios from "axios";
import store from "../store";
import { setCategories, setItem, setItemError, setItems } from "../store/actions/actions";

export const getProducts = async (query) => {
  await axios
    .get(`http://localhost:3001/api/items?q=${query}`)
    .then((response) => {
      store.dispatch(setItems(response.data.items));
      store.dispatch(setCategories(response.data.categories));
    })
    .catch((error) => {
      console.log("Error fetching items:", error);
    });
};

export const getProduct = async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/items/${query}`
    );
    store.dispatch(setItem(response.data.item));
    return response.data;
  } catch (error) {
    store.dispatch(setItemError(true));
    console.log("Error fetching item:", error);
  }
};
