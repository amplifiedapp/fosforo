import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import {Spring, TransitionSpring, presets as motionPresets} from "react-motion";


const config = [253, 20];
const prospects = [
  {id: "1", src: "http://images.celebeat.com/data/images/full/3789/jennifer-aniston-puts-on-weight-for-her-role-in-cake-ib-times.jpg", fullName: "Jennifer A."},
  {id: "2", src: "http://www.celebritynetworth.co/wp-content/uploads/2015/08/angelina-jolie-197957_w1000.jpg", fullName: "Angelina J."},
  {id: "3", src: "http://i.huffpost.com/gen/1351199/images/o-DEMI-MOORE-2013-facebook.jpg", fullName: "Demi M."},
  {id: "4", src: "http://www.theplace2.ru/archive/claire_forlani/img/2006jan2forlani55eb.jpg", fullName: "Claire F."},
  {id: "5", src: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Gwyneth_Paltrow_2012.jpg", fullName: "Gwyneth P."},
  {id: "6", src: "http://www.dvdsreleasedates.com/pictures/800/12000/Thandie-Newton.jpg", fullName: "Thandie N."},
  {id: "7", src: "https://pmcdeadline2.files.wordpress.com/2012/08/ormond__120830221523.jpg", fullName: "Julia O."},
  {id: "8", src: "http://lostfilm.info/images/photo_actor/51/583271_507482.jpg", fullName: "Sonita H."},
  {id: "9", src: "http://images.mstarz.com/data/images/full/28019/sinitta.jpg", fullName: "Sinitta"},
];

const spring = (values) => ({val: {...values}, config });


const ProfilePicture = ({ip: { val: {left, top, size, radius} }}) => (
  <div className="profilePicture" style={{
    width: size, height: size, left, top, borderRadius: `${radius}%`
  }}/>
);

const Prospect = (props) => <div className="prospectWrapper"><div className={`prospect ${props.comparing ? "is-comparing" : ""}`}
  onClick={(ev) => props.onClick(ev.target.getBoundingClientRect.bind(ev.target))}><img src={props.prospect.src} width={60}/></div>
  <span className="prospectName">{props.prospect.fullName}</span></div>;

const AnimatedProspect = ({ip: { val: { left, top, size, radius} }, prospect:{src}}) => <div className="prospect" style={{
  position: "absolute", left, top, width: size, height: size, borderRadius: `${radius}%`
}}><img src={src} width={size}/></div>;


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {comparingIndex: null, prospectsDimensions: {}};
  }

  render () {
    return (
        <div>
          <div className="header" onClick={() => this.setState({comparingIndex: null})} >
            <Spring defaultValue={this._getProfileInitialSpring()} endValue={this._getProfileEndValue.bind(this)} >
              {ip => <ProfilePicture ip={ip} />}
            </Spring>
          </div>

          <h3 className="infoTitle">
            Click on any person to see how you two look together!
          </h3>

          <div className="prospectList">
            {prospects.map((prospect, index) => (
              <Prospect key={index} onClick={this._handleProspectClick.bind(this, index)}
                comparing={this.state.comparingIndex === index} prospect={prospect} />)
              )
            }
          </div>

          <div className={`compareFrame ${this.state.comparingIndex !== null ? "is-comparing" : ""}`}></div>

          <TransitionSpring
            willEnter={this._animatedProspectWillEnterOrLeave.bind(this)}
            willLeave={this._animatedProspectWillEnterOrLeave.bind(this)}
            endValue={this._getAnimatedProspectEndValue()}
          >
            {currentValue => <div>{Object.keys(currentValue).map(key =>
              <AnimatedProspect key={key} ip={currentValue[key]} prospect={prospects[key]}/>
            )}</div>}
          </TransitionSpring>
        </div>
    );
  }

  _getProfileInitialSpring () {
    return spring({size: 40, left: 500, top: 5, radius: 100});
  }

  _getProfileEndValue (prev) {
    // Remember that default spring and end values must have the same format.
    if (this.state.comparingIndex !== null) {
      const radius = prev.val.size < 150 ? 80 : 0;
      return spring({size: 380, left: 860, top: 130, radius});
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
    if (this.state.comparingIndex === null) return {};
    return {
      [this.state.comparingIndex]: {val: {size: 380, left: 450, top: 110, radius: 0}, config}
    };
  }

  _handleProspectClick (index, getDimensions) {
    const {left, top, right} = getDimensions();
    const prospectsDimensions = {...this.state.prospectsDimensions, [index]: {index, left, right, top}};
    const comparingIndex = this.state.comparingIndex === index ? null : index;
    this.setState({comparingIndex, prospectsDimensions});
  }
}

ReactDOM.render(<App />, document.getElementById('reactContainer'));
