import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

interface UserWithProductIds {
  username: string;
  productIds: number[];
}

// Tipar o retorno e nao passar o objeto todo com os dados que preciso no retorno
const getUsers = async (): Promise<UserWithProductIds[]> => {
  const users = await UserModel.findAll();
  const products = await ProductModel.findAll();

  // Para retornar todos, tambem precisa tipar
  const allUsers: UserWithProductIds[] = users.map((user) => {
    const productsIds = products
      .filter((product) => product.dataValues.userId === user.dataValues.id)
      .map((product) => product.dataValues.id);

    return {
      username: user.dataValues.username,
      productIds: productsIds,
    };
  });

  return allUsers;
};

export default {
  getUsers,
};