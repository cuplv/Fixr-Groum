import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';

import {CardText} from 'material-ui/Card';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {github, idea } from 'react-syntax-highlighter/styles/hljs';

const styles = {
  codestyle : {
    flex: 1,
    textAlign : 'left',
    width : '100%',
    height : 30
  }
}

// properties methodNames: array of method names
class ClusterViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("Cluster with method names " + this.props.methodNames);

    if (null == this.props.methodNames) {
      return null;
    } else {

      var names = "";
      for (var i = 0; i < this.props.methodNames.length; i++) {
        if (i > 0)
          names +="\n";
        names += this.props.methodNames[i];
      }

      return (<div style={styles.codestyle}>
        <SyntaxHighlighter showLineNumbers={false}
         wrapLines={false}>{names}</SyntaxHighlighter>
      </div>);
    }
  }
}

export default ClusterViewer;
