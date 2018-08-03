import React from 'react';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import Cards from './cards.js';

const style = {
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

/** Renders a list of patterns
 *  Wrapper the cards component.
 */
class PatternList extends React.Component{

  render() {
    if (null == this.props.pattern) {
      console.log("Pattern list does not have any content...");
      return <Paper style={style.paperstyle} zDepth={1}/>
    } else {

      console.log("Rendering pattern list...");

      var innerElement =
          <Cards pattern={this.props.pattern} showDetail={this.props.showDetail.bind(this)}/>;

      return <Paper style={style.paperstyle} zDepth={1}>
             {innerElement}
             </Paper>
    }
  }
}

export default PatternList;
