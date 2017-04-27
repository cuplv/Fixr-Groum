/**
 * Created by yue on 4/24/17.
 */
import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import Graph from 'react-graph-vis';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Subheader from 'material-ui/Subheader';

import JimpleCode from './jimpleCode.js';

const config = {
    options:{
        autoResize: true,
        height: '100%',
        width: '90%',
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
        return <Card>
               <CardHeader
                   title={'Github: '+data.github_url_sni}
                   titleStyle={{fontSize:15,}}
                   textStyle={{paddingRight:0}}
               />
            <CardText>
                <Grid>
                    <Row>
                        <Col xs={12} md={12} lg={6}>
                        <Graph graph={graph} options={config.options} events={config.events}/>
                        </Col>
                        <Col xs={12} md={12} lg={6} style={{padding:2,height:'40vw',overflowY:'auto',overflowX:'hidden',}}>
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