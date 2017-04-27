import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Graph from 'react-graph-vis';
import GroumList from './groumList.js';

class PatternDetail extends React.Component{

    render(){
        console.log('selected',this.props.pattern);
        var options = {
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
            },
            processProperties: function (clusterOptions,
              childNodes, childEdges) {
            var totalMass = 0;
            var totalValue = 0;
            for (var i = 0; i < childNodes.length; i++) {
              totalMass += childNodes[i].mass;
              totalValue = childNodes[i].value
                ? totalValue + childNodes[i].value
                : totalValue;
            }
            clusterOptions.mass = totalMass;
            if (totalValue > 0) {
              clusterOptions.value = totalValue;
            }
            return clusterOptions;
          },
        };

        var events = {
            select: function(event) {
            },
        }

        var graph = this.props.pattern.pattern.groum_dot_sni;

        return <div>
            <Row>
            <Col xs={12} md={12} lg={6}>
                <Graph graph={graph} options={options} events={events} />
            </Col>
            <Col xs={12} md={12} lg={6}>
                <Subheader>Pattern Info</Subheader>
                <List>
                    <ListItem
                        key={1}
                        primaryText={
                            "Frequency: "+this.props.pattern.pattern.frequency_sni
                        }
                    />
                    <ListItem
                        key={2}
                        primaryText={
                            "List of matching groums: "
                        }
                        nestedItems={[
                            this.props.pattern.pattern.groum_key_info.map(function(s,i) {
                                return <ListItem
                                        key={i}
                                        primaryText={
                                            <GroumList item={s}/>
                                        }
                                        />
                            })
                        ]}
                        initiallyOpen={true}
                        nestedListStyle={{height:'25vw',overflowX:'auto',overflowY:'scroll',}}
                    />
                </List>
            </Col>
            </Row>
        </div>
    }
}

export default PatternDetail;