import React from 'react';
import CollectionNav from './collectionnav.js';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


const styles = {
  tablestyle : {
    margin : 'auto',
    align : "center",
    textAlign : 'center',
    width : '80%',
    maxHeight: '100%',
    height : '100%'
  },
  table : {
    maxHeight: '100%',
  },
  row : {
    height: "20px", padding: "5px", textAlign : 'center'
  },

  row_match : {height: "20px", padding: "5px", backgroundColor:'#C4FDBA',},
  row_anomalous : {height: "20px", padding: "5px", backgroundColor:'#FFF8BE'},
}

// properties patternResult
// this.props.index
// onCellClick
class PatternViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    if (null == this.props.patternResult) {
      return null;
    } else {

      var rows = [];
      for (var i = 0; i < this.props.patternResult.length; i++) {
        var patternResult = this.props.patternResult[i];
        console.dir(patternResult);
        var mapping = patternResult.pattern.mappings[0];

        var editSequence = mapping.node_isos.srcAdded.length +
            mapping.node_isos.srcRemoved.length;

        var myStyle = null;
        if (patternResult.type == "CORRECT" ||
            patternResult.type == "CORRECT_SUBSUMING") {
          var myStyle = styles.row_match
        } else {
          var myStyle = styles.row_anomalous
        }
                                // onNext = {}
                                // onPrevious = {} /
        var row = (<TableRow style={myStyle}>
                   <TableRowColumn style={myStyle}>{patternResult.pattern.frequency}</TableRowColumn>
                   <TableRowColumn style={myStyle}>{editSequence}</TableRowColumn>
                   <TableRowColumn style={myStyle}>{patternResult.pattern.mappings.length}</TableRowColumn>
                   <TableRowColumn style={myStyle}>
                     <CollectionNav collection={patternResult.pattern.mappings}
                                index = {this.props.index}
                   />
                   </TableRowColumn>
                  </TableRow>);

          rows.push(row);
      }

      return (<div style={styles.tablestyle}>
  <Table wrapperStyle={{ maxHeight: '95%' }}
   onCellClick={this.props.onCellClick}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={styles.row}>
        <TableHeaderColumn style={styles.row}>Popularity</TableHeaderColumn>
        <TableHeaderColumn style={styles.row}>Edit Distance</TableHeaderColumn>
        <TableHeaderColumn style={styles.row}>Examples</TableHeaderColumn>
        <TableHeaderColumn style={styles.row}></TableHeaderColumn>
      </TableRow>
    </TableHeader>
   <TableBody displayRowCheckbox={false}>
     {rows}
   </TableBody>
  </Table>
      </div>);
    }
  }
}

export default PatternViewer;
