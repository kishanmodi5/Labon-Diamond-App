import { createContext, useState, useEffect} from 'react';
import Axios, { baseURL } from "../service/jwtAuth";


const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [basketCount, setBasketCount] = useState(0); // Define state for basket count
  const isFetching = { current: false };

  const fetchData = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const response = await Axios.post('user/userbasket', {
        type: 'S',
        stype: 'single'
      });

      if (response.status === 200) {
        setBasketCount(response?.data?.data?.length || 0);
      }
    } catch (err) {
      console.log("Failed to fetch data. Please try again.");
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BasketContext.Provider value={{ basketCount, setBasketCount }}>
      {children}
    </BasketContext.Provider>
  );
};

export { BasketProvider, BasketContext };
