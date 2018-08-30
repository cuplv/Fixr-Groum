import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import AppSelector from './appselector.js'
import CodeViewer from './srcviewer/codeViewer.js';

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

      querySrcData : null,
      querySrcError : null,
      querySrcIso : null,
    };

    this.load_repos();

    this.onChangeApp = (event, index, value) => {
      this.setState( {selectedRepo : index, shownRepo : value} );
      this.load_groums(this.state.repos[index].repoId);
    }

    this.setQueryCode = (reply) => {
      if (reply["errorDesc"] != "") {
        // $().dpToast(reply["errorDesc"], 4000);
        console.log(reply["errorDesc"]);
        this.setState( {querySrcError : reply["errorDesc"],
                        querySrcData : null} );
      } else {
        var res_array = reply["res"]
        if (res_array.length > 1) {
          var res_line = res_array[0][0];
          var code_array = res_array[1];

          if (code_array.length > 0) {
            console.log("Setting source code");
            console.log(code_array[0]);
            this.setState( {querySrcError : null,
                            querySrcData : new SrcData(code_array[0], res_line)} );
          }
        }
      }
    }

    this.onChangeGroum = (event, index, value) => {
      this.setState( {selectedGroum : index, shownGroum : value} );

      var currentRepo = this.state.repos[this.state.selectedRepo]
      var currentGroum = this.state.groums[index]

      this.load_source_code(currentRepo.user, currentRepo.repo,
                            currentRepo.commitId,
                            currentGroum.fileName, currentGroum.simpleMethodName,
                            currentGroum.methodLine,
                            this.setQueryCode.bind(this));
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
        <AppSelector
         label={"Repository"}
         repos={this.state.repos}
         shownRepo={this.state.shownRepo}
         repoChange={this.onChangeApp}
        />
        <AppSelector
         label={"Method"}
         repos={this.state.groums}
         shownRepo={this.state.shownGroum}
         repoChange={this.onChangeGroum}
         style={{width:"100%"}}
        />
        <FlatButton label="Search" style={{width:"100%"}}/>
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
        <CodeViewer srcTextObj={this.state.querySrcData}
                    srcRepo={(null ? this.state.repos == null : this.state.repos[this.state.selectedRepo])}
                    srcGroum={(null ? this.state.groums == null : this.state.groums[this.state.selectedGroum])}
                    srcIso={this.state.querySrcIso}
        />
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
        repos.push(new Repo(repoMap["app_key"],
                            repoMap["user_name"],
                            repoMap["repo_name"],
                            repoMap["commit_hash"],
                            repoMap["url"],
                           ));
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
                                 resMap["class_name"],
                                 resMap["method_name"],
                                 resMap["method_line_number"]));
      }

      console.log('Loaded ' + groums.length + ' groums...');

      var value = groums.length > 0 ? 0 : null;
      this.setState( {groums : groums,
                      selectedGroum : value} );
    }.bind(this));
  }

  // Request: search
  load_source_code(user, repo, commitId,
                   classFile, methodName, methodLine,
                   setFunction) {
    var src_query = {
      "githubUrl" : "https://github.com/" + user + "/" + repo,
      "commitId" : commitId,
      "declaringFile" : classFile,
      "methodLine" : methodLine,
      "methodName" : methodName,
      "url" : this.props.config.srcServiceUrl
    };

    console.log('Getting code source ', src_query);

    var srcRequest = $.ajax({
      type: 'get',
      url: window.location.protocol + '//' + window.location.host + "/getsrc",
      data: src_query,
    });

    srcRequest.fail(function(reply){
      console.log('Failed to get source code...');
    }.bind(this));

    srcRequest.done(setFunction);
  }

}

export default Connector;


class Repo {
  constructor(repoId, user, repo, commitId, repoName) {
    this.repoId = repoId;
    this.user = user;
    this.repo = repo;
    this.commitId = commitId;
    this.repoName = repoName;
  }
}

class GroumSrc {
  constructor(groumId, fileName, className, simpleMethodName, methodLine) {
    this.groumId = groumId;
    this.fileName = fileName;
    this.className = className;
    this.simpleMethodName = simpleMethodName;
    this.methodName = this.className + "." + this.simpleMethodName
    this.methodLine = methodLine;
  }
}

class SrcData {
  constructor(srcText, lineNumber) {
    this.srcText = srcText;
    this.lineNumber = lineNumber;
  }
}

class SrcIso {
  constructor() {
    this.srcAdded = [];
    this.srcRemoved = [];
    this.srcMatched = [];
  }
}
