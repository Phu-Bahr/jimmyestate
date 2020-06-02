import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FadeIn } from "./Constants";

//parent component needs to supply urlGET state
//send {...this.state}, and user={this.props.user} <- for admin
//have a content column in their Model
//:content in params controller

class DraftJSContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content: null,
      refreshKey: false,
      readOnly: false,
      id: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
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
      const urls = `/api/v1/${this.props.urlGET}`;
      const { content } = this.state;

      const body = {
        content
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
            alert("Content has been saved");
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }
  }

  onSubmitUpdate(event) {
    if (this.state.id === null) {
      alert("Can't update first post.");
    } else {
      event.preventDefault();
      const urls = `/api/v1/${this.props.urlGET}/${this.state.id}`;
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
            alert("Content has been updated");
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch(error => console.log(error.message));
    }
  }

  componentDidMount() {
    fetch(`/api/v1/${this.props.urlGET}`)
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
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(
                JSON.parse(rawContent[rawContent.length - 1].content)
              )
            ),
            id: rawContent[rawContent.length - 1].id
          });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    let adminToggle;
    if (this.props.user.admin) {
      adminToggle = (
        <div className="container pb-5 pt-3">
          <div className="p-3" style={{ borderStyle: "dotted" }}>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.updateEditorState.bind(this)}
              readOnly={false}
            />
            <div className="row">
              {this.state.id >= 1 ? (
                ""
              ) : (
                <div className="pr-3 pt-3">
                  <button onClick={this.onSubmit}>Save your content</button>
                </div>
              )}
              <div className="p-3">
                <button onClick={this.onSubmitUpdate}>
                  Update your content
                </button>
              </div>
            </div>
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
        <FadeIn>{adminToggle}</FadeIn>
      </React.Fragment>
    );
  }
}

export default DraftJSContainer;
