import React, { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { DeleteButton, EditButton } from "../../Constants/Buttons";
import { Link, animateScroll as scroll } from "react-scroll";

const PortfolioPropertiesTile = props => {
  let editPayload = {
    id: props.id,
    photo: props.photo,
    price: props.price,
    streetnumber: props.streetnumber,
    street: props.street,
    aptnumber: props.aptnumber,
    city: props.city,
    state: props.state,
    zip: props.zip,
    status: props.status
  };

  return (
    <Fragment>
      <div className="col-md-4 col-middle px-3 py-2">
        <ScrollAnimation animateIn="fadeIn">
          <div className="card border-0">
            <div className="parent1 m-0">
              <div className="child1 particles">
                <img
                  className="portfolioImage card-img-top"
                  src={props.photo}
                />
                <div className="portfolioTitle">On Market</div>
              </div>
            </div>

            <div className="card-body">
              <div style={{ fontWeight: "900" }}>
                $
                {props.price.toLocaleString(navigator.language, {
                  minimumFractionDigits: 2
                })}
              </div>
              <div>{`${props.streetnumber} ${props.street} ${props.aptnumber}`}</div>
              <div>{`${props.city}, ${props.state} ${props.zip}`}</div>
            </div>
          </div>
        </ScrollAnimation>

        {props.hide && (
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <DeleteButton
                  onClick={() => props.handleDelete(props.id)}
                  value="Delete Property"
                />
              </div>
              <div className="col-sm-6">
                <Link to="formTag" smooth={true} offset={-90} duration={1100}>
                  <EditButton
                    onClick={() => props.handleEdit(editPayload)}
                    value="Edit Property"
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PortfolioPropertiesTile;
