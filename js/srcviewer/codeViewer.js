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

function extend(m1, replace) {
  var newmap = {};
  for (var key in m1) {
      newmap[key] = m1[key];
  }

  for (var key in replace) {
    newmap[key] = replace[key];
  }

  return newmap;
}

class CodeViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ((this.props.srcTextObj == null ||
         this.props.srcTextObj.srcText == null) &&
        this.props.srcError == null) {
      return <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>No source code</span>
</CardText>
    } else {
      if (this.props.srcError != null) {
          var code_highlight = <CardText style={{width:'100%',height:'100%', padding:5,overflow:'auto'}}>
<span>Cannot retrieve the source code from GitHub (e.g., is the method from a library? Is the code not written in Java, like Kotlin or Scala?)</span>
</CardText>;
      } else {
        // offset from the soot line to the spoon line number
        // To go from the srcGroum line (the one returned by the search)
        // to the line in the source code parsed, we have to add
        // base_offset
        // console.log(this.props.srcTextObj.lineNumber);
        // console.log(this.props.srcGroum.methodLine);
        var base_offset = this.props.srcTextObj.lineNumber - this.props.srcGroum.methodLine;
        // final offset: we just show the code from this.props.srcTextObj.lineNumber.
        // we then remove it.
        var offset = base_offset - this.props.srcTextObj.lineNumber + 1;

        var matchedLines = []
        if (null != this.props.matched) {
          for (var i = 0; i < this.props.matched.length; i++) {
            var lineno = this.props.matched[i] + offset;
            matchedLines.push(lineno);
          }
        }

        var addedLines = []
        if (null != this.props.added) {
          for (var i = 0; i < this.props.added.length; i++) {
            var lineno = this.props.added[i] + offset;
            addedLines.push(lineno);
          }
        }

        var removedLines = []
        if (null != this.props.removed) {
          for (var i = 0; i < this.props.removed.length; i++) {
            var lineno = this.props.removed[i] + offset;
            removedLines.push(lineno);
          }
        }



      var code_highlight =   <SyntaxHighlighter
    showLineNumbers={true}
    wrapLines={true}
    language={'java'}
    style={github}

    lineProps={ (lineNumber) => {
      if (null != this.props.matched &&
          matchedLines.indexOf(lineNumber) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#C4FDBA'}};
      } else if (null != this.props.added &&
          removedLines(indexOf(lineNumber)) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#FFF8BE'}};
      } else if (null != this.props.removed &&
          removedLines(indexOf(lineNumber)) > -1) {
        return {style : {display: 'block',
                         cursor: "pointer",
                         backgroundColor : '#FFF8BE'}};
      } else {
        return {};
      }
    }}
  >{this.props.srcTextObj.srcText}</SyntaxHighlighter>;
      }

      return <div style={styles.codestyle}>

<CardText style={{width:'100%', padding:5,overflow:'auto'}}>
<span>{this.props.srcRepo.repoName}</span>
</CardText>
<CardText style={{width:'100%', padding:5,overflow:'auto'}}>
<span>{this.props.srcGroum.methodName}</span>
</CardText>
{code_highlight}
</div>
    }
  }
}

export default CodeViewer;
