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

class PatternList extends React.Component{

    render(){
        var pattern_item = <Cards pattern={this.props.pattern} showDetail={this.props.showDetail.bind(this)}
            />;

        return <Paper style={style.paperstyle} zDepth={1}>
                {pattern_item}
            </Paper>
    }
}

export default PatternList;