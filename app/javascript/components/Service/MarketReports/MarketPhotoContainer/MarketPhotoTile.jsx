import React from "react";
import { FadeInRight } from "../../../Constants/Constants";
import { DeleteButton } from "../../../Constants/Buttons";

const MarketPhotoTile = ({ photo, hide, handleDelete }) => {
  return (
    <div className="pb-3 ">
      <FadeInRight>
        <div className="parent1 m-0 imageShadow">
          <figure className="child1 particles">
            <img
              className="portfolioImage card-img-top"
              src={photo}
              alt="Market report photo"
            />
          </figure>
          {hide && (
            <div className="portfolioTitle">
              <DeleteButton onClick={handleDelete} />
            </div>
          )}
        </div>
      </FadeInRight>
    </div>
  );
};

export default MarketPhotoTile;
