import React from "react";
import ReactDOM from "react-dom";
import {Spring, presets as motionPresets} from "react-motion";
import ProfilePicture from "./profile_picture";
import _ from "lodash";

const prospects = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10];

const Prospect = (props) => (
  <Spring defaultValue={{size: {val: 40}}} endValue={{size: {val: props.open ? 100 : 40, config: motionPresets.woobly}}}>
    {interpolated =>
      <div className="prospect" onClick={props.changeState.bind(this, props.index)}
           style={{width: `${interpolated.size.val}px`, height: `${interpolated.size.val}px`, left: (props.index % 4) * 80, top: Math.floor(props.index/4) * 80}} />
    }
  </Spring>
);

class ProspectList extends React.Component {
  constructor () {
    super();
    this.state = {selectedProspect: -1};
  }

  render () {
    return (
      <div className="prospectList">
        {prospects.map((prospect, i) => <Prospect key={i} index={i} open={i === this.state.selectedProspect} changeState={this._changeOpen.bind(this)}/>)}
      </div>
    );
  }

  _changeOpen (index) {
    this.setState({selectedProspect: index});
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {profilePictureOpen: false, listPosition: {left: 0, top: 0}};
  }
  render () {
    return (
      <div>
        <div className="header">
          <ProfilePicture listPosition={this.state.listPosition} onClick={this._handleProfilePictureClick.bind(this)} open={this.state.profilePictureOpen} />
        </div>
        <ProspectList ref="prospectList" />
      </div>
    );
  }

  componentDidMount() {
    const updatePosition = () => {
      const {left, top} = ReactDOM.findDOMNode(this.refs.prospectList).getBoundingClientRect();
      this.setState({listPosition: {left, top}});
    }
    window.addEventListener("resize", _.throttle(updatePosition, 100));
    updatePosition();
  }

  _handleProfilePictureClick () {
    this.setState({profilePictureOpen: !this.state.profilePictureOpen});
  }
}

ReactDOM.render(<App />, document.getElementById('reactContainer'));
