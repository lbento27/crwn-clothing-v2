import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {
        isLoading ? (
          <Spinner />
        ) : (
          Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return <CategoryPreview key={title} title={title} products={products} />;
          })
        ) //Object.keys gives us an array for each key in the object, array of hats, sneakers
      }
    </Fragment>
  );
};

export default CategoriesPreview;
