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
          <main
            key={index}
            style={{ background: `url('${item.image}')` }}
            className="slider-background-format"
          >
            <section className="center slide-content">
              <div className="testimonyFont">
                <FadeInDown>
                  <header>
                    <h1>{item.title}</h1>
                  </header>
                </FadeInDown>
                <FadeInUp>
                  <article>
                    <p>"{item.description}"</p>
                    <p id="testimony-name">-{item.name}</p>
                  </article>
                </FadeInUp>
              </div>
              {admin && (
                <Fragment>
                  <DeleteButton onClick={() => handleDelete(item.id)} />

                  <EditButton
                    onClick={() => editModeFunc(item)}
                    value={editMode ? "Back to Create" : "Edit This"}
                  />
                </Fragment>
              )}
            </section>
          </main>
        ))}
      </Slider>
    </Fragment>
  );
};

export default ScrollingSidesContainer;
