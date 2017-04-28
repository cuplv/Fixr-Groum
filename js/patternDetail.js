import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Graph from 'react-graph-vis';
import GroumList from './groumList.js';

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
        },
        processProperties: function (clusterOptions, childNodes, childEdges) {
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
    },
    events:{
        select: function(event) {},
    },
    tabs:{
        color:'#757575',
        backgroundColor:'#fff'
    }
}

class PatternDetail extends React.Component{

    onSelect(req){
        createCookie('test',JSON.stringify(req),7);
        window.open(
              '/groum',
              '_blank'
        );

        function createCookie(name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }
    }

    render(){
        console.log('selected',this.props.pattern);

        var graph = this.props.pattern.pattern.groum_dot_sni;

        return <Row>
            <Col xs={12} md={12} lg={6}>
                <Tabs>
                    <Tab label="Isomorphism" style={config.tabs}>
                    <Graph graph={this.props.pattern.iso_dot} options={config.options} events={config.events} />
                    </Tab>
                    <Tab label="Pattern" style={config.tabs}>
                    <Graph graph={graph} options={config.options} events={config.events} />
                    </Tab>
                </Tabs>
            </Col>
            <Col xs={12} md={12} lg={6}>
                <Subheader>PATTERN INFO</Subheader>
                <List>
                    <ListItem
                        key={1}
                        primaryText={
                            "Frequency: "+this.props.pattern.pattern.frequency_sni
                        }
                        disabled={true}
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
                                        onTouchTap={() => this.onSelect(s)}
                                        />
                            },this)
                        ]}
                        initiallyOpen={true}
                        disabled={true}
                        nestedListStyle={{maxHeight:$(window).height()*0.7,overflowX:'auto',overflowY:'scroll',}}
                    />
                </List>
            </Col>
            </Row>
    }
}

export default PatternDetail;