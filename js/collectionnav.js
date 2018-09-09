import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';

import {CardText} from 'material-ui/Card';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';


import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';

import CodeViewer from './srcviewer/codeViewer.js';

const styles = {
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width : '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  mystyle : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight : '100%',
    textAlign: 'middle',
    width: '100%',
    height: '100%',
  },
  textStyle : {
    height: '100%',
    paddingTop : 5,
    paddingBottom : 0,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight : '100%',
    textAlign: 'middle',
    width: '100%',
  },
}


// data:
//   collection
//   index
// callbacks
//   onPrevious
//   onNext
class CollectionNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering collection nav...")

    var disabledPrev = false;
    var disabledNext = false;

    if (null == this.props.collection) {
      console.log("No alternatives to show (null)...")
      disabledPrev = true;
    } else if (this.props.collection.length == 0 ||
               this.props.index == 0) {
      console.log("No alternatives to show...")
      disabledPrev = true;
    } else {
      console.log("Creating previous...")
      disabledPrev = false;
    }


    if (null == this.props.collection) {
      console.log("No alternatives to show (null)...")
      disabledNext = true;
    } else if (this.props.collection.length == 0 ||
              (this.props.collection.length == (this.props.index + 1))) {
      console.log("No alternatives to show...")
      disabledNext = true;
    } else {
      console.log("Creating next...")
      disabledNext = false;

    }

    var range = "";
    if (null != this.props.collection) {
      range = "" + (this.props.index+1) + "/" + this.props.collection.length;
    } else {
      var tot = 0;
      if (null != this.props.collection) {
          tot = this.props.collection.length;
      }

      range = "0/" + tot;
    }

    return <div style={styles.rightContainer}>
<Grid fluid>
  <Row>
      <Col xs={4} md={4} lg={4} style={{marginLeft:'auto',marginRight:'auto'}}>
      <IconButton tooltip="Previous"
       disabled={disabledPrev}
       onClick={this.props.onPrevious}
       style={{height:'100%', padding: 0}} iconStyle={{height : '100%'}}>
      <AvSkipPrevious />
      </IconButton>
      </Col>
      <Col xs={4} md={4} lg={4} style={{marginLeft:'auto',marginRight:'auto'}}>
      <CardText style={styles.textStyle}>
      {range}
      </CardText>
      </Col>
      <Col xs={4} md={4} lg={4} style={{marginLeft:'auto',marginRight:'auto'}}>
        <IconButton tooltip="Next" onClick={this.props.onNext} disabled={disabledNext} style={{height:'100%', padding: 0}} iconStyle={{height : '100%'}}>
        <AvSkipNext />
        </IconButton>
      </Col>
  </Row>
</Grid>
</div>
  }
}

export default CollectionNav;
