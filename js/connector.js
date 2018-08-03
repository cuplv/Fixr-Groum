import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import PatternList from './patternList.js';

import CodeViewer from './srcviewer/codeViewer.js';

import MockData from './mockdata.js'


const style = {
  searchstyle:{
    height: 200,
    width: '100%',
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
  paperstyle:{
    width: '100%',
    height:200,
    textAlign: 'left',
    padding: 10,
    overflowY:'auto',
    overflowX:'scroll',
    whiteSpace:'nowrap',
  },
  codestyle:{
    width: '49%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
};

class Connector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      github : "",
      commitId : "",
      methods : "",
      lineNumber : "",
      fileName : "",
      patternList : null,
      selectedPatternIndex : "",

      srcText : null,
      srcTextObj : null,
      srcAdded : [],
      srcRemoved : [],
      srcMatched : [],

      dstTextObj : null,
      dstAdded : [],
      dstRemoved : [],
      dstMatched : [],

      hiddenCard : true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /* Callback invoked when a "card" (a pattern) is selected.
   *
   */
  showDetail(patternContainer, selectedIndex) {
    if (null == this.state.patternList) {
      console.log("Null pattern list");
    }
    else {
      console.log('Update pattern selection')

      var selectedPattern = patternContainer.pattern

      if (selectedPattern.groum_keys_t.length == 0) {
        console.log("No groums found in the result pattern");
      }
      else {
        // Get the groum data

        var reprGroum = selectedPattern.groum_keys_t[0];
        var keySplitted = reprGroum.split("/");

        var user = keySplitted[0];
        var repo = keySplitted[1];
        var commitId = keySplitted[2];
        var methodClass = keySplitted[3];
        var simpleMethodName = keySplitted[4];

        var groumRequest = $.ajax({
          type: 'get',
          url: window.location.protocol +
            '//' + window.location.host + "/crossdomain",
          data: {url : this.props.config.provenance,
                 user : user,
                 repo : repo,
                 class : methodClass,
                 method : simpleMethodName,
                 hash : commitId }
        });

        groumRequest.fail(function(reply) {
          console.log('Failed to retrieve the groum information...')
        }.bind(this));

        groumRequest.done(function(reply) {
          console.log(`Read groum information...`);

          var repo_sni = reply.repo_sni;
          var repo_sni_splitted = repo_sni.split("/");
          var user = repo_sni_splitted[0];
          var repo = repo_sni_splitted[1];
          var fileName = reply.filename_t[0];
          var lineNumber = reply.method_line_number_sni;
          var simpleMethodName = reply.method_name_t[0];
          var srcService = this.props.config.srcServiceUrl

          var updatingFun = function (data) {
            this.setState({ dstTextObj: data})
          }.bind(this);

          var textObj = new MethodSrcObj(user, repo, commitId,
                                         className, simpleMethodName,
                                         fileName, lineNumber,
                                         null)

          this.setSourceCode(textObj, srcService, updatingFun)

          this.setState({
            selectedPatternIndex : selectedIndex,
            hiddenCard : false,
          })
        }.bind(this));
      }
    }
  }

  setSourceCode(textObj, srcService, updating) {
    var gitHubUrl = "https://github.com/" + textObj.user + "/" + textObj.repo
    var src_query = {
      "githubUrl" : gitHubUrl,
      "commitId" : textObj.commitId,
      "declaringFile" : textObj.fileName,
      "methodLine" : textObj.lineNumber,
      "methodName" : textObj.methodName,
      "url" : srcService
    }

    console.log('Getting code source ', src_query)
    var srcRequest = $.ajax({
      type: 'get',
      url: window.location.protocol + '//' + window.location.host + "/getsrc",
      data: src_query,
    });

    srcRequest.fail(function(reply){
      console.log('Failed request...')
      updating(null);
    }.bind(this));

    srcRequest.done(function(reply){
      console.log('Source code query result:', reply);

      if (reply == null) {
        console.log('Error, null reply', reply.errorDesc);
      } else if (reply.errorDesc != null && reply.errorDesc != "") {
        console.log('Error retrieving the source code:',
                    reply.errorDesc);
      } else if (reply.res == null) {
        console.log('Error retrieving the source code, no results');
      } else if (reply.res.length <= 0)  {
        console.log('Source code not found!');
      } else {
        var foundLineNumber = reply.res[0]
        var sourceCode = reply.res[1]

        textObj.srcText = sourceCode

        updating(textObj);
      }
    }.bind(this));
  }

  onSubmit() {
    var user = this.state.github.split('/')[0];
    var repo = this.state.github.split('/')[1];
    var ptr = this.state.methods.lastIndexOf('.');
    var className = this.state.methods.substr(0,ptr);
    var simpleMethodName = this.state.methods.substr(ptr+1);
    var commitId = this.state.commitId;
    var fileName = this.state.fileName;
    var lineNumber = this.state.lineNumber;
    var service = this.props.config.compute_url;
    var srcService = this.props.config.srcServiceUrl

    // DEBUG -- remove
    var user = "SueSmith"
    var repo = "android-speak-repeat"
    var className = "com.example.speakrepeat.SpeechRepeatActivity"
    var simpleMethodName = "listenToSpeech"
    var commitId = "f6039b53b561fa54f8ea20873209dc4e8bb807ad";
    var fileName = "SpeechRepeatActivity.java";
    var lineNumber = 127;

    var groumData = {
      "user": user,
      "repo": repo,
      "class": className,
      "method": simpleMethodName,
      "url" : service
    }

    console.log('Query groum data', groumData);
    var groumRequest = $.ajax({
      type: 'get',
       url: window.location.protocol+'//'+window.location.host+"/corspost",
      data: groumData,
    });

    groumRequest.done(function(reply){
      var json = JSON.parse(reply.content);
      console.log('reply',json)
      this.setState({
        patternList: json
      })
    }.bind(this));

    var updatingFun = function (data) {
      this.setState({ srcTextObj: data })
    }.bind(this);

    var textObj = new MethodSrcObj(user, repo, commitId,
                                   className, simpleMethodName,
                                   fileName, lineNumber,
                                   null)

    this.setSourceCode(textObj,
                       srcService,
                       updatingFun)
  }

  render(){

    var height = $(window).height() * 0.8

    return <div>
  <Grid fluid>
    <Row>
      {/* Search query */}
      <Col xs={6} md={4} lg={4} style={{marginLeft:'auto',marginRight:'auto'}}>
        <Paper style={style.searchstyle} zDepth={1} rounded={false}>
          <span style={{width:'100%'}}>Method from GitHub</span><br/>
          <TextField
            hintText="User/Repo"
            value={this.state.github}
            style={{width:'59%', align : 'right'}}
            onChange={e => {this.setState({ github: e.target.value })}} style={{width:'50%'}}
          />
          <TextField
           hintText="Commit Id"
           value={this.state.commitId} style={{width:'29%', textAlign : 'right'}}
           onChange={e => {this.setState({ commitId: e.target.value })}}
           />
          <TextField
           hintText="Method name"
           value={this.state.methods} style={{width:'100%'}} 
           onChange={e => {this.setState({ methods: e.target.value })}}
           />
          <TextField
           hintText="File name"
           value={this.state.fileName} style={{width:'70%'}} 
           onChange={e => {this.setState({ fileName: e.target.value })}}
           />
          <TextField
           hintText="Line number"
           style={{width:'29%', textAlign : 'right'}}
           value={this.state.lineNumber}
           onChange={e => {this.setState({ lineNumber: e.target.value })}}
           />
           <FlatButton label="Search" onClick={() => this.onSubmit()}/>
        </Paper>
      </Col>
      {/* Results of the pattern search */}
      <Col xs={6} md={8} lg={8} style={{marginLeft:'auto',marginRight:'auto'}}>
        <PatternList
         pattern={this.state.patternList}
         showDetail={this.showDetail.bind(this)}/>
      </Col> 
    </Row>
    <Row>
      {/* Original source code */}
      <Col style={style.codestyle}>
        <Card style={{height:height,marginTop:10,width:'100%',overflow:'auto'}}>
          <CardText style={{width:'100%',height:'100%', padding:5, overflow:'auto'}}>
            <span>Selected source code</span>
          </CardText>
          <CodeViewer srcTextObj={this.state.srcTextObj}
           added={this.state.srcAdded}
           removed={this.state.srcRemoved}
           matched={this.state.srcMatched}
          />
        </Card>
      </Col>
      {/* Other code */}
      <Col style={style.codestyle}>
        <Card style={{height:height,marginTop:10,width:'100%', overflow:'auto'}}>
          <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
          </CardText>
          <CodeViewer srcTextObj={this.state.dstTextObj}
           added={this.state.srcAdded}
           removed={this.state.srcRemoved}
           matched={this.state.srcMatched}
          />
        </Card>
      </Col>
    </Row>
  </Grid>
</div>
  }
}

class MethodSrcObj {

  constructor(user, repo, commitId,
              className, methodName,
              fileName, lineNumber,
              srcText) {

    this.user = user;
    this.repo = repo;
    this.commitId = commitId;
    this.className = className;
    this.methodName = methodName;
    this.fileName = fileName;
    this.lineNumber = lineNumber;
    this.srcText = srcText;
  }
}

export default Connector;
