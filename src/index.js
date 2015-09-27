import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Spring, TransitionSpring, presets as motionPresets} from "react-motion";


const config = [253, 20];
const prospects = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const spring = (values) => ({val: {...values}, config });
const initialSpring = (dimensions) => spring({
  size: 30, profileLeft: 5, profileTop: 5, prospectRadius: 100, prospectTranslateX: 0, prospectTranslateY: 0
});

const ProfilePicture = ({ip: { val: { profileLeft, profileTop, size } }}) => (
  <div className="profilePicture" style={{
    width: size, height: size, left: profileLeft, top: profileTop
  }} />
);


const Prospect = (props) => <div className={`prospect ${props.comparing ? "is-comparing" : ""}`}
  onClick={(ev) => props.onClick(ev.target.getBoundingClientRect.bind(ev.target))} />;

const AnimatedProspect = ({ip: { val: { left, top, size } }}) => <div className="prospect" style={{
  position: "absolute", left, top, width: size, height: size
}} />;


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {comparingIndex: null, prospectsDimensions: {}};
  }

  willEnterOrLeave(key) {
    return {
      val: {
        size: 60, // original size in css
        left: this.state.prospectsDimensions[key].left - 20, // 20 is the margin value
        top: this.state.prospectsDimensions[key].top - 20
      },
      config
    };
  }

  getEndValue() {
    if (this.state.comparingIndex === null) return {};
    let prospectsDimensions = this.state.prospectsDimensions;
    return {
      [this.state.comparingIndex]: {val: {size: 300, left: 300, top: 180}, config}
    };
  }

  render () {
    return (
        <div>
          <div className="header" onClick={() => this.setState({comparingIndex: null})} >
            <Spring defaultValue={initialSpring(this.state.prospectsDimensions[this.state.comparingIndex])} endValue={this._computeEndValue.bind(this)} >
              {ip => <ProfilePicture ip={ip} />}
            </Spring>
          </div>

          <h3 className="infoTitle">
            Click on any person to see how you two look together!
          </h3>

          <div className="prospectList">
            {prospects.map((prospect, index) => (
              <Prospect key={index} onClick={this._handleProspectClick.bind(this, index)}
                comparing={this.state.comparingIndex === index} />)
              )
            }
          </div>

          <TransitionSpring
            willEnter={this.willEnterOrLeave.bind(this)}
            willLeave={this.willEnterOrLeave.bind(this)}
            endValue={this.getEndValue()}
          >
            {prospectsIps => <div>{Object.keys(prospectsIps).map(key =>
              <AnimatedProspect ip={prospectsIps[key]} />
            )}</div>}
          </TransitionSpring>
        </div>
    );
  }

  _computeEndValue (prev) {
    const {size, profileLeft, profileTop} = this.state.comparingIndex !== null ?
      { size: 300, profileLeft: 200, profileTop: 200 } :
      initialSpring().val;

    return spring({size, profileLeft, profileTop});
  }

  _handleProspectClick (index, getDimensions) {
    const {left, top} = getDimensions();
    this.setState({
      comparingIndex: this.state.comparingIndex === index ? null : index,
      prospectsDimensions: {
        ...this.state.prospectsDimensions,
        [index]: {index, left, top}
      }
    });
  }
}



ReactDOM.render(<App />, document.getElementById('reactContainer'));
