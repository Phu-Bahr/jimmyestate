import React, { Component } from "react";

class CustomEditLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      title: this.props.title
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/custom_cards/${this.props.id}`;
    const { image, title } = this.state;

    const body = {
      image,
      title
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Card has been updated.");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.props.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="py-4">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-sm-6 pt-2">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                name="image"
                id="image"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.image}
              />
            </div>
            <div className="col-sm-6 pt-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
          </div>

          <button type="submit" className="btn custom-button mt-3">
            Update Card
          </button>
        </form>
      </div>
    );
  }
}

export default CustomEditLinks;
