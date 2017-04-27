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
        var service = 'http://13.58.122.176:8081/compute/method/groums'
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
    }

    render(){


        var patternDetail;
        if(!this.state.hiddenCard)
            patternDetail = <PatternDetail pattern={this.state.DetailedPattern} />;
        return <div>
            <Grid fluid>
            <Row>
                <Col xs={6} md={3} lg={3}>
            <Paper style={style.searchstyle} zDepth={1} rounded={false}>
            <TextField
                hintText="Github URL" value={this.state.github}
                onChange={e => {this.setState({ github: e.target.value })}}/>
            <TextField onChange={e => {this.setState({ methods: e.target.value })}}
                hintText="Methods" value={this.state.methods}/>
            <FlatButton label="Search" onClick={() => this.onSubmit()}/>
            </Paper>
                </Col>
                <Col xs={6} md={9} lg={9}>
                     <PatternList pattern={this.state.response} showDetail={this.showDetail.bind(this)}/>
                </Col>
            </Row>

            <Row>
            <Col xs={12} md={12} lg={12}>
                <Card style={{height:'40vw',marginTop:10}}>
                    <CardText style={{height:'40vw', overflow:'auto'}}
                    >
                        {patternDetail}
                    </CardText>
                </Card>
            </Col>
            </Row>
            </Grid>
        </div>
    }
}

export default Connector;