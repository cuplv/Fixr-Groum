import React from 'react';
import ReactDOM from 'react-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navbar from '../navbar.js';

import GetApi from './getApi.js';

injectTapEventPlugin();

class GroumPage extends React.Component {

  constructor(props) {
    super(props);
  }


  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {

    function createCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
      createCookie(name,"",-1);
    }

    var x = readCookie('test');
    console.log('x',JSON.parse(x));
    var data = JSON.parse(x);
    eraseCookie('test');

    return <div>
        <Navbar />
        <GetApi data={data}/>
    </div>;
  }
}

GroumPage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ReactDOM.render(<GroumPage/>, document.getElementById('groumEntry'));

