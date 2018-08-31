import React from 'react';

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
    textAlign : 'left',
    width : '100%',
    maxHeight: '100%',
    height : '100%'
  },
  table : {
    maxHeight: '100%',
  },
}

// properties patternResult
// this.props.onCellClick
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
        var row = (<TableRow style={styles.row}>
                   <TableRowColumn>{patternResult.type}</TableRowColumn>
                   <TableRowColumn>{patternResult.pattern.frequency}</TableRowColumn>
                   <TableRowColumn>{patternResult.pattern.mappings.length}</TableRowColumn>
                  </TableRow>);

          rows.push(row);
      }

      return (<div style={styles.tablestyle}>
  <Table wrapperStyle={{ maxHeight: '100%' }}
   onCellClick={this.props.onCellClick}
  >
    <TableHeader>
      <TableRow style={styles.row}>
        <TableHeaderColumn>Type</TableHeaderColumn>
        <TableHeaderColumn>Popularity</TableHeaderColumn>
        <TableHeaderColumn>Examples</TableHeaderColumn>
      </TableRow>
    </TableHeader>
   <TableBody>
     {rows}
   </TableBody>
  </Table>
      </div>);
    }
  }
}

export default PatternViewer;
