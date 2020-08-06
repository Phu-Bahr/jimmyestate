import React, { Component } from "react";
import { putNoScrollFetch } from "../../Constants/FetchComponent";
import { UpdateButton, DeleteButton } from "../../Constants/Buttons";

class EditHelperLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      title: this.props.title,
      route: this.props.route
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.props.urlPath}/${this.props.id}`;
    const { image, title, route } = this.state;
    const body = { image, title, route };

    putNoScrollFetch(url, body, this.props.alertType).then(
      this.props.toggleRefreshKey
    );
  };

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
            <div className="col-sm-6 pt-2">
              <label htmlFor="route">Route</label>
              <input
                type="text"
                name="route"
                id="route"
                className="form-control"
                required
                onChange={this.onChange}
                value={this.state.route}
              />
            </div>
          </div>

          <UpdateButton className="mt-3" value="Update Card" />
          <DeleteButton
            type="button"
            className="mt-3"
            onClick={this.props.handleClick}
          />
        </form>
      </div>
    );
  }
}

export default EditHelperLinks;
