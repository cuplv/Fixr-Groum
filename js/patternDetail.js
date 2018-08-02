import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import GroumList from './groumList.js';
import IconButton from 'material-ui/IconButton';

const config = {
    /*
    options:{
        autoResize: true,
        height: $(window).height()*0.9.toString(),
        width:  $(window).width()*0.45.toString(),
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
    */
    tabs:{
        color:'#757575',
        backgroundColor:'#fff'
    }
}

class PatternDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            left:6,
            right:6,
            open:true,
            hidden:'inline'
        }
    }

    handleClick(){
        if(this.state.open){
            this.setState({
            left:12,
            right:0,
            open:false,
                hidden:'none'
            })
        }else{
            this.setState({
            left:6,
            right:6,
            open:true,
                hidden:'inline'
            })
        }

    }

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
        //console.log('selected',this.props.pattern);
        var graph = this.props.pattern.pattern.groum_dot_sni;
        var patternImg = Viz(graph, { format: "svg", engine:'dot' });
        var isoImg = Viz(this.props.pattern.iso_dot, {format:"svg", engine:"dot"});
        var svg_width = $(window).width()*0.45;
        var svg_height = $(window).height()*0.8;
        console.log('size',svg_height.toString(), svg_width.toString());

        return <Row style={{padding:0,position:'relative'}}>
            <Col xs={12} md={12} lg={this.state.left} >
                <IconButton iconClassName="fa fa-search-plus fa-lg" onClick={this.handleClick.bind(this)} style={{position:'absolute',zIndex:100, top:0, right:0,}}/>
                <Tabs>
                    <Tab label="Isomorphism" style={config.tabs}>
                          <div dangerouslySetInnerHTML={{__html: isoImg}} style={{height:svg_height.toString()}} id="iso"></div>
                    </Tab>
                    <Tab label="Pattern" style={config.tabs}>
                      <div dangerouslySetInnerHTML={{__html: patternImg}} style={{height:svg_height.toString()}}></div>
                    </Tab>
                </Tabs>
            </Col>
            <Col xs={12} md={12} lg={this.state.right} style={{display:this.state.hidden}}>
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
                        nestedListStyle={{maxHeight:$(window).height()*0.7.toString(),overflowX:'auto',overflowY:'scroll',}}
                    />
                </List>
            </Col>
            </Row>
    }
}

export default PatternDetail;
