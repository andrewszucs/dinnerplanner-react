import React from 'react';

import { GridTile } from 'material-ui/GridList';

import './DishThumbnail.css'

const DishThumbnail = ({ id, name, image, price, subtitle }) => {

  const createActionIcon = price => {
    if(price !== undefined) {
      return <div className="DishThumbnailPrice">{price}</div>
    }
    else {
      return undefined;
    }
  };

  return (
    <div className="DishThumbnail">
      <GridTile
        title={name}
        subtitle={subtitle}
        actionIcon={createActionIcon(price)}
      >
        <div className="DishThumbnailImageContainer" style={{ backgroundImage: `url(${image})`}}></div>
      </GridTile>
    </div>
  );
}

export default DishThumbnail;