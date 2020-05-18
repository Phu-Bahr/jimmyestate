import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FadeIn, FadeInUp } from "../../Constants/Constants";
import { Link } from "react-router-dom";

class AboutCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content: null,
      refreshKey: false,
      readOnly: false,
      headerText1: "",
      headerText2: "",
      image: "",
      refreshKey: false,
      aboutCompanyData: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }

  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    console.log("content state raw", convertToRaw(contentState));
    this.setState({ editorState });
  }

  saveContent = contentData => {
    this.setState({
      content: JSON.stringify(convertToRaw(contentData))
    });
  };

  onSubmitEdit(event) {
    event.preventDefault();
    const urls = "/api/v1/about_companies/1";
    const { headerText1, headerText2, image } = this.state;

    const body = {
      headerText1,
      headerText2,
      image
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
          alert("Edit is good!");
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(this.toggleRefreshKey)
      .catch(error => console.log(error.message));
  }

  onSubmit(event) {
    if (this.state.readOnly) {
      alert("Can't save on Read Only");
    } else {
      event.preventDefault();
      const urls = "/api/v1/about_companies/1";
      const { content } = this.state;

      const body = {
        content
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
            alert("Content has been saved");
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }
  }

  componentDidMount() {
    fetch("/api/v1/about_companies")
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
      .then(rawContent => {
        if (rawContent) {
          console.log("headertext info", rawContent[0].headerText1);
          this.setState({
            headerText1: rawContent[0].headerText1,
            headerText2: rawContent[0].headerText2,
            image: rawContent[0].image,
            editorState: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(rawContent[rawContent.length - 1].content)
              )
            )
          });
        } else {
          this.setState({
            editorState: EditorState.createEmpty()
          });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  componentDidUpdate() {
    if (this.state.refreshKey === true) {
      fetch("api/v1/about_companies")
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
            headerText1: body[0].headerText1,
            headerText2: body[0].headerText2,
            image: body[0].image
          });
        })
        .then(this.setState({ refreshKey: false }));
    }
  }

  render() {
    console.log("STATE", this.state);

    let editMenu = (
      <React.Fragment>
        <div className="container py-3">
          <div className="row">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.clickEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <form onSubmit={this.onSubmitEdit}>
            <div className="parallaxAboutCompanyPage">
              <div className="container py-5">
                <div className="form-group">
                  <input
                    type="text"
                    name="headerText1"
                    id="headerText1"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.headerText1}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="headerText2"
                    id="headerText2"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.headerText2}
                  />
                </div>
              </div>
            </div>

            <div className="container py-5">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="image">image</label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.image}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn custom-button mt-6"
                onClick={this.scrollToTop}
              >
                Submit changes
              </button>

              <Link to="/" className="btn btn-link mt-3">
                Back to Home Page
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );

    let adminToggle;
    if (this.props.user.admin) {
      adminToggle = (
        <div className="container pb-5 pt-3">
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.updateEditorState.bind(this)}
            readOnly={false}
          />
          <div className="pt-3">
            <button onClick={this.onSubmit}>Save your content</button>
          </div>
          <div>{editMenu}</div>
        </div>
      );
    } else {
      adminToggle = (
        <React.Fragment>
          <div className="container pb-5 pt-3">
            <Editor
              toolbarHidden
              editorState={this.state.editorState}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.updateEditorState.bind(this)}
              readOnly={true}
              placeholder="Sign In to Admin to edit"
            />
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxAboutCompanyPage">
            <div className="container py-5">
              <h1>{this.state.headerText1}</h1>
              <h4>{this.state.headerText2}</h4>
            </div>
          </div>
        </FadeIn>
        <FadeInUp>
          <div className="m-5 text-center">
            <img className="img-fluid rounded" src={this.state.image}></img>
          </div>
        </FadeInUp>
        <FadeIn>{adminToggle}</FadeIn>
      </React.Fragment>
    );
  }
}

export default AboutCompanyContainer;
