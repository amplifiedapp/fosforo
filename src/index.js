import React from 'react';
import ReactDOM from 'react-dom';
import {Spring, presets as motionPresets} from "react-motion";


const prospects = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10];

class Prospect extends React.Component {
  constructor () {
    super();
    this.state = {open: false};
  }

  render () {
    let left = this.props.index * 40;
    let top = this.props.index * 40;

    return (
      <Spring defaultValue={{size: {val: 40}}} endValue={{size: {val: this.state.open ? 100 : 40, config: motionPresets.wobbly}}}>
        {interpolated =>
          <div className="prospect" onClick={() => this.setState({open: !this.state.open})} style={{
            width: `${interpolated.size.val}px`,
            height: `${interpolated.size.val}px`,
            left: left,
            top: top
          }} />
        }
      </Spring>
    );

  }
}

class ProspectList extends React.Component {
  render () {
    return (
      <div className="prospectList">
        {prospects.map((prospect, i) => <Prospect key={i} index={i}/>)}
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    return <ProspectList />;
  }
}


ReactDOM.render(<App />, document.getElementById('content'));
