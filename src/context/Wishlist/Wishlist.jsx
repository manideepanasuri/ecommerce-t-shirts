import axios from 'axios';
import { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';

export const wishlistContext = createContext(null);

export default function WishlistContextProvider(props) {
  const { userToken } = useContext(authContext);

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const URL = `${import.meta.env.VITE_BACKEND_HOST}/store/wishlist/`;

  function addToWishlist(id) {
    const data = {
      product_id: id,
    };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };
    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response?.data?.message || error.message || 'Error adding product';
        }),
      {
        loading: 'Adding product to wishlist...',
        success: 'Product added successfully!',
        error: (errMsg) => `${errMsg}`,
      }
    );
  }

  function deleteWishlistItem(id) {
    const config = {
      method: 'delete',
      url: `${URL}?id=${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response?.data?.message || error.message || 'Error removing product';;
        }),
      {
        loading: 'Removing product from wishlist...',
        success: 'Product removed successfully!',
        error: (errMsg) => `Error: ${errMsg}`,
      }
    );
  }

  function getWishlist() {
    let config = {
      method: 'get',
      url: URL,
      headers: headers,
    };

    return axios(config)
      .then((response) => {
       return response.data.data})
      .catch((error) => {
        throw error;
      });
  }

  return (
    <wishlistContext.Provider
      value={{ addToWishlist, getWishlist, deleteWishlistItem }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
