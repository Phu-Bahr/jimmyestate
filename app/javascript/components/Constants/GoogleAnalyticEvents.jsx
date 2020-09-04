import ReactGA from "react-ga";

export const gaNavLinks = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Mobile Navbar Link",
      action: `Mobile ${title} Navbar Link Clicked`
    });
  } else {
    ReactGA.event({
      category: "Navbar Link",
      action: `${title} Navbar Link Clicked`
    });
  }
};

export const gaLinks = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Mobile Link",
      action: `Mobile ${title} Link Clicked`
    });
  } else {
    ReactGA.event({
      category: "Link",
      action: `${title} Link Clicked`
    });
  }
};

export const gaInteraction = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Interaction Mobile",
      action: `Mobile ${title} Clicked`
    });
  } else {
    ReactGA.event({
      category: "Interaction",
      action: `${title} Clicked`
    });
  }
};

export const gaEvents = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Events Mobile",
      action: `Mobile ${title} Clicked`
    });
  } else {
    ReactGA.event({
      category: "Events",
      action: `${title} Clicked`
    });
  }
};

export const gaCards = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Cards Mobile",
      action: `Mobile ${title} Clicked`
    });
  } else {
    ReactGA.event({
      category: "Cards",
      action: `${title} Clicked`
    });
  }
};

export const gaContactLinks = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Contact Mobile",
      action: `Mobile ${title} Clicked`
    });
  } else {
    ReactGA.event({
      category: "Contact",
      action: `${title} Clicked`
    });
  }
};

export const gaSocialLinks = title => {
  if (innerWidth < 680) {
    ReactGA.event({
      category: "Social Mobile",
      action: `Mobile ${title} Clicked`
    });
  } else {
    ReactGA.event({
      category: "Social",
      action: `${title} Clicked`
    });
  }
};
