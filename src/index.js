import React from 'react';
import ReactDOM from 'react-dom';
// import {Spring} from "react-motion";

const prospects = [1, 2];

class Prospect extends React.Component {
  render () {
    return <div className="prospect"></div>
  }
}
class App extends React.Component {
  render () {
    return <div className="prospectList">{prospects.map((prospect, i) => <Prospect key={i} />)}</div>;
  }
}


ReactDOM.render(<App />, document.getElementById('content'));
