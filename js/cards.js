import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
      selectedInd : null
    }
  }

  handleChange(patternContainer, selectedInd){
    /* Propagate the change "up"*/
    this.props.showDetail(patternContainer,
                         selectedInd);

    /* Update local state */
    this.setState({
      selectedInd: selectedInd
    })
  };

  render(){
    console.log("Rendering card...");
    var patternObjs = null;
    if (null != this.props.pattern) {
      console.log("Card has content...");

      patternObjs = this.props.pattern.patterns.map(function(pattern_container,
                                                             index) {
        var is_selected = this.state.selectedInd == index;
        var color = '#fff';

        if(is_selected){
          color = '#e1f5fe';
        }
        else{
          color = '#fff';
        }

        var patternType =
            pattern_container.pattern.type_sni.charAt(0).toUpperCase() +
            pattern_container.pattern.type_sni.slice(1);
        var frequency = pattern_container.pattern.frequency_sni;

        console.log("Rendering card content...");

        return <Card style={{
  backgroundColor:color,
  height:'100%',
  width:110,
  marginRight: 10,
  marginBottom:5,
  display:'inline-block',}} key={index}>

  <CardHeader
   title={`${patternType} Pattern`}
   subtitle={`Frequency: ${frequency}`}
   style={style.cardHeader}
   titleStyle={{fontSize:10,}}
   subtitleStyle={{fontSize:10,}}
   textStyle={{paddingRight:0}}
  />

   <CardActions style={{padding:2}}>
    <FlatButton label="Detail" style={{minWidth:8, height:35}}
     labelStyle={{fontSize:12}} onClick={() => this.handleChange(pattern_container, index)}/>
  </CardActions>

</Card>;
      },this)
    } else {
      console.log("Card has *NO* content...");
      patternObjs = <span>No results to display</span>;
    }

    return <div style={style.cards}>{patternObjs}</div>;
  }
}

export default Cards;
