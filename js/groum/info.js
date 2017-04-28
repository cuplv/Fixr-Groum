/**
 * Created by yue on 4/24/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Graph from 'react-graph-vis';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';

import JimpleCode from './jimpleCode.js';


const config = {
    options:{
        autoResize: true,
        height: $(window).height()*0.9,
        width:  $(window).width()*0.45,
        clickToUse: false,
        layout: {
            improvedLayout:true,
            hierarchical: {
                enabled:true,
                levelSeparation: 95,
                nodeSpacing: 170,
                treeSpacing: 200,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'hubsize'   // hubsize, directed
            }
        },
        edges: {
            color: "#000000"
        },
        nodes: {
            size: 10,
        },
        interaction:{
            zoomView: true,
        }
    },
    events:{
        select: function(event) {},
    }
}

class Info extends React.Component{
    render(){
        var graph = this.props.data.groum_dot_sni.replace(/\\"/g, '');
        var data = this.props.data;
        var height = $(window).height()
        return <Card style={{height:height}}>
            <CardText style={{height:'100%'}}>
                <Grid>
                    <Row>
                        <Col xs={12} md={12} lg={6}>
                        <Graph graph={graph} options={config.options} events={config.events}/>
                        </Col>
                        <Col xs={12} md={12} lg={6} style={{padding:2,height:height*0.9,overflowY:'auto',overflowX:'hidden',}}>
                            <FlatButton
                               label="GitHub"
                               href={data.github_url_sni}
                               target="_blank"
                               default={true}
                               icon={<FontIcon className="fa fa-github fa-lg" />}
                           />
                            <Subheader>{data.filename_t[0]}</Subheader>
                            <JimpleCode code={data.jimple_sni}/>
                        </Col>
                    </Row>
                </Grid>
            </CardText>
        </Card>;
    }
}

export default Info;