import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import PatternDetail from './patternDetail.js';
import PatternList from './patternList.js';

const style = {
  searchstyle:{
    height: 150,
    width: '100%',
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
  paperstyle:{
    width: '100%',
    height:150,
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
      github:"",
      methods:"",
      response:"",
      DetailedPattern:"",
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
    var method = this.state.methods.substr(ptr+1);
    var service = this.props.config.compute_url;

    var data = {
      "user": user,
      "repo": repo,
      "class": className,
      "method": method,
      "url" : service
    }
    /*
      var data = {
      "user": "MobClub",
      "repo": "ThirdPartyLoginDemo",
      "class": "cn.sharesdk.tpl.ThirdPartyLogin",
      "method": "onComplete",
      "url" : service
      }
    */
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
  }

  render(){

    var height = $(window).height()

    var patternDetail;

    if(!this.state.hiddenCard)
      patternDetail = <PatternDetail pattern={this.state.DetailedPattern} />;

    return <div>
  <Grid fluid>
    <Row>
      {/* Search query */}
      <Col xs={6} md={3} lg={3} style={{marginLeft:'auto',marginRight:'auto'}}>
        <Paper style={style.searchstyle} zDepth={1} rounded={false}>
          <span style={{width:'50%'}}>Method from GitHub </span>
          <TextField
            hintText="User/Repo"
            value={this.state.github}
            onChange={e => {this.setState({ github: e.target.value })}} style={{width:'50%'}}
          />
          <TextField
           hintText="Package and Class Name"
           value={this.state.methods} style={{width:'100%'}} 
           onChange={e => {this.setState({ methods: e.target.value })}}
           />
           <FlatButton label="Search" onClick={() => this.onSubmit()}/>
        </Paper>
      </Col>
      {/* Pattern search */}
      <Col xs={6} md={9} lg={9} style={{marginLeft:'auto',marginRight:'auto'}}>
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
