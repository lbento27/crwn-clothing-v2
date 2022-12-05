//import React from "react";//i do this to have react snippets in vscode
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';

import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link to={`/shop/${title}`}>
          <p>Shop Now</p>
        </Link>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
