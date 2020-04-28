import React, { Component } from "react";

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const urls = "/api/v1/contacts";
    const { name, email, message } = this.state;

    const body = {
      name,
      email,
      message
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  render() {
    console.log("state contact page form", this.state);

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name (required)</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email (required)</label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message (required)</label>
            <textarea
              rows="5"
              type="text"
              name="message"
              id="message"
              className="form-control"
              onChange={this.onChange}
              required
            />
          </div>
          <button type="submit" className="btn custom-button mt-3">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default EmailForm;
