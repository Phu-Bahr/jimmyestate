export const getFetch = url => {
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
    .then(response => response.json());
};

export const putFetch = (url, token, body) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) {
      alert("Content has been updated");
      return response.json();
    }
    alert("Something went wrong");
    throw new Error("Network response was not ok.");
  });
};

export const postFetch = (url, token, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) {
      alert("Submission Successful");
      return response.json();
    }
    alert("There was a network issue, please try again or contact admin.");
    throw new Error("Network response was not ok.");
  });
};

export const postFetchEmail = (url, token, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) {
      alert("Your inquiry has been received!");
      return response.json();
    }
    alert(
      "There was a network issue, please try again or Email Jimmy directly."
    );
    throw new Error("Network response was not ok.");
  });
};

export const deleteFetch = (url, token, typeAlert) => {
  console.log(typeAlert);

  return fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.ok) {
      if (typeAlert === undefined) {
        alert("Item Deleted Successfully");
      } else {
        typeAlert();
      }
      return response;
    } else {
      alert("Something went wrong");
      let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw error;
    }
  });
};
