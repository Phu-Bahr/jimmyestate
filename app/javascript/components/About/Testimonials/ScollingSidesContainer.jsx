import React, { Fragment } from "react";
import Slider from "react-animated-slider";
import { FadeInDown, FadeInUp } from "../../Constants/Constants";
import { DeleteButton, EditButton } from "../../Constants/Buttons";

const ScrollingSidesContainer = ({
  testimonialData,
  admin,
  handleDelete,
  editModeFunc,
  editMode
}) => {
  return (
    <Fragment>
      <Slider>
        {testimonialData.map((item, index) => (
          <div
            key={index}
            style={{ background: `url('${item.image}')` }}
            className="slider-background-format"
          >
            <div className="center slide-content">
              <FadeInDown>
                <h1>{item.title}</h1>
              </FadeInDown>
              <FadeInUp>
                <p>"{item.description}"</p>
                <p className="name">-{item.name}</p>
              </FadeInUp>
              {admin && (
                <React.Fragment>
                  <DeleteButton onClick={() => handleDelete(item.id)} />

                  <EditButton
                    onClick={() => editModeFunc(item)}
                    value={editMode ? "Back to Create" : "Edit This"}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </Fragment>
  );
};

export default ScrollingSidesContainer;
