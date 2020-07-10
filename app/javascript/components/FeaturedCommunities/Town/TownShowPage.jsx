import React, { Component } from "react";
import TownLinks from "./TownLinks";
import { FadeIn, ParallaxBannerRoutes } from "../../Constants/Constants";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Link } from "react-router-dom";
import AlertBox from "../../Constants/AlertComponent";
import { getFetch } from "../../Constants/FetchComponent";
import { EditButton, UpdateButton } from "../../Constants/Buttons";

const urlPath = "towns";

class TownShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      townData: {},
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

  updateEditorState = editorState => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({ editorState });
  };

  saveContent = contentData => {
    this.setState({ content: JSON.stringify(convertToRaw(contentData)) });
  };

  onSubmit = event => {
    if (this.state.readOnly) {
      alert("Can't save on Read Only");
    } else {
      event.preventDefault();
      const url = `/api/v1/${urlPath}/${this.props.match.params.id}`;
      const { content } = this.state;
      const body = { content };

      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
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
  };

  componentDidMount() {
    const urlPath = `towns/${this.props.match.params.id}`;
    this.fetchTownData(urlPath);
    this.fetchDraftData(urlPath);
  }

  fetchTownData = urlPath => getFetch(urlPath, this.mountState);
  mountState = body => this.setState({ townData: body, id: body.id });

  fetchDraftData = urlPath => getFetch(urlPath, this.mountDraftJS);
  mountDraftJS = rawContent => {
    rawContent
      ? this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(rawContent.content))
          )
        })
      : this.setState({ editorState: EditorState.createEmpty() });
  };

  componentDidUpdate() {
    let paramID = this.props.match.params.id;
    this.state.id != paramID &&
      getFetch(`${urlPath}/${paramID}`, this.mountUpdatedState).then(
        this.setState({ refreshKey: false, id: this.props.match.params.id })
      );
  }
  mountUpdatedState = body => {
    body
      ? this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(body.content))
          ),
          townData: body
        })
      : this.setState({ editorState: EditorState.createEmpty() });
  };

  render() {
    let adminToggle;
    if (this.props.user.admin) {
      adminToggle = (
        <div className="container pb-5 pt-3">
          <div className="container text-center py-4">
            <Link to={`/editcommunity/${this.props.match.params.id}`}>
              <EditButton value="Edit Banner" />
            </Link>
          </div>
          <div className="p-3" style={{ borderStyle: "dotted" }}>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.updateEditorState.bind(this)}
              readOnly={false}
            />
            <div className="pt-3">
              <UpdateButton onClick={this.onSubmit} value="Save your content" />
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
        <AlertBox {...this.state} alertType={this.alertType} />

        <div className="flex-container">
          <ParallaxBannerRoutes {...this.state.townData} id={this.state.id} />
          <FadeIn>
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
        </div>
      </React.Fragment>
    );
  }
}

export default TownShowPage;
