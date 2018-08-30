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
    };

    this.load_repos();

    this.onChange = (event, index, value) => {
      // Load the set of groums

      // Set the label
      this.setState( {selectedRepo : index,
                      shownRepo : value} );
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
         repoChange={this.onChange}
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
  constructor(groumId,
              userName, repoName, commitId,
              fileName, methodName, methodLine) {
    this.groumId = groumId;
    this.userName = userName;
    this.repoName = repoName;
    this.commitId = commitId;
    this.fileName = fileName;
    this.methodName = methodName;
    this.methodLine = methodLine; 
  }
}
