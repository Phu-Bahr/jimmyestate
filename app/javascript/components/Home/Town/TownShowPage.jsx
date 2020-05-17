import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import TownLinks from "./TownLinks";
import { FadeIn } from "../../Constants/Constants";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
      id: "",
      editorState: EditorState.createEmpty(),
      content: null,
      refreshKey: false,
      readOnly: false
    };
    this.fetchTownData = this.fetchTownData.bind(this);
    this.fetchDraftData = this.fetchDraftData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    if (this.state.readOnly) {
      alert("Can't save on Read Only");
    } else {
      event.preventDefault();
      const urls = `/api/v1/towns/${this.props.match.params.id}`;
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

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.fetchTownData(id);
    this.fetchDraftData(id);
    this.scrollToTop();
  }

  fetchDraftData(id) {
    fetch(`/api/v1/towns/${id}`)
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
        console.log(rawContent.content);

        if (rawContent) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(JSON.parse(rawContent.content))
            )
          });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  fetchTownData(id) {
    fetch(`/api/v1/towns/${id}`)
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
        this.setState({ townData: body, id: body.id });
      })
      .then(this.scrollToTop());
  }

  componentDidUpdate() {
    if (this.state.id != this.props.match.params.id) {
      fetch(`/api/v1/towns/${this.props.match.params.id}`)
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
          if (body) {
            this.setState({
              editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(body.content))
              ),
              townData: body,
              id: body.id
            });
          } else {
            this.setState({ editorState: EditorState.createEmpty() });
          }
        })
        .then(this.scrollToTop());
    }
  }

  render() {
    console.log(this.state.editorState);

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
        </div>
      );
    } else {
      adminToggle = (
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
      );
    }
    return (
      <React.Fragment>
        <FadeIn>
          <div className="parallaxShowPage darken-pseudo darken-with-text">
            <div className="container py-5">
              <h1>{this.state.townData.headerText1}</h1>
              <h4>{this.state.townData.headerText2}</h4>
            </div>
          </div>

          <div>{adminToggle}</div>

          <div className="container pb-5">
            <div className="townheader-font">
              {this.state.townData.townheader}
            </div>
            <ul>
              <TownLinks
                loggedInStatus={this.props.loggedInStatus}
                user={this.props.user}
                paramID={this.props.match.params.id}
              />
            </ul>
          </div>
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default TownShowPage;
