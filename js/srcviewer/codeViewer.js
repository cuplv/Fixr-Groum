/**
 * Component that visualize source code
 *
 */

import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';

import {CardText} from 'material-ui/Card';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {github, idea } from 'react-syntax-highlighter/styles/hljs';

const styles = {
  codestyle : {
    flex: 1,
    textAlign : 'left',
    margin : "auto",
    width : '100%',
    height : '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'auto',
  }
}
//    overflow: 'auto',
class CodeViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.srcTextObj == null ||
        this.props.srcTextObj.srcText == null) {
      return <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>No source code</span>
</CardText>
    } else {

      console.log(`Updating with ${this.props.srcTextObj.srcText}`)


      return <div style={styles.codestyle}>

<CardText style={{width:'100%', padding:5,overflow:'auto'}}>
<span>{this.props.srcRepo.repoName}</span>
</CardText>
<CardText style={{width:'100%', padding:5,overflow:'auto'}}>
<span>{this.props.srcGroum.methodName}</span>
</CardText>

  <SyntaxHighlighter
    showLineNumbers={true}
    wrapLines={true}
    style={github}
    lineProps={ (lineNumber) => {
      if (null != this.props.srcIso &&
          this.props.srcIso.srcAdded.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#dbffdb'}};
      } else if (null != this.props.srcIso &&
                 this.props.srcIso.srcRemoved.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#ffecec'}};
      } else if (null != this.props.srcIso &&
                 this.props.srcIso.srcMatched.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#f4ce42'}};
      } else {
        return {}
      }
    }}
  >{this.props.srcTextObj.srcText}</SyntaxHighlighter>
</div>
    }
  }
}

export default CodeViewer;
