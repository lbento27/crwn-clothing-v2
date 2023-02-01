import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, Title } from './category.styles';

import { CategoryPreviewContainer } from '../../components/category-preview/category-preview.styles';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    //<Fragment>
    <CategoryPreviewContainer>
      <Title>{category.toLocaleUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
        </CategoryContainer>
      )}
    </CategoryPreviewContainer>
    //</Fragment>
  );
};

export default Category;
