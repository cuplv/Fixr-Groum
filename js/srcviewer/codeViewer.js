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
  }
}

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

<CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>User/Repo: {this.props.srcTextObj.user}/{this.props.srcTextObj.repo}</span>
</CardText>
<CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>Commit id: {this.props.srcTextObj.commitId}</span>
</CardText>
<CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>Method: {this.props.srcTextObj.className}.{this.props.srcTextObj.methodName}</span>
</CardText>


  <SyntaxHighlighter
    showLineNumbers={true}
    wrapLines={true}
    style={github}
    lineProps={ (lineNumber) => {
      if (this.props.srcTextObj.srcAdded.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#dbffdb'}};
      } else if (this.props.srcTextObj.srcRemoved.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#ffecec'}};
      } else if (this.props.srcTextObj.srcMatched.indexOf(lineNumber) > -1) {
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
