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
    console.log("Rendering selector...");

    var my_selections = [];
    if (this.props.repos != null) {
      for (var i = 0; i < this.props.repos.length; i++) {
        var repo = this.props.repos[i];
        my_selections.push(<MenuItem key={repo.repoId} value={repo.repoName} primaryText={repo.repoName}/>);
      }
    }

    console.log("Rendering " + my_selections.length + " elements...");

    if (my_selections.length == 0) {
      return (
          <SelectField value={this.props.shownRepo} floatingLabelText="Repo"
        onChange={this.props.repoChange}
        >
      </SelectField>);
    } else {
      return (
          <SelectField value={this.props.shownRepo} floatingLabelText="Repo"
        onChange={this.props.repoChange}
        >
          {my_selections}
      </SelectField>);
    }
  }
}

export default AppSelector;
