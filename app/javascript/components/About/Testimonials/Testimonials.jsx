import React, { Component } from "react";
import AlertBox from "../../Constants/AlertComponent";
import TestimonialsForm from "./TestimonialsForm";
import ScrollingSidesContainer from "./ScollingSidesContainer";
import {
  getFetch,
  postFetch,
  deleteFetch,
  putFetch
} from "../../Constants/FetchComponent";

const urlPath = "testimonials";

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      title: "",
      description: "",
      name: "",
      testimonialData: [],
      id: null,
      editMode: false,
      typeOfAlert: null,
      idForAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  clearForm = () =>
    this.setState({
      editMode: false,
      image: "",
      title: "",
      description: "",
      name: "",
      id: null
    });

  handleDelete = id => {
    this.setState({ idForAlert: id });
    this.alertType("delete");
  };

  editModeFunc = data => {
    this.state.editMode
      ? this.setState({
          editMode: false,
          image: "",
          title: "",
          description: "",
          name: "",
          id: null
        })
      : this.setState({
          editMode: true,
          image: data.image,
          title: data.title,
          description: data.description,
          name: data.name,
          id: data.id
        });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}`;
    const { image, title, description, name } = this.state;
    const body = { image, title, description, name };

    postFetch(url, body, this.alertType)
      .then(this.toggleRefreshKey)
      .then(this.clearForm);
  };

  deleteTestimonial = id => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${id}`;

    deleteFetch(url, this.alertType).then(this.toggleRefreshKey);
  };

  onEditTestimonial = () => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { image, title, description, name } = this.state;
    const body = { image, title, description, name };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => this.setState({ testimonialData: body });

  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () =>
    this.state.refreshKey &&
    getFetch(urlPath, this.mountState).then(
      this.setState({ refreshKey: false })
    );

  render() {
    const admin = this.props.user.admin;

    return (
      <React.Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          deleteEvent={this.deleteTestimonial}
        />

        <div className="slider-border">
          <ScrollingSidesContainer
            {...this.state}
            admin={admin}
            editModeFunc={this.editModeFunc}
            handleDelete={this.handleDelete}
          />
        </div>

        {admin && (
          <TestimonialsForm
            {...this.state}
            onEditTestimonial={this.onEditTestimonial}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            value={this.state}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Testimonials;
