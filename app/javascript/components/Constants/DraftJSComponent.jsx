import React, { Component, Fragment } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { AddButton, UpdateButton } from "./Buttons";
import { FadeIn, LoadingScreen } from "./Constants";
import AlertBox from "./AlertComponent";
import { postFetchDraft, putNoScrollFetch, getFetch } from "./FetchComponent";

//parent component needs to supply url state
//{...this.props} <- for admin
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
      id: null,
      typeOfAlert: null
    };
  }

  alertType = payload => {
    //if alertType function was passed down from HOC use that, else set payload as is.
    this.props.alertType
      ? this.props.alertType(payload)
      : this.setState({ typeOfAlert: payload });
  };
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  saveContent = contentData =>
    this.setState({ content: JSON.stringify(convertToRaw(contentData)) });

  updateEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({ editorState });
  }

  onSubmit = event => {
    if (this.state.readOnly) {
      alert("Can't save on Read Only");
    } else {
      event.preventDefault();
      let url;
      this.props.url === undefined
        ? (url = `/api/v1/${this.props.urlPath}`)
        : (url = `/api/v1/${this.props.url}`);

      const { content } = this.state;
      const body = { content };

      postFetchDraft(url, body, this.alertType).then(this.toggleRefreshKey());
    }
  };

  onSubmitUpdate = event => {
    if (this.state.id === null) {
      alert("Can't update first post.");
    } else {
      event.preventDefault();
      let url;
      this.props.url === undefined
        ? (url = `/api/v1/${this.props.urlPath}/${this.state.id}`)
        : (url = `/api/v1/${this.props.url}/${this.state.id}`);

      const { content } = this.state;
      const body = { content };

      putNoScrollFetch(url, body, this.alertType);
    }
  };

  componentDidMount = () => {
    let url;
    this.props.url === undefined
      ? (url = this.props.urlPath)
      : (url = this.props.url);

    getFetch(url, this.mountState);
  };

  mountState = rawContent => {
    if (rawContent) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(rawContent[rawContent.length - 1].content))
        ),
        id: rawContent[rawContent.length - 1].id
      });
    } else {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  };

  componentDidUpdate = () => {
    let url;
    this.props.url === undefined
      ? (url = this.props.urlPath)
      : (url = this.props.url);

    this.state.refreshKey &&
      getFetch(url, this.mountState)
        .then(this.setState({ refreshKey: false }))
        .then(this.props.uppertoggleRefreshKey);
  };

  render() {
    let adminToggle = this.props.user.admin ? (
      <main className="container pb-2 pt-3">
        {this.state.id === null && (
          <div className="container text-center pt-3">
            <p>You must make first post before editing banners/headers.</p>
          </div>
        )}
        <article className="p-3" style={{ borderStyle: "dotted" }}>
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.updateEditorState.bind(this)}
            readOnly={false}
          />
          <div className="row">
            {this.state.id === null && (
              <Fragment>
                <div className="pr-3 pt-3">
                  <AddButton
                    type="button"
                    onClick={this.onSubmit}
                    value="Save your content"
                  />
                </div>
              </Fragment>
            )}
            <div className="p-3">
              <UpdateButton
                type="button"
                onClick={this.onSubmitUpdate}
                value="Update your content"
              />
            </div>
          </div>
        </article>
      </main>
    ) : (
      <main className="container py-3 px-4">
        <article>
          <FadeIn>
            <Editor
              toolbarHidden
              editorState={this.state.editorState}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.updateEditorState.bind(this)}
              readOnly={true}
              placeholder="Sign In to Admin to edit"
            />
          </FadeIn>
        </article>
      </main>
    );

    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />
        <LoadingScreen {...this.state} />
        <FadeIn>{adminToggle}</FadeIn>
      </Fragment>
    );
  }
}

export default DraftJSContainer;
