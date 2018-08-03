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

class CodeNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering code collection...")

    var prev_button = null;
    if (null == this.props.groumKeyList) {
      console.log("No alternatives to show (null)...")
      prev_button = ""
    } else if (this.props.groumKeyList.length == 0 ||
               this.props.currentIndex == 0) {
      console.log("No alternatives to show...")
      prev_button = ""
    } else {
      console.log("Showing previous and next...")
      prev_button = <FlatButton label="Previous"/>
    }

    var next_button = null;
    if (null == this.props.groumKeyList) {
      console.log("No alternatives to show (null)...")
      next_button = ""
    } else if (this.props.groumKeyList.length == 0 ||
               (this.props.currentIndex == this.props.currentIndex + 1)) {
      console.log("No alternatives to show...")
      next_button = ""
    } else {
      console.log("Showing next and next...")
      next_button = <FlatButton label="Next"/>
    }

    return <div>
<Grid fluid>
  <Row style={styles.rightContainer}>
    {prev_button}
    {next_button}
  </Row>
</Grid>
</div>
  }
}

export default CodeNavigator;
