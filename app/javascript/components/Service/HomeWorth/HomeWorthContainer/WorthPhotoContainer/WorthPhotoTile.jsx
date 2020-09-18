import React from "react";
import { FadeInLeft } from "../../../../Constants/Constants";
import { DeleteButton } from "../../../../Constants/Buttons";

const WorthPhotoTile = ({ id, photo, hide, handleDelete }) => {
  return (
    <div className="pb-3 image-hide" key={id}>
      <FadeInLeft>
        <div className="parent1 m-0 imageShadow">
          <figure className="child1 particles">
            <img
              className="portfolioImage card-img-top"
              src={photo}
              alt={`Home worth photo ` + id}
            />
          </figure>
          {hide && (
            <div className="portfolioTitle">
              <DeleteButton onClick={handleDelete} />
            </div>
          )}
        </div>
      </FadeInLeft>
    </div>
  );
};

export default WorthPhotoTile;
