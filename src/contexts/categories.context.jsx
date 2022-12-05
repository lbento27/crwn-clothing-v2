import { createContext, useState, useEffect } from 'react'; // eslint-disable-line

//import PRODUCTS from '../shop-data.json';
//import SHOP_DATA from '../shop-data';
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //only use once to send our data to ou firestore database
  /*
  useEffect(() => {
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);
*/
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
