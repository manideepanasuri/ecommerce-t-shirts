import { useContext, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import axios from 'axios';

export default function Orders() {
  const { userToken, setUserToken } = useContext(authContext);
  const [data, setData] = useState();
  function getOrders() {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const URL = `${import.meta.env.VITE_BACKEND_HOST}/orders/orders/`;
    let config = {
      method: 'get',
      url: `${URL}`,
      headers: headers,
    };
    axios
      .request(config)
      .then((resp) => {
        setData(resp.data.data);
      })
      .catch((err) => {
        throw err;
        
      });
  }
  useEffect(() => {
    getOrders();
  }, []);

  function getStatus(status){
    if (status==='processing'||status==='pending'){
      return 'bg-yellow-400 py-1 px-3 text-center rounded-full text-white';
    }
    else if (status==='shipped'){
      return 'bg-yellow-500 py-1 px-3 text-center rounded-full text-white';
    }
    else if(status==='delivered'){
      return 'bg-green-600 py-1 px-3 text-center rounded-full text-white'
    }
    else{
      return 'bg-red-800 py-1 px-3 text-center rounded-full text-white';
    }
  }

  return (
    <div className="container flex flex-wrap">
      <div className='w-full'>
        {data?
        data.map((orders,index)=>{
          return (
          <div key={orders.id} className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order  {index+1}
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          {orders.orderItems ? (
            orders.orderItems.map((order) => {
              return (
                <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Link to={`/product/${order.productVariation.product}`}>
                        <img
                          src={order.productVariation.images[0].image}
                          className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                          alt="Apple Watch"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <Link
                        to={`/product/${order.productVariation.product}`}
                        className="hover:underline"
                      >
                        {order.productVariation.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            disabled
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={order.quantity}
                            required
                          />
                        </div>
                        
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={getStatus(orders.status)+' capitalize'}>
                        { orders.status}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Rs {order.price }
                    </td>
                  </tr>
              );
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="py-4">
                  <div>
                    <Spinner />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
        </div>
        )}
        )     
        :<></>}
      </div>
    </div>
  );
}
