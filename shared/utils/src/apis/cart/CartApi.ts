import { axiosPrivate } from '../axios';
import { AddCartRequest, AddCartResponse } from './cartType';

export const CartApi = {
  ADD_CARTLINE: async (payload: AddCartRequest): Promise<AddCartResponse> => {
    console.log(axiosPrivate.defaults.headers);
    const response = await axiosPrivate.post('/carts', payload);
    return response.data.data;
  },
};
