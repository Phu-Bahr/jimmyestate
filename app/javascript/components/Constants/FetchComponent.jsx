import { animateScroll as scroll } from "react-scroll";
const scrollToTop = () => scroll.scrollToTop();
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
        if (alertType === undefined) {
          alert("Content has been updated");
        } else {
          alertType("successEdit");
        }
        return response.json();
      }
      if (alertType === undefined) {
        alert("Something went wrong");
      } else {
        return alertType("error");
      }
      throw new Error("Network response was not ok.");
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};

export const putFetch1 = (url, body, alertType) => {
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
        if (alertType === undefined) {
          alert("Content has been updated");
        } else {
          alertType("successEdit");
        }
        return response.json();
      }
      if (alertType === undefined) {
        alert("Something went wrong");
      } else {
        return alertType("error");
      }
      throw new Error("Network response was not ok.");
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
        if (alertType === undefined) {
          alert("Your inquiry has been received!");
        } else {
          alertType("successEmail");
        }
        return response.json();
      }
      if (alertType === undefined) {
        alert(
          "There was a network issue, please try again or Email Jimmy directly."
        );
      } else {
        alertType("error");
      }
      throw new Error("Network response was not ok.");
    })
    .then(scrollToTop)
    .then(event.target.reset())
    .catch(error => console.log("error message =>", error.message));
};

export const postFetch = (url, body, alertType) => {
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
        if (alertType === undefined) {
          alert("Submission Successful");
        } else {
          alertType("successAdd");
        }
        return response.json();
      }
      if (alertType === undefined) {
        alert("There was a network issue, please try again or contact admin.");
      } else {
        alertType("error");
      }
      throw new Error("Network response was not ok.");
    })
    .then(scrollToTop)
    .then(event.target.reset())
    .catch(error => console.log("error message =>", error.message));
};

export const getFetch = (url, mountState) => {
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
    .then(scrollToTop)
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
        if (alertType === undefined) {
          alert("Item Deleted Successfully");
        } else {
          alertType("successDelete");
        }
        return response;
      } else {
        if (alertType === undefined) {
          alert("Something went wrong");
        } else {
          alertType("error");
        }
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
        if (alertType === undefined) {
          alert("Submission Successful");
        } else {
          alertType("successAdd");
        }
        return response.json();
      }
      if (alertType === undefined) {
        alert("There was a network issue, please try again or contact admin.");
      } else {
        alertType("error");
      }
      throw new Error("Network response was not ok.");
    })
    .then(scrollToTop)
    .catch(error => console.log("error message =>", error.message));
};
