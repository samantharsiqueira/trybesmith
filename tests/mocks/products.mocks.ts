type ProductData = {
  id: number;
  name: string;
  price: string;
  userId: number;
};

const addNewProduct = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1,
};

const addNewProductWithId = {
  id: 1,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  userId: 1,
};

const findAllProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    userId: 1,
  },
  {
    id: 2,
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    userId: 1,
  },
  {
    id: 3,
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    userId: 2,
  }
];

const findAllProductsWithMethods = findAllProducts.map(product => ({
  getDataValue: (key: keyof ProductData) => product[key],
}));


export {
  addNewProduct,
  addNewProductWithId,
  findAllProducts,
  findAllProductsWithMethods,
};
