import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navbar from './navbar.js';
import Bottombar from './bottombar.js';
import Connector from './connector.js';

import Paper from 'material-ui/Paper';

import config from './config.js';

injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {

    var myTheme = getMuiTheme(baseTheme);
    console.log(myTheme["fontFamily"]);
    myTheme["fontFamily"] = "Helvetica Neue, Helvetica, Arial";

    return { muiTheme: myTheme};
  }

  render() {
    return <div style={{height: '100vh', width : '100%', flex :1}}>
      <Navbar/>
      <Connector config={config}/>
      <Bottombar/>
      </div>;
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<App/>, document.getElementById('reactEntry'));

