import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import AppSelector from './appselector.js'

const style = {
  topsearchstyle : {
    height: 200,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bottomsearchstyle : {
    width: '100%',
    flex : 1,
    display : 'flex',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
};

class Connector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos : [],
      selectedRepo : null,
      shownRepo : null,

      groums : [],
      selectedGroum : null,
      shownGroum : null,
    };

    this.load_repos();

    this.onChangeApp = (event, index, value) => {
      this.setState( {selectedRepo : index, shownRepo : value} );
      this.load_groums(this.state.repos[index].repoId);
    }
    this.onChangeGroum = (event, index, value) => {
      this.setState( {selectedGroum : index, shownGroum : value} );
      // load source code
    }
  }

  render() {
    var bottom_height = $(window).height() - 50 - 40 - 200 - 20 - 20 - 20;

    return (
<div style={{paddingTop:10}}>
  <Grid fluid>
    <Row style={{paddingTop: 10, paddingBottom:10}}>
      <Col xs={6} md={6} lg={6} style={{marginLeft:'auto',marginRight:'auto'}}>
        <Paper style={style.topsearchstyle} zDepth={1} rounded={false}>
        <AppSelector repos={this.state.repos}
         shownRepo={this.state.shownRepo}
         repoChange={this.onChangeApp}
        />
        <AppSelector repos={this.state.groums}
         shownRepo={this.state.shownGroum}
         repoChange={this.onChangeGroum}
        />
        </Paper>
      </Col>
      <Col xs={6} md={6} lg={6} style={{marginLeft:'auto',marginRight:'auto'}}>
        <Paper style={style.topsearchstyle} zDepth={1} rounded={false}>
        </Paper>
      </Col>
    </Row>
    <Row style={{paddingTop: 10, paddingBottom:10, flex : 1}}>
      <Col xs={6} md={6} lg={6} style={{marginLeft:'auto',marginRight:'auto',flex : 1}}>
        <Paper style={{height : bottom_height, flex : 1}} zDepth={1} rounded={false}>
        </Paper>
      </Col>
      <Col xs={6} md={6} lg={6} style={{marginLeft:'auto',marginRight:'auto',flex : 1}}>
        <Paper style={{height : bottom_height, flex : 1}} zDepth={1} rounded={false}>
        </Paper>
      </Col>
    </Row>
  </Grid>
</div>
    )
  }


  // Request: load the repos
  load_repos() {
    console.log(`Loading repos...`);

    var reposRequest = $.ajax({
      type: 'get',
      url: window.location.protocol +
        '//' + window.location.host + "/crossdomain",
      data: {url : this.props.config.getAppsUrl}
    });

    reposRequest.fail(function(reply) {
      console.log('Failed loading repos...');
    });

    reposRequest.done(function(reply) {
      console.log('Loaded repos...');

      var repos = [];
      for (var i = 0; i < reply.length; i++) {
        var repoMap = reply[i];
        repos.push(new Repo(repoMap["app_key"], repoMap["url"]));
      }

      var value = repos.length > 0 ? 0 : null;

      this.setState( {repos : repos,
                      selectedRepo : value} );
    }.bind(this));
  }

  // Request: load groums for repo
  load_groums(repoId) {
    console.log(`Loading groums...`);

    var reposRequest = $.ajax({
      type: 'get',
      url: window.location.protocol +
        '//' + window.location.host + "/get_groums",
      data: {url : this.props.config.getGroumsUrl,
             app_key : repoId}
    });

    reposRequest.fail(function(reply) {
      console.log('Failed loading groums for repo ' + repoId);
    });

    reposRequest.done(function(reply) {
      console.log('Loaded groums...');

      var groums = [];
      for (var i = 0; i < reply.length; i++) {
        var resMap = reply[i];
        groums.push(new GroumSrc(resMap["groum_key"],
                                 resMap["source_class_name"],
                                 resMap["class_name"] + "." + resMap["method_name"],
                                 resMap["method_line_number"]));
      }

      console.log('Loaded ' + groums.length + ' groums...');

      var value = groums.length > 0 ? 0 : null;
      this.setState( {groums : groums,
                      selectedGroum : value} );
    }.bind(this));
  }

  // Request: search

  // Request: load source code -- push in the component
}

export default Connector;


class Repo {
  constructor(repoId, repoName) {
    this.repoId = repoId;
    this.repoName = repoName;
  }
}

class GroumSrc {
  constructor(groumId, fileName, methodName, methodLine) {
    this.groumId = groumId;
    this.fileName = fileName;
    this.methodName = methodName;
    this.methodLine = methodLine; 
  }
}
