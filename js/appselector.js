import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AppSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoName : "",
    }
  }

  render() {
    var my_selections = [];
    if (this.props.repos != null) {
      for (var i = 0; i < this.props.repos.length; i++) {
        var repo = this.props.repos[i];

        if (repo.hasOwnProperty("repoId")) {
          my_selections.push(<MenuItem key={repo.repoId} value={repo.repoName} primaryText={repo.repoName}/>);
        } else {
          my_selections.push(<MenuItem key={repo.groumId} value={repo.methodName} primaryText={repo.methodName}/>);
        }
      }
    }

    console.log("Rendering " + my_selections.length + " elements...");

    if (my_selections.length == 0) {
      return (
          <SelectField value={this.props.shownRepo} floatingLabelText={this.props.label}
          onChange={this.props.repoChange} style={{width : "95%"}}
        >
      </SelectField>);
    } else {
      return (
          <SelectField value={this.props.shownRepo} floatingLabelText={this.props.label}
        onChange={this.props.repoChange}
        style={{width : "95%"}}
        >
          {my_selections}
      </SelectField>);
    }
  }
}

export default AppSelector;
