import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Spring, TransitionSpring, presets as motionPresets} from "react-motion";

const config = [253, 20];
const spring = (values) => ({val: {...values}, config });

const ProfilePicture = ({ip: { val: {left, top, size, radius} }}) => (
  <div className="profilePicture" style={{width: size, height: size, left, top, borderRadius: `${radius}%`}}/>
);

const Prospect = (props) => <div className="prospectWrapper"><div className={`prospect ${props.comparing ? "is-comparing" : ""}`}
  onClick={(ev) => props.onClick(ev.target.getBoundingClientRect.bind(ev.target))}><img src={props.prospect.src} width={60}/></div>
  <span className="prospectName">{props.prospect.fullName}</span></div>;

const AnimatedProspect = ({ip: { val: { left, top, size, radius} }, prospect:{src}}) => <div className="prospect" style={{
  position: "absolute", left, top, width: size, height: size, borderRadius: `${radius}%`}}><img src={src} width={size}/></div>;

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {comparingId: null, prospectsDimensions: {}};
  }

  render () {
    return (
        <div>
          <div className="header" onClick={() => this.setState({comparingId: null})} >
            <Spring defaultValue={this._getProfileInitialSpring()} endValue={this._getProfileEndValue.bind(this)} >
              {ip => <ProfilePicture ip={ip} />}
            </Spring>
          </div>


          <div className="prospectList">
            <div className="prospectListHeader">Click on any person to see how you two look together!</div>
            <div className="prospectListContent">
            {_.map(PROSPECT_DATA, (prospect, id) => (
              <Prospect key={id} onClick={this._handleProspectClick.bind(this, id)}
                comparing={this.state.comparingId === id} prospect={prospect} />)
            )}
            </div>
          </div>
          <div className={`compareFrame ${this.state.comparingId !== null ? "is-comparing" : ""}`}></div>
          <TransitionSpring
            willEnter={this._animatedProspectWillEnterOrLeave.bind(this)}
            willLeave={this._animatedProspectWillEnterOrLeave.bind(this)}
            endValue={this._getAnimatedProspectEndValue()}
          >
            {currentValue => <div>{Object.keys(currentValue).map(key =>
              <AnimatedProspect key={key} ip={currentValue[key]} prospect={PROSPECT_DATA[key]}/>
            )}</div>}
          </TransitionSpring>
        </div>
    );
  }

  _getProfileInitialSpring () {
    return spring({size: 40, left: 25, top: 5, radius: 100});
  }

  _getProfileEndValue (prev) {
    // Remember that default spring and end values must have the same format.
    if (this.state.comparingId !== null) {
      const radius = prev.val.size < 150 ? 80 : 0;
      return spring({size: 380, left: 860, top: 100, radius});
    } else {
      return this._getProfileInitialSpring();
    }
  }

  // Prospect
  _animatedProspectWillEnterOrLeave(key) {
    return {
      val: {
        size: 60, // original size in css
        left: this.state.prospectsDimensions[key].left - 20, // 20 is the margin value
        top: this.state.prospectsDimensions[key].top - 20,
        radius: 100
      },
      config
    };
  }

  _getAnimatedProspectEndValue(prev) {
    return this.state.comparingId ? {[this.state.comparingId]: {val: {size: 380, left: 450, top: 80, radius: 0}, config}} : {};
  }

  _handleProspectClick (id, getDimensions) {
    const {left, top, right} = getDimensions();
    const prospectsDimensions = {...this.state.prospectsDimensions, [id]: {id, left, right, top}};
    const comparingId = this.state.comparingId === id ? null : id;
    this.setState({comparingId, prospectsDimensions});
  }
}

ReactDOM.render(<App />, document.getElementById('reactContainer'));
