import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navbar from './navbar.js';
import Bottombar from './bottombar.js';
import Connector from './connector.js';

import config from './config.js';

injectTapEventPlugin();

class App extends React.Component {

  constructor(props) {
    super(props);
  }


  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return <span>
      <Navbar />
      <Connector/>
      <Bottombar />
      </span>;

  }
}
//      <Connector config={config}/>
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<App/>, document.getElementById('reactEntry'));

