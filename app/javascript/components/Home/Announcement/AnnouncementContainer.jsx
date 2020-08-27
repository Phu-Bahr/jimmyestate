import React, { Component, Fragment } from "react";
import { ParallaxBanner } from "../../Constants/Constants";
import {
  getNoScrollFetch,
  putNoScrollFetch
} from "../../Constants/FetchComponent";
import { UpdateButton, EditButton } from "../../Constants/Buttons";

const urlPath = "announcements";

class AnnouncementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementData: [],
      hideDiv: false,
      description: "",
      title: "",
      refreshKey: false,
      bannerImage: "",
      id: null
    };
  }

  toggleRefreshKey = () => this.setState({ refreshKey: true });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { description, title, bannerImage } = this.state;
    const body = { description, title, bannerImage };

    putNoScrollFetch(url, body, this.props.alertType).then(
      this.toggleRefreshKey
    );
  };

  mountState = body => {
    this.setState({
      announcementData: body,
      description: body[body.length - 1].description,
      title: body[body.length - 1].title,
      bannerImage: body[body.length - 1].bannerImage,
      id: body[body.length - 1].id
    });
  };

  componentDidMount = () => getNoScrollFetch(urlPath, this.mountState);

  componentDidUpdate = () => {
    this.state.refreshKey &&
      getNoScrollFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  };

  render() {
    return (
      <Fragment>
        <ParallaxBanner {...this.state} />

        <div className="container-fluid pt-5">
          <div className="text-center">
            <h1>{this.state.title}</h1>

            <div className="container text-center">
              <p>{this.state.description}</p>
            </div>

            {this.props.user.admin && (
              <Fragment>
                <div className="pb-5">
                  <EditButton
                    onClick={this.clickEdit}
                    value="Edit Announcement / Image"
                  />
                </div>

                {this.state.hideDiv && (
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 pb-5">
                        <form onSubmit={this.onSubmit}>
                          <label htmlFor="bannerImage">Banner Image</label>
                          <div className="form-group">
                            <input
                              type="text"
                              name="bannerImage"
                              id="bannerImage"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.bannerImage}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.title}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              name="description"
                              id="description"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.description}
                            />
                          </div>

                          <UpdateButton />
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AnnouncementContainer;
