import "babel/polyfill";
import React from "react";
import { render } from "react-dom";
import isMobile from "is-mobile";
import { Spring, TransitionSpring } from "react-motion";

const config = [100, 15];
const spring = (values) => ({val: {...values}, config });
const getProfileInitialSpring = () => spring({size: 40, left: 25, top: 5, radius: 100});

const ProfilePicture = ({ip: { val: {left, top, size, radius} }}) => (
  <div className="profilePicture" style={{width: size, height: size, left, top}}/>
);

const ProspectList = ({ prospects, comparingId, onSelectProspect }) => <div className="prospectList">
<div className="prospectListHeader">Click on any person to see how you two look together!</div>
<div className="prospectListContent">{prospects.map((prospect) =>
  <Prospect key={prospect.id} onClick={onSelectProspect.bind(this, prospect)} comparing={comparingId === prospect.id} prospect={prospect} />
)}</div></div>

const Prospect = (props) => <div className="prospectWrapper"><div className={`prospect ${props.comparing ? "is-comparing" : ""}`}
  onClick={(ev) => props.onClick(ev.target.getBoundingClientRect.bind(ev.target))}><img src={props.prospect.src} width={60}/></div>
  <div className="prospectName">{props.prospect.fullName}</div></div>;

const AnimatedProspect = ({ip: { val: { left, top, size, radius}}, prospect: {src}, onClick}) => <div className="prospect"
  style={{position: "absolute", left, top, width: size, height: size, zIndex: 10}} onClick={onClick} >
  <img src={src} width={size}/></div>;

const CompareFrame = ({ prospect }) => <div className={`compareFrame ${prospect ? "is-comparing" : ""}`}>
  {prospect && <div className="compareFrameNames">
    <span className="compareFrameName">Julia F.</span> & <span className="compareFrameName">{prospect.fullName}</span>
  </div>}
</div>

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {comparingId: null, prospectsDimensions: {}};
  }

  render () {
    return <div>
      <div className="header" onClick={this._stopComparing.bind(this)} >
        <Spring defaultValue={getProfileInitialSpring()} endValue={this._getProfileEndValue.bind(this)} >
          {ip => <ProfilePicture ip={ip} />}
        </Spring>
        <span className="profileName">Julia F.</span>
        <a href="http://match.com" className="headerLogo"><img src="src/assets/images/match-heart-logo-white.png" className="headerLogo_image"/></a>
      </div>
      <ProspectList comparingId={this.state.comparingId} onSelectProspect={this._handleProspectClick.bind(this)}
        prospects={Object.keys(PROSPECT_DATA).map((prospectId) => PROSPECT_DATA[prospectId])} />
      <CompareFrame prospect={PROSPECT_DATA[this.state.comparingId]} />
      <TransitionSpring willEnter={this._animatedProspectWillEnterOrLeave.bind(this)}
        willLeave={this._animatedProspectWillEnterOrLeave.bind(this)}
        endValue={this._getAnimatedProspectEndValue.bind(this)}>
        {currentValue => <div>{Object.keys(currentValue).map(key =>
          <AnimatedProspect onClick={this._stopComparing.bind(this)} key={key} ip={currentValue[key]} prospect={PROSPECT_DATA[key]}/>
        )}</div>}
      </TransitionSpring>
      <div className="footer"><span>Copyright © Match</span></div>
    </div>;
  }

  _stopComparing () {
    this.setState({comparingId: null});
  }

  _getProfileEndValue (prev) {
    if (this.state.comparingId !== null) {
      const radius = 100;
      const top = (prev.val.size < 200 && 10) || (prev.val.size < 300 && 30) || 108;
      const left = (prev.val.size < 200 && 600) || (prev.val.size < 300 && 400) || 430;
      return spring({size: 380, left, top, radius});
    } else {
      return getProfileInitialSpring();
    }
  }

  _animatedProspectWillEnterOrLeave(key) {
    const left = this.state.prospectsDimensions[key].left;
    const top = this.state.prospectsDimensions[key].top;

    return {val: {size: 60, left, top, radius: 100}, config};
  }

  _getAnimatedProspectEndValue(prevAnimations) {
    if (!this.state.comparingId) return {};
    const prev = prevAnimations[this.state.comparingId] && prevAnimations[this.state.comparingId].val || {};
    const radius = prev.size > 100 ? 100 : 50;
    const top = (prev.size < 200 && 500) || 108;
    return {[this.state.comparingId]: {val: {size: 380, left: 839, top, radius}, config}};
  }

  _handleProspectClick ({ id }, getDimensions) {
    const {left, top, right} = getDimensions();
    const prospectsDimensions = {...this.state.prospectsDimensions, [id]: {id, left, right, top}};
    const comparingId = this.state.comparingId === id ? null : id;
    this.setState({comparingId, prospectsDimensions});
  }
}

isMobile() ? document.getElementById('mobileBlocker').setAttribute("style", "") : render(<App />, document.getElementById('reactContainer'));
