/**
 * Created by yue on 4/24/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';

import JimpleCode from './jimpleCode.js';


class Info extends React.Component{
  render(){
    var graph = this.props.data.groum_dot_sni.replace(/\\"/g, '');
    var data = this.props.data;
    var height = $(window).height()
    var img = Viz(graph, {format:"svg", engine:"dot"});
    return <Grid><Row>
      <Col xs={12} md={12} lg={12}>
      <Card style={{height:height}}>
      <CardText style={{height:'100%'}}>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <div dangerouslySetInnerHTML={{__html: img}}></div>
            </Col>
            <Col xs={12} md={12} lg={6} style={{padding:2,height:height*0.9,overflowY:'auto',overflowX:'hidden',}}>
              <FlatButton
                 label="GitHub"
                 href={data.github_url_sni+'/find/'+data.hash_sni}
                 target="_blank"
                 default={true}
                 icon={<FontIcon className="fa fa-github fa-lg" />}
               />
              <Subheader>{data.filename_t[0]}</Subheader>
              <JimpleCode code={data.jimple_sni}/>
            </Col>
          </Row>

      </CardText>
    </Card></Col></Row></Grid>;
  }
}

export default Info;
