import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import PatternDetail from './patternDetail.js';
import PatternList from './patternList.js';

import CodeViewer from './srcviewer/codeViewer.js';

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

class Connector extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      github : "",
      commitId : "",
      methods : "",
      lineNumber : "",
      fileName : "",
      response : "",
      DetailedPattern : "",

      srcText : "void main() {\n  i = i + 1;\n  return cavallo;\n}",
      srcAdded : [],
      srcRemoved : [],
      srcMatched : [],

      dstText : null,
      dstAdded : [],
      dstRemoved : [],
      dstMatched : [],

      hiddenCard:true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  showDetail(content) {
    this.setState({
      DetailedPattern:content,
      hiddenCard:false,
    })
  }

  onSubmit() {
    var user = this.state.github.split('/')[0];
    var repo = this.state.github.split('/')[1];
    var ptr = this.state.methods.lastIndexOf('.');
    var className = this.state.methods.substr(0,ptr);
    var simple_method_name = this.state.methods.substr(ptr+1);
    var service = this.props.config.compute_url;
    var srcService = this.props.config.srcServiceUrl

    var data = {
      "user": user,
      "repo": repo,
      "class": className,
      "method": method,
      "url" : service
    }

    console.log('data',data);
    var request = $.ajax({
      type: 'get',
      url: window.location.protocol+'//'+window.location.host+"/corspost",
      data: data,
    });

    request.done(function(reply){
      var json = JSON.parse(reply.content);
      console.log('reply',json)
      this.setState({
        //response:JSON.stringify(reply.content,null,4),
        response: json
      })
    }.bind(this));


    var gitHubUrl = "https://github.com/" + user + "/" + repo
    var src_query = {
      "githubUrl" : gitHubUrl,
      "commitId" : this.state.commitId,
      "declaringFile" : this.state.fileName,
      "methodLine" : this.state.lineNumber,
      "methodName" : simple_method_name,
      "url" : srcService
    }

    console.log('Getting code source ', src_query)
    var srcRequest = $.ajax({
      type: 'get',
      url: window.location.protocol + '//' + window.location.host + "/getsrc",
      data: src_query,
    });

    srcRequest.fail(function(reply){
      console.log('Failed!')
    }.bind(this));

    srcRequest.done(function(reply){
      console.log('Source code query result:', reply)

      if (reply == null) {
        console.log('Error, null reply',
                    reply.errorDesc)
      } else if (reply.errorDesc != null && reply.errorDesc != "") {
        console.log('Error retrieving the source code:',
                    reply.errorDesc)
      } else if (reply.res == null) {
        console.log('Error retrieving the source code, no results')
      } else if (reply.res.length <= 0)  {
        console.log('Source code not found!')
      } else {
        this.setState({srcText : reply.res[0]})
      }
    }.bind(this));
  }

  render(){

    var height = $(window).height() * 0.8

    var patternDetail;

    if(!this.state.hiddenCard)
      patternDetail = <PatternDetail pattern={this.state.DetailedPattern} />;

    return <div>
  <Grid fluid>
    <Row>
      {/* Search query */}
      <Col xs={6} md={4} lg={4} style={{marginLeft:'auto',marginRight:'auto'}}>
        <Paper style={style.searchstyle} zDepth={1} rounded={false}>
          <span style={{width:'100%'}}>Method from GitHub </span><br/>
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
      {/* Pattern search */}
      <Col xs={6} md={8} lg={8} style={{marginLeft:'auto',marginRight:'auto'}}>
        <PatternList
         pattern={this.state.response}
         showDetail={this.showDetail.bind(this)}/>
      </Col> 
    </Row>
    <Row>
      {/* Original source code */}
      <Col style={style.codestyle}>
        <Card style={{height:height,marginTop:10,width:'100%'}}>
          <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
            <span>Selected source code</span>
          </CardText>
          <CodeViewer srcText={this.state.srcText}
           added={this.state.srcAdded}
           removed={this.state.srcRemoved}
           matched={this.state.srcMatched}
          />
        </Card>
      </Col>
      {/* Other code */}
      <Col style={style.codestyle}>
        <Card style={{height:height,marginTop:10,width:'100%'}}>
          <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
            <span>Other source code</span>
          </CardText>
        </Card>
      </Col>
    </Row>
  </Grid>
</div>
  }
}

export default Connector;
