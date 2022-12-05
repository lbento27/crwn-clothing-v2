//import React from "react";//i do this to have react snippets in vscode
import './directory-item.styles.scss';
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className='directory-item-container'>
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='body'>
        <h2>{title.toUpperCase()}</h2>
        <Link to={`/shop/${title}`}>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

export default DirectoryItem;
