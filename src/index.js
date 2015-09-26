import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Spring, presets as motionPresets} from "react-motion";


const config = [253, 20];
const prospects = [1, 2, 3, 4, 5, 6, 7, 8 , 9];
const spring = (values) => ({val: {...values}, config });
const initialSpring = (comparing) => spring({
  size: 30, profileLeft: 5, profileTop: 5, prospectRadius: 100, prospectTranslateX: 0, prospectTranslateY: 0
});

const ProfilePicture = (props) => (
  <div className="profilePicture" style={{
    width: `${props.ip.val.size}px`,
    height: `${props.ip.val.size}px`,
    left: `${props.ip.val.profileLeft}`,
    top: `${props.ip.val.profileTop}`
  }} />
);


const Prospect = (props) => <div className={`prospect ${props.comparing && props.comparing.index === props.index ? "is-comparing" : ""}`}
  ref={(el) => props.onStoreProspectRef(props.index, el)} onClick={() => props.onClick(props.index)} />;

const AnimatedProspect = (props) => <div className="prospect" style={{
  position: "absolute",
  left: `${props.ip.val.left}`,
  top: `${props.ip.val.top}`,
  width: `${props.ip.val.size}`,
  height: `${props.ip.val.size}`
}} />;


class App extends React.Component {
  constructor () {
    super();
    this.prospects = {};
    this.state = {comparing: null};
  }

  render () {
    return (
      <Spring defaultValue={initialSpring(this.state.comparing)} endValue={this._computeEndValue.bind(this)} >
        {ip =>
          <div>

            <div className="header" onClick={() => this.setState({comparing: null})} >
              <ProfilePicture ip={ip} />
            </div>

            {this.state.comparing &&
              <Spring defaultValue={{val: {size: 40, left: this.state.comparing.left, top: this.state.comparing.top}, config}}
                endValue={{val: {size: 300, left: 300, right: 300}, config}}
              >
                {prospectIp => (
                  <AnimatedProspect ip={prospectIp} comparing={this.state.comparing} />
                  )
                }
              </Spring>
            }

            <h3 className="infoTitle">
              Click on any person to see how you two look together!
            </h3>

            <div className="prospectList">
              {prospects.map((prospect, index) => (
                <Prospect key={index} index={index} onClick={this._handleProspectClick.bind(this)}
                  onStoreProspectRef={(index, ref) => this.prospects[index] = ref}  comparing={this.state.comparing} />)
                )
              }
            </div>

          </div>
        }
      </Spring>
    );
  }

  _computeEndValue (prev) {
    let {size, profileLeft, profileTop} = initialSpring().val;

    if (this.state.comparing) {
      size = 300;
      profileLeft = 200;
      profileTop = 200;
    }

    return spring({size, profileLeft, profileTop});
  }

  _handleProspectClick (index) {
    const {left, top} = this.prospects[index].getBoundingClientRect();
    this.setState({comparing: {index, left, top}});
  }
}



ReactDOM.render(<App />, document.getElementById('reactContainer'));
