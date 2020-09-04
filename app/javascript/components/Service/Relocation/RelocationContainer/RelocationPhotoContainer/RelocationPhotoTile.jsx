import React from "react";
import { FadeInRight } from "../../../../Constants/Constants";
import { DeleteButton } from "../../../../Constants/Buttons";

const RelocationPhotoTile = ({ photo, hide, handleDelete }) => {
  return (
    <div className="pb-3">
      <FadeInRight>
        <div className="parent1 m-0 imageShadow">
          <div className="child1 particles">
            <img
              className="portfolioImage card-img-top"
              src={photo}
              alt="a photo filler for relocation path"
            />
          </div>
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

export default RelocationPhotoTile;
