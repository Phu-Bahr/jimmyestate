import React, { Fragment } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { DeleteButton, EditButton } from "../../Constants/Buttons";
import { Link } from "react-scroll";

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
      <ScrollAnimation animateIn="fadeIn">
        <div className="cardPort card-1">
          <div className="card-img"></div>
          <div
            className="card-img-hovered"
            style={{
              backgroundImage: "url(" + props.photo + ")"
            }}
          ></div>

          <section className="card-info">
            <div className="card-about">
              <a className="card-tag tag-news">
                {props.status == "Active" ? "On Market" : props.status}
              </a>
              <div className="card-time">
                $
                {props.price.toLocaleString(navigator.language, {
                  minimumFractionDigits: 2
                })}
              </div>
            </div>
            <h1 className="card-title">
              <div>{`${props.streetnumber} ${props.street} ${props.aptnumber}`}</div>
              <div>{`${props.city} ${props.state} ${props.zip}`}</div>
            </h1>
            <div className="card-creator"></div>
          </section>
        </div>
        {props.user.admin && props.hide && (
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
      </ScrollAnimation>
    </Fragment>
  );
};

export default PortfolioPropertiesTile;
