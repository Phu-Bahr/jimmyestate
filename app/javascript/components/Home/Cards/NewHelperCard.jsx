import React, { Component, Fragment } from "react";
import { EditButton, AddButton } from "../../Constants/Buttons";
import { postNoScrollFetch } from "../../Constants/FetchComponent";
import { FormMaps } from "../../Constants/Constants";

class NewHelperCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      title: "",
      route: "",
      hideDiv: false
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onEditClick = () => this.setState({ hideDiv: !this.state.hideDiv });

  onSubmit = event => {
    event.preventDefault();
    const url = "/api/v1/helper_links";
    const { image, title, route } = this.state;
    const body = { image, title, route };

    postNoScrollFetch(url, body, this.props.alertType)
      .then(this.props.toggleRefreshKey)
      .then(this.setState({ image: "", title: "", route: "" }));
  };

  render() {
    const data = { image: "Image URL", title: "Title", route: "Route" };

    return (
      <Fragment>
        <EditButton value="Add New Card" onClick={this.onEditClick} />

        {this.state.hideDiv && (
          <div className="container mb-5">
            <div className="row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h4 className="col text-center">Add New Card</h4>

                <form onSubmit={this.onSubmit}>
                  <FormMaps
                    onChange={this.onChange}
                    formConst={data}
                    value={this.state}
                  />

                  <AddButton className="mt-3" value="Create Card" />
                </form>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default NewHelperCard;
