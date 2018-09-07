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
    textAlign : 'left',
    width : '100%',
    maxHeight: '100%',
    height : '100%',
    overflow : 'auto',
  },

  row : {
    height: "10px", padding: "0px", textAlign : 'center'
  },

  row_match : {height: "10px", padding: "0px", textAlign : 'center', backgroundColor:'#C4FDBA',},
  row_anomalous : {height: "11px", padding: "0px", textAlign : 'center', backgroundColor:'#FFF8BE'},
}

// properties patternResult, mappingIndex, patternIndex, onCellClick,
// onPrevious, onNext
class PatternViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    var rows = [];
    if (null != this.props.patternResult) {
      var rows = [];
      for (var i = 0; i < this.props.patternResult.length; i++) {
        var patternResult = this.props.patternResult[i];
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

        var row = (<TableRow style={myStyle}>
                   <TableRowColumn style={myStyle}>
                     {patternResult.pattern.frequency}
                   </TableRowColumn>
                   <TableRowColumn style={myStyle}>
                     {editSequence}
                   </TableRowColumn>
                   <TableRowColumn style={myStyle}>
                     <CollectionNav
                      collection={this.props.patternIndex == i ? patternResult.pattern.mappings : null}
                      index = {this.props.mappingIndex}
                      onPrevious = {this.props.onPrevious}
                      onNext = {this.props.onNext}
                   />
                   </TableRowColumn>
                  </TableRow>);

          rows.push(row);
      }
    }

    return (<div style={styles.tablestyle}>
  <Table wrapperStyle={{ maxHeight: '95%' }}
   onCellClick={this.props.onCellClick}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={styles.row}>
        <TableHeaderColumn style={styles.row}>Popularity</TableHeaderColumn>
        <TableHeaderColumn style={styles.row}>Edit Distance</TableHeaderColumn>
        <TableHeaderColumn style={styles.row}>Navigate Examples</TableHeaderColumn>
      </TableRow>
    </TableHeader>
   <TableBody displayRowCheckbox={false}>
     {rows}
   </TableBody>
  </Table>
      </div>);
  }
}

export default PatternViewer;
