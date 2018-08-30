import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';

import CodeViewer from './srcviewer/codeViewer.js';

const styles = {
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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

    var prev_button = null;
    if (null == this.props.collection) {
      console.log("No alternatives to show (null)...")
      prev_button = ""
    } else if (this.props.collection.length == 0 ||
               this.props.index == 0) {
      console.log("No alternatives to show...")
      prev_button = ""
    } else {
      console.log("Creating previous...")
      prev_button = <FlatButton label="Previous"
                     onClick={this.props.onPrevious}/>
    }

    var next_button = null;
    if (null == this.props.collection) {
      console.log("No alternatives to show (null)...")
      next_button = ""
    } else if (this.props.collection.length == 0 ||
              (this.props.collection.length == (this.props.index + 1))) {
      console.log("No alternatives to show...")
      next_button = ""
    } else {
      console.log("Creating next...")
      next_button = <FlatButton label="Next"
                     onClick={this.props.onNext}/>
    }

    var range = null;
    if (null != this.props.collection) {
      range = "" + (this.props.index+1) + "/" + this.props.collection.length;
    } else {
      range = "";
    }

    return <div>
<Grid fluid>
  <Row style={styles.rightContainer}>
    {prev_button}
    {range}
    {next_button}
  </Row>
</Grid>
</div>
  }
}

export default CollectionNav;
