import React, { Component } from "react";
import Slider from "react-animated-slider";
import { FormMaps, FadeInDown, FadeInUp } from "../../Constants/Constants";
import { animateScroll as scroll } from "react-scroll";

class Testimonials extends Component {
  constructor(props) {
    super();
    this.state = {
      urlGET: "testimonials",
      image: "",
      title: "",
      description: "",
      name: "",
      testimonialData: [],
      id: null,
      editMode: false
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleRefreshKey = () => {
    this.setState({ refreshKey: true });
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  editMode = data => {
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

  clearForm = () => {
    this.setState({
      editMode: false,
      image: "",
      title: "",
      description: "",
      name: "",
      id: null
    });
  };

  updateEditForm = data => {
    this.setState({
      image: data.image,
      title: data.title,
      description: data.description,
      name: data.name,
      id: data.id
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}`;
    const { image, title, description, name } = this.state;

    const body = {
      image,
      title,
      description,
      name
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
          alert("Content has been updated");
          return response.json();
        }
        alert("something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .then(this.clearForm())
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
    this.mountTestimonials();
  }

  componentDidUpdate() {
    this.updateTestimonials();
  }

  mountTestimonials() {
    fetch(`/api/v1/${this.state.urlGET}`)
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
      .then(body => {
        this.setState({
          testimonialData: body
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  updateTestimonials() {
    if (this.state.refreshKey) {
      fetch(`/api/v1/${this.state.urlGET}`)
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
        .then(body => {
          this.setState({
            testimonialData: body
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  deleteTestimonial = id => {
    event.preventDefault();
    let result = confirm("Are you sure you want to delete?");
    if (result) {
      const urls = `/api/v1/${this.state.urlGET}/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(urls, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            alert("Content Deleted");
            return response;
          } else {
            alert("something went wrong");
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then(this.toggleRefreshKey)
        .catch(error => console.log(error.message));
    }
  };

  onEditTestimonial = () => {
    if (this.state.id) {
    }
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { image, title, description, name } = this.state;

    const body = {
      image,
      title,
      description,
      name
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(urls, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          alert("Content has been updated.");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .then(this.clearForm())
      .catch(error => console.log(error.message));
  };

  render() {
    console.log("test state ==>", this.state);

    const admin = this.props.user.admin;

    const slides = this.state.testimonialData;

    const formContent = {
      image: "Image",
      title: "Title",
      name: "Customer Info"
    };

    let testimonialForm = (
      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            {this.state.editMode ? (
              <h4 className="col text-center">Edit Testimonial</h4>
            ) : (
              <h4 className="col text-center">Add New Testimonial</h4>
            )}

            <form
              onSubmit={
                this.state.editMode ? this.onEditTestimonial : this.onSubmit
              }
            >
              <FormMaps
                formConst={formContent}
                onChange={this.onChange}
                value={this.state}
              />
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="5"
                  className="form-control"
                  type="text"
                  id="description"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>

              {this.state.editMode ? (
                <button type="submit" className="btn custom-button mt-3">
                  Edit Testimonial
                </button>
              ) : (
                <button type="submit" className="btn custom-button mt-3">
                  Create Testimonial
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );

    let sliderComponent = (
      <Slider>
        {slides.map((item, index) => (
          <div
            key={index}
            style={{
              background: `url('${item.image}')`
            }}
            className="slider-background-format"
          >
            <div className="center slide-content">
              <FadeInDown>
                <h1>{item.title}</h1>
              </FadeInDown>
              <FadeInUp>
                <p>"{item.description}"</p>
                <p className="name">-{item.name}</p>
              </FadeInUp>
              {admin ? (
                <React.Fragment>
                  <button
                    onClick={() => this.deleteTestimonial(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => this.editMode(item)}
                  >
                    {this.state.editMode ? "Back to Create" : "Edit This"}
                  </button>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        ))}
      </Slider>
    );
    return (
      <React.Fragment>
        <div className="slider-border">{sliderComponent}</div>
        {admin ? testimonialForm : null}
      </React.Fragment>
    );
  }
}

export default Testimonials;
