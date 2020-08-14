import React, { Component, Fragment } from "react";
import Particles from "react-particles-js";
import JumboTile from "./JumboTile";
import { particleOpt } from "../../Constants/Constants";
import ScrollAnimation from "react-animate-on-scroll";
import { putFetch, getFetch } from "../../Constants/FetchComponent";
import AlertBox from "../../Constants/AlertComponent";
import JumboEditForm from "./JumboEditForm";

const urlPath = "jumbotrons";

class JumbotronContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jumboData: [],
      line1: "",
      line2: "",
      line3: "",
      refreshKey: false,
      hideDiv: true,
      id: null,
      typeOfAlert: null
    };
  }

  alertType = payload => this.setState({ typeOfAlert: payload });
  toggleRefreshKey = () => this.setState({ refreshKey: true });
  clickEdit = () => this.setState({ hideDiv: !this.state.hideDiv });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = event => {
    event.preventDefault();
    const url = `/api/v1/${urlPath}/${this.state.id}`;
    const { line1, line2, line3 } = this.state;
    const body = { line1, line2, line3 };

    putFetch(url, body, this.alertType).then(this.toggleRefreshKey);
  };

  mountState = body => {
    this.setState({
      jumboData: body,
      line1: body[body.length - 1].line1,
      line2: body[body.length - 1].line2,
      line3: body[body.length - 1].line3,
      id: body[body.length - 1].id
    });
  };
  componentDidMount = () => getFetch(urlPath, this.mountState);

  componentDidUpdate = () => {
    this.state.refreshKey &&
      getFetch(urlPath, this.mountState).then(
        this.setState({ refreshKey: false })
      );
  };

  render() {
    let jumboList = this.state.jumboData.map(element => {
      return (
        <div
          key={element.id}
          style={{
            position: "relative",
            top: "30%",
            right: "50",
            textAlign: "center"
          }}
        >
          <JumboTile
            key={element.id}
            id={element.id}
            line1={element.line1}
            line2={element.line2}
            line3={element.line3}
          />
        </div>
      );
    });

    return (
      <Fragment>
        <AlertBox {...this.state} alertType={this.alertType} />

        <ScrollAnimation animateIn="fadeIn">
          <div className="pt-5 jumboBackground">
            <Particles className="overlayParticle" params={particleOpt} />
            {jumboList}
          </div>

          <div className="text-center">
            <JumboEditForm
              user={this.props.user}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              clickEdit={this.clickEdit}
              {...this.state}
              value={this.state}
            />
          </div>
        </ScrollAnimation>
      </Fragment>
    );
  }
}

export default JumbotronContainer;
