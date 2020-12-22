import { animateScroll as scroll } from "react-scroll";
const scrollToTop = () => scroll.scrollToTop();
// const scrollToBottom = () => scroll.scrollToBottom();
const token = document.querySelector('meta[name="csrf-token"]').content;

export const putFetch = (url, body, alertType) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Content has been updated")
          : alertType("successEdit");
        return response.json();
      }
      alertType === undefined
        ? alert("Something went wrong")
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};

export const postFetchEmail = (url, body, alertType) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Your inquiry has been received!")
          : alertType("successEmail");
        return response.json();
      }
      alertType === undefined
        ? alert(
            "There was a network issue, please try again or Email Jimmy directly."
          )
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })

    .then(scrollToTop)
    .then(event.target.reset())
    .catch(error => console.log("error message =>", error.message));
};

export const postFetch = (url, body, alertType, mountState) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Submission Successful")
          : alertType("successAdd");
        return response.json();
      }
      alertType === undefined
        ? alert("There was a network issue, please try again or contact admin.")
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })
    .then(body => {
      mountState !== undefined && mountState(body);
    })
    .then(scrollToTop)
    .then(event.target.reset())
    .catch(error => console.log("error message =>", error.message));
};

export const deleteFetch = (url, alertType) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Item Deleted Successfully")
          : alertType("successDelete");
        return response;
      } else {
        alertType === undefined
          ? alert("Something went wrong")
          : alertType("error");

        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};

export const postFetchDraft = (url, body, alertType) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Submission Successful")
          : alertType("successAdd");
        return response.json();
      }
      alertType === undefined
        ? alert("There was a network issue, please try again or contact admin.")
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};

export const getFetch = (url, mountState) => {
  return fetch(`/api/v1/${url}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else if (response.status == 404) {
        window.location.href = "/page-404";
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => mountState(body))
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};

export const getGeocode = (location, mountLatLng, alertType) => {
  return fetch(`/api/v1/events/search?location=${location}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        alertType("noGeocode");
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.data[0].result === "No Results") {
        alertType("noGeocode");
      } else {
        alertType("successGeocode");
        mountLatLng(body);
      }
    })
    .catch(error => console.log("error message =>", error.message));
};

export const getGeocodeEvent = (location, mountLatLng, alertType) => {
  return fetch(`/api/v1/events/search?location=${location}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        alertType("noGeocodeEvent");
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.data[0].result === "No Results") {
        alertType("noGeocodeEvent");
      } else {
        alertType("successGeocodeEvent");
        mountLatLng(body);
      }
    })
    .catch(error => console.log("error message =>", error.message));
};

export const getGeocodeEventUpdate = (location, mountLatLng, alertType) => {
  return fetch(`/api/v1/events/search?location=${location}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        alertType("noGeocodeEvent");
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.data[0].result === "No Results") {
        alertType("noGeocodeEvent");
      } else {
        alertType("successGeocodeEventUpdate");
        mountLatLng(body);
      }
    })
    .catch(error => console.log("error message =>", error.message));
};

export const getNoScrollFetch = (url, mountState) => {
  return fetch(`/api/v1/${url}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => mountState(body))
    .catch(error => console.log("error message =>", error.message));
};

export const deleteNoScrollFetch = (url, alertType) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Item Deleted Successfully")
          : alertType("successDelete");
        return response;
      } else {
        alertType === undefined
          ? alert("Something went wrong")
          : alertType("error");

        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .catch(error => console.log("error message =>", error.message));
};

export const putNoScrollFetch = (url, body, alertType) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Content has been updated")
          : alertType("successEdit");
        return response.json();
      }
      alertType === undefined
        ? alert("Something went wrong")
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })
    .catch(error => console.log("error message =>", error.message));
};

export const postNoScrollFetch = (url, body, alertType, mountState) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType === undefined
          ? alert("Submission Successful")
          : alertType("successAdd");
        return response.json();
      }
      alertType === undefined
        ? alert("There was a network issue, please try again or contact admin.")
        : alertType("error");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    })
    .then(body => {
      mountState !== undefined && mountState(body);
    })
    .catch(error => console.log("error message =>", error.message));
};

export const loginFetch = (url, body, alertType, handleLogin) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        alertType("successLogin");
        return response;
      } else if (response.status == 401) {
        alertType("unAuthLogin");
        return response;
      } else {
        alertType("error");
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      body.logged_in && handleLogin(body);
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};
