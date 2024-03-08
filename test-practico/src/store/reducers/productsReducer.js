const initialState = {
  items: [],
  item: {},
  itemError: false,
  categories: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.payload,
      };
    case "SET_ITEM_ERROR":
      return {
        ...state,
        itemError: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
