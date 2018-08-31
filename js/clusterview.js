import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';

import {Card, CardText} from 'material-ui/Card';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {github, idea } from 'react-syntax-highlighter/styles/hljs';

const styles = {
  cardStyle : {
    flex : 1,
    textAlign : 'center',
    margin : 'auto',
    width : '97%',
    height : '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow : 'auto',
  },
  cardTextStyle : {
    flex : 1,
    textAlign : 'left',
    margin : 'auto',
    width : '97%',
    height : '100%',
    maxHeight: '100%',
    maxWidth: '100%'
  }
}

// properties methodNames: array of method names
class ClusterViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("Cluster with method names " + this.props.methodNames);

    var names = ""

    if (null != this.props.methodNames) {
      var names = "";
      for (var i = 0; i < this.props.methodNames.length; i++) {
        if (i > 0)
          names +=", ";
        var methodName = this.props.methodNames[i].replace(".<init>", "()");

        names += methodName;
      }
    }
    return (<Card style={styles.cardStyle}>
              <CardText style={styles.cardTextStyle}>
              {names}
              </CardText>
            </Card>
           );
  }
}

export default ClusterViewer;
