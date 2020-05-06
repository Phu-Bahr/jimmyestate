import React, { Component } from "react";
import {
  EditorState,
  Editor as DraftEditor,
  convertToRaw,
  convertFromRaw
} from "draft-js";

class BuyingHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content: null,
      refreshKey: false,
      readOnly: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleRefreshKey = this.toggleRefreshKey.bind(this);
  }
  toggleRefreshKey(event) {
    this.setState({ refreshKey: true });
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
      const urls = "/api/v1/buying_contents";
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

  componentDidMount() {
    fetch("/api/v1/buying_contents")
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
            )
          });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      })
      .catch(error => console.log("error message =>", error.message));
  }

  render() {
    console.log("how raw should look", this.state.content);

    return (
      <React.Fragment>
        <div className="editor-container">
          <DraftEditor
            placeholder="Type content here"
            editorState={this.state.editorState}
            onChange={this.updateEditorState.bind(this)}
            readOnly={this.state.readOnly}
          />
          <button onClick={this.onSubmit}>Save your content</button>
        </div>
      </React.Fragment>
    );
  }
}

export default BuyingHomeContainer;
