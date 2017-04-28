import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';


const style = {
    subheader:{
        lineHeight:'30px',
        color:'#000'
    }
};

class GroumList extends React.Component{

    render(){
        var item = this.props.item;
        return <Paper>
            <Subheader style={style.subheader}>{'User: '+item.user}</Subheader>
            <Subheader style={style.subheader}>{'Repo: '+item.repo}</Subheader>
            <Subheader style={style.subheader}>{'Class: '+item.class}</Subheader>
            <Subheader style={style.subheader}>{'Method: '+item.method}</Subheader>
            </Paper>;
    }
}

export default GroumList;