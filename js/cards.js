import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Graph from 'react-graph-vis';

const style = {
    cards:{
        height:'100%',
        width:110,
        marginRight: 10,
        marginBottom:5,
        display:'inline-block',
    },
    cardHeader:{
        fontSize:'0.3vw',
        height:90,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowY:'auto',
        overflowX:'hidden',
        padding:5
    },
};

class Cards extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedInd:null
        }
    }

    handleChange(index, selectedInd){
        console.log('handleChange')
        this.props.showDetail(index);
        this.setState({
            selectedInd: selectedInd
        })
    };


    render(){

        var PatternObjs;
        if(this.props.pattern!=""){
            PatternObjs = this.props.pattern.patterns.map(function(s,i) {
                var is_selected = this.state.selectedInd == i;
                var color = '#fff';
                if(is_selected){
                    color = '#e1f5fe';
                    console.log('hit')
                }
                else{
                    color = '#fff'
                }
                return <Card style={{
                    backgroundColor:color,
                    height:'100%',
                    width:110,
                    marginRight: 10,
                    marginBottom:5,
                    display:'inline-block',}} key={i}>
                    <CardHeader
                        title={s.pattern.type_sni.charAt(0).toUpperCase() + s.pattern.type_sni.slice(1)+" Pattern"}
                        subtitle={"Frequency: "+s.pattern.frequency_sni}
                        style={style.cardHeader}
                        titleStyle={{fontSize:10,}}
                        subtitleStyle={{fontSize:10,}}
                        textStyle={{paddingRight:0}}
                    />
                    <CardActions style={{padding:2}}>
                        <FlatButton label="Detail" style={{minWidth:8, height:35}} labelStyle={{fontSize:12}} onClick={() => this.handleChange(s,i)}/>
                    </CardActions>
                </Card>;
            },this)
        }else{
            PatternObjs = null;
        }



        return <div style={style.cards}>{PatternObjs}
        </div>;
    }
}

export default Cards;