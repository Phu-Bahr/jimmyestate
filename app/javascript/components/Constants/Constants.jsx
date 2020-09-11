import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInRight,
  fadeInLeft,
  fadeOut,
  flipInY
} from "react-animations";
import { UpdateButton } from "./Buttons";
import { CommonLoading } from "react-loadingg";
import { Link } from "react-router-dom";
import { gaNavLinks } from "./GoogleAnalyticEvents";

export const FadeIn = styled.div`
  animation: 1s ${keyframes`${fadeIn}`};
`;

export const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`;

export const FadeInDown = styled.div`
  animation: 1s ${keyframes`${fadeInDown}`};
`;

export const FadeInRight = styled.div`
  animation: 1s ${keyframes`${fadeInRight}`};
`;

export const FadeInLeft = styled.div`
  animation: 1s ${keyframes`${fadeInLeft}`};
`;

export const FadeOut = styled.div`
  animation: 1s ${keyframes`${fadeOut}`};
`;

export const FlipIn = styled.div`
  animation: 1s ${keyframes`${flipInY}`};
`;

//for navbar
export const StyledNavbar = styled.div`
  position: fixed;
  width: 100%;
  margin: 0 auto;
  z-index: 1000;
`;

export const Transition = styled.div`
  .active {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear, all 0.5s ease-in;
  }
  .hidden {
    visibility: hidden;
    transform: translate(0, -350%);
    opacity: 0;
    transition: visibility 0s, opacity 0.1s linear, all 2s ease-out;
  }
`;

export const DropdownHelper = props => {
  const formValue = props.formConst.map(element => {
    return (
      <div key={element.title} className="container py-1">
        <Link
          to={element.path}
          className="dropdown-item navbar-underline"
          onClick={() => gaNavLinks(element.title)}
        >
          {element.title}
        </Link>
      </div>
    );
  });
  return formValue;
};

//end for navbar

// needs ...state or banner state
export const ParallaxBanner = props => (
  <div
    className="parallaxStyleHome"
    style={{
      backgroundImage: "url(" + props.bannerImage + ")"
    }}
  />
);

// needs ...state or banner state. Especially id for loading
export const ParallaxBannerRoutes = props => (
  <Fragment>
    <FadeIn>
      <div
        className="parallaxStyleRoutes"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" +
            props.bannerImage +
            ")"
        }}
      >
        <div className="container">
          <div className="header-alignment">
            <h1 id="header1">{props.headerText1}</h1>
            <h2 id="header2">{props.headerText2}</h2>
          </div>
        </div>
        {props.id == null && (
          <div
            className="container text-center"
            style={{ paddingTop: "250px" }}
          >
            <CommonLoading />
            <div>Loading...</div>
          </div>
        )}
      </div>
    </FadeIn>
  </Fragment>
);

// as long as original component's state has the 3 keys below to send state down and up, this should work
// value=this.state, onchange, onsubmit
export const ParallaxEditForm = props => {
  const parallaxFormContent = {
    bannerImage: "Banner Image",
    headerText1: "Header text 1",
    headerText2: "Header text 2"
  };

  const keyValuePair = Object.entries(parallaxFormContent).map(
    ([key, value]) => {
      return (
        <div key={key} className="form-group">
          <label htmlFor={key}>{value}</label>
          <input
            className="form-control"
            type="text"
            id={key}
            name={key}
            onChange={props.onChange}
            value={props.value[key]}
          />
        </div>
      );
    }
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <form onSubmit={props.onSubmit}>
            {keyValuePair}
            <UpdateButton value="Submit Header Changes" className="mt-3" />
          </form>
        </div>
      </div>
    </div>
  );
};

// pass down formConst as object from main component, onchange, and value=this.state
export const FormMaps = props => {
  const keyValuePair = Object.entries(props.formConst).map(([key, value]) => {
    return (
      <div key={key} className="form-group">
        <label htmlFor={key}>{value}</label>
        <input
          className="form-control"
          type="text"
          id={key}
          name={key}
          onChange={props.onChange}
          value={props.value[key]}
          required
        />
      </div>
    );
  });

  return keyValuePair;
};

export const FormNoLabel = props => {
  const keyValuePair = Object.entries(props.data).map(([key, value]) => {
    return (
      <div key={key} className="form-group">
        <input
          className="form-control"
          type="text"
          id={key}
          name={key}
          onChange={props.onChange}
          value={props.value[key]}
          required
        />
      </div>
    );
  });

  return keyValuePair;
};

//takes in array of objects instead of key value
export const FormMapsV2 = props => {
  const formValue = props.formConst.map(element => {
    return (
      <div key={element.name} className={"form-group" + " " + element.subclass}>
        <label htmlFor={element.name}>{element.label}</label>
        <input
          className="form-control"
          type={element.type}
          id={element.name}
          name={element.name}
          onChange={props.onChange}
          value={props.value[element.name]}
          required
        />
      </div>
    );
  });
  return formValue;
};

//needs this.state sent  or id in state
export const LoadingScreen = props => {
  return (
    props.id == null && (
      <div className="container text-center pt-3">
        <p>Loading...</p>
        <CommonLoading />
      </div>
    )
  );
};

//particles

export const particleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#000000"
    },
    shape: {
      stroke: {
        width: 0
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.4,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 70,
      opacity: 0.4,
      width: 1,
      color: "#8bce3c"
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
      straight: false,
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true
      },
      onclick: {
        enable: true
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 150,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  }
};
