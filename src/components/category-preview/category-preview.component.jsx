//import { Link } from 'react-router-dom';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles';

import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {
          //only show 1st 4
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
