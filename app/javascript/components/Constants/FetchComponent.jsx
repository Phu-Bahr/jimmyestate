export class Fetcher {
  static getFetch = url => {
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

  static putFetch = (urls, token, body) => {
    return fetch(urls, {
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
}
