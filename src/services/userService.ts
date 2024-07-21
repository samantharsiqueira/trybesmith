import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';
import { User } from '../types/User';

interface UserWithProductIds {
  username: string;
  productIds: number[];
}

// Tipar o retorno e nao passar o objeto todo com os dados que preciso no retorno
const getUsers = async (): Promise<UserWithProductIds[]> => {
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel,
      as: 'products', 
      attributes: ['id'],
    }],
  });

  // Para retornar todos, tambem precisa tipar
  const allUsers: UserWithProductIds[] = users.map((user) => {
    // Plain true para pegar somente os dados do objeto
    const userList = user.get({ plain: true }) as User & { products: { id: number }[] };
    return {
      username: userList.username,
      productIds: userList.products.map((product) => product.id),
    };
  });

  return allUsers;
};

export default {
  getUsers,
};