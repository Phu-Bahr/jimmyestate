import React, { Component, Fragment } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";
import { EditButton, UpdateButton } from "./Buttons";
import { getFetch, putFetch } from "./FetchComponent";
import AlertBox from "./AlertComponent";

class DraftJSShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      editorState: EditorState.createEmpty(),
      content: null,
      refreshKey: false,
      readOnly: false,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });

  saveContent = contentData =>
    this.setState({ content: JSON.stringify(convertToRaw(contentData)) });

  updateEditorState = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({ editorState });
  };

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${this.props.urlPath}/${this.props.paramsID}`;
    const { content } = this.state;
    const body = { content };

    putFetch(url, body, this.alertType);
  };

  componentDidMount = () => {
    const urlPath = `${this.props.urlPath}/${this.props.paramsID}`;
    getFetch(urlPath, this.mountState);
  };

  mountState = body => {
    body
      ? this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(body.content))
          )
        })
      : this.setState({ editorState: EditorState.createEmpty() });
  };

  componentDidUpdate() {
    let paramID = this.props.paramsID;
    let url = `${this.props.urlPath}/${paramID}`;
    this.state.id != paramID &&
      getFetch(url, this.mountState).then(
        this.setState({ refreshKey: false, id: paramID })
      );
  }

  render() {
    return (
      <Fragment>
        <AlertBox
          {...this.state}
          alertType={this.alertType}
          paramsID={this.props.paramsID}
        />

        <div className="container pb-5 pt-3">
          {this.props.admin && (
            <div className="container text-center py-4">
              <Link to={`/${this.props.editUrlPath}/${this.props.paramsID}`}>
                <EditButton value="Edit Banner" />
              </Link>
            </div>
          )}

          <div
            className="p-3"
            style={{ borderStyle: this.props.admin && "dotted" }}
          >
            <Editor
              toolbarHidden={this.props.admin ? false : true}
              editorState={this.state.editorState}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.updateEditorState.bind(this)}
              readOnly={this.props.admin ? false : true}
              placeholder="Sign In to Admin to edit"
            />

            {this.props.admin && (
              <div className="pt-3">
                <UpdateButton
                  type="button"
                  onClick={this.onSubmit}
                  value="Save your content"
                />
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DraftJSShowPage;
