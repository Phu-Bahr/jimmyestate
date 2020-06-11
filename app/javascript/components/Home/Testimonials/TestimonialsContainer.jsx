import React, { Component } from "react";
import Slider from "react-animated-slider";
import {
  FadeIn,
  ParallaxBannerRoutes,
  ParallaxEditForm
} from "../../Constants/Constants";

class Testimonials extends Component {
  constructor(props) {
    super();
    this.state = {
      urlGET: "testimonial_edits",
      headerText1: "",
      headerText2: "",
      bannerImage: "",
      id: null
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

  onSubmit = event => {
    event.preventDefault();
    const urls = `/api/v1/${this.state.urlGET}/${this.state.id}`;
    const { headerText1, headerText2, bannerImage } = this.state;

    const body = {
      headerText1,
      headerText2,
      bannerImage
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
          alert("Content has been updated");
          return response.json();
        }
        alert("something went wrong");
        throw new Error("Network response was not ok.");
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  };

  componentDidMount() {
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
          headerText1: body[body.length - 1].headerText1,
          headerText2: body[body.length - 1].headerText2,
          bannerImage: body[body.length - 1].bannerImage,
          id: body[body.length - 1].id
        });
      })

      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
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
            headerText1: body[body.length - 1].headerText1,
            headerText2: body[body.length - 1].headerText2,
            bannerImage: body[body.length - 1].bannerImage,
            id: body[body.length - 1].id
          });
        })
        .then(this.setState({ refreshKey: false }))
        .then(this.scrollToTop);
    }
  }

  render() {
    const slides = [
      {
        title: "Great Helper..",
        description:
          "Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me Alex was so kind to me ",
        name: "Tony P - Newton, MA",
        image:
          "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        title: "Second item",
        description: "Lorem ipsum",
        image:
          "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        title: "Third item",
        description: "Lorem ipsum",
        image:
          "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
    ];

    return (
      <React.Fragment>
        <div className="flex-container">
          <FadeIn>
            <ParallaxBannerRoutes {...this.state} />
            {this.props.user.admin === true ? (
              <ParallaxEditForm
                value={this.state}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
              />
            ) : (
              ""
            )}
          </FadeIn>
          <div className="slider-border">
            <Slider>
              {slides.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: `url('${item.image}') no-repeat center`,
                    color: "white"
                  }}
                >
                  <div className="center slide-content">
                    <h1>{item.title}</h1>
                    <p>"{item.description}"</p>
                    <p className="name">-{item.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Testimonials;
