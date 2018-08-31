import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import AppSelector from './appselector.js'
import CodeViewer from './srcviewer/codeViewer.js';
import ClusterViewer from './clusterview.js';
import CollectionNav from './collectionnav.js';
import PatternViewer from './patternview.js';

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

const style = {

  grid : {
    flexGrow: 1,
    height: '100%',
    width : '100%',
    align:'center',
    paddingLeft : 0,
    paddingRight : 0,
    flex : 1
  },

  row : {
    paddingTop: 10,
    paddingBottom:10,
    paddingLeft : 0,
    paddingRight : 0,
    width : '100%',
    flex : 1
  },

  col : {
    flex : 1,
    marginLeft:'auto',
    marginRight:'auto',
    height:'100%',
    width : '100%',
  },

  appselector : {
    width : '98%',
    flex : 1,
    margin : 'auto',
    align : "center"
  },

  paper : {
    height: '100%',
    flex : 1,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',

  },

  topsearchstyle : {
    height: 300,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  halftopsearchstyle : {
    height: 100,
    maxHeight: '100%',
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  halfbottomsearchstyle : {
    height: 150,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  bottomsearchstyle : {
    width: '100%',
    flex : 1,
    display : 'flex',
    textAlign: 'center',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
};

class Connector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos : [],
      selectedRepo : null,
      shownRepo : null,

      groums : [],
      selectedGroum : null,
      shownGroum : null,

      querySrcData : null,
      querySrcError : null,

      clusterResults : null,
      clusterIndex : null,
      patternIndex : null,
      mappingIndex : null,

      mappingSrcData : null,
      mappingSrcError : null,
    };

    this.load_repos();

    this.onChangeApp = (event, index, value) => {
      this.setState( {selectedRepo : index, shownRepo : value} );
      this.load_groums(this.state.repos[index].repoId);
    }

    this.onSearch = () => {
      if (null != this.state.selectedGroum)
        this.search((this.state.groums[this.state.selectedGroum]).groumId)
    }

    this.setQueryCode = (reply) => {
      if (reply["errorDesc"] != "") {
        // $().dpToast(reply["errorDesc"], 4000);
        console.log(reply["errorDesc"]);
        this.setState( {querySrcError : reply["errorDesc"],
                        querySrcData : null} );
      } else {
        var res_array = reply["res"]
        if (res_array.length > 1) {
          var res_line = res_array[0][0];
          var code_array = res_array[1];

          if (code_array.length > 0) {
            console.log("Setting source code");
            console.log(code_array[0]);
            this.setState( {querySrcError : null,
                            querySrcData : new SrcData(code_array[0], res_line)} );
          }
        }
      }
    }

    this.setMappingCode = (reply) => {
      if (reply["errorDesc"] != "") {
        // $().dpToast(reply["errorDesc"], 4000);
        console.log(reply["errorDesc"]);
        this.setState( {mappingSrcError : reply["errorDesc"],
                        mappingSrcData : null} );
      } else {
        var res_array = reply["res"]
        if (res_array.length > 1) {
          var res_line = res_array[0][0];
          var code_array = res_array[1];

          if (code_array.length > 0) {
            console.log("Setting source code");
            console.log(code_array[0]);
            this.setState( {mappingSrcError : null,
                            mappingSrcData : new SrcData(code_array[0], res_line)} );
          }
        }
      }
    }


    this.onChangeGroum = (event, index, value) => {
      this.setState( {selectedGroum : index, shownGroum : value} );

      var currentRepo = this.state.repos[this.state.selectedRepo]
      var currentGroum = this.state.groums[index]

      this.load_source_code(currentRepo.user, currentRepo.repo,
                            currentRepo.commitId,
                            currentGroum.fileName, currentGroum.simpleMethodName,
                            currentGroum.methodLine,
                            this.setQueryCode.bind(this));
    }

    this.updateClusterIndex = (incCluster) => {
      console.log("Updating cluster index...");

      if(this.state.clusterResults != null && this.state.clusterIndex != null) {
        var newClusterIndex = this.state.clusterIndex + incCluster;


        if (newClusterIndex >= 0 &&
            newClusterIndex < this.state.clusterResults.length) {
          console.log("Updating cluster index to " + newClusterIndex);
          var newPatternIndex = null;
          var newMappingIndex = null;

          var patternList = this.state.clusterResults[newClusterIndex].patternResults;

          if (patternList.length > 0) {
            newPatternIndex = 0;
            if (patternList[newPatternIndex].pattern.mappings.length > 0) {
              newMappingIndex = 0;
              this.load_source_code_mapping(patternList[newPatternIndex].pattern.mappings[newMappingIndex]);
            }
          }

          this.setState( {clusterIndex : newClusterIndex,
                          patternIndex : newPatternIndex,
                          mappingIndex : newMappingIndex} );
        }
      }
    };
    this.onClusterPrev = () => {this.updateClusterIndex(-1);};
    this.onClusterNext = () => {this.updateClusterIndex(1);};

    this.updatePatternIndex = (inc) => {
      console.log("Updating pattern index...");

      if(this.state.clusterResults != null &&
         this.state.clusterIndex != null &&
         this.state.patternIndex != null) {
        var patternList = this.state.clusterResults[this.state.clusterIndex].patternResults;

        var newPatternIndex = this.state.patternIndex + inc;
        console.log("Updating pattern index to " + newPatternIndex);

        if (newPatternIndex >= 0 && newPatternIndex < patternList.length) {
          var newMappingIndex = null;
          if (patternList[newPatternIndex].pattern.mappings.length > 0) {
            newMappingIndex = 0
            this.load_source_code_mapping(patternList[newPatternIndex].pattern.mappings[newMappingIndex]);
          }

          this.setState( {patternIndex : newPatternIndex,
                          mappingIndex : newMappingIndex} );
        }
      }
    };
    this.onPatternPrev = () => {this.updatePatternIndex(-1);};
    this.onPatternNext = () => {this.updatePatternIndex(1);};

    this.updateMappingIndex = (inc) => {
      console.log("Updating mapping index...");

      if(this.state.clusterResults != null &&
         this.state.clusterIndex != null &&
         this.state.patternIndex != null &&
         this.state.mappingIndex != null) {
        var patternList = this.state.clusterResults[this.state.clusterIndex].patternResults;
        var mappingList = patternList[this.state.patternIndex].pattern.mappings

        var newMappingIndex = this.state.mappingIndex + inc;
        console.log("Updating mapping index to " + newMappingIndex);

        if (newMappingIndex >= 0 && newMappingIndex < mappingList.length) {
          this.load_source_code_mapping(patternList[this.state.patternIndex].pattern.mappings[newMappingIndex]);
          this.setState( {mappingIndex : newMappingIndex} );
        }
      }
    };
    this.onMappingPrev = () => {this.updateMappingIndex(-1);};
    this.onMappingNext = () => {this.updateMappingIndex(1);};

    this.hasMapping = () => {
      return this.state.clusterResults != null &&
        this.state.clusterIndex != null &&
        this.state.patternIndex != null &&
        this.state.mappingIndex != null;
    }

    this.getMapping = () => {
      var patternList = this.state.clusterResults[this.state.clusterIndex].patternResults;
      var mappingList = patternList[this.state.patternIndex].pattern.mappings;
      return mappingList[this.state.mappingIndex];
    }

    this.onCellClick = (rowId, colId) => {
      this.updatePatternIndex();
    }

  }


  render() {
    return (
<div style={{paddingTop:10, height:'100%', width:"100%",flex:1}}>
  <Grid fluid style={style.grid}>
    <Row style={extend(style.row, {height : '40%'})}>
      <Col xs={6} md={6} lg={6} style={style.col}>
        <Paper style={style.paper} zDepth={1} rounded={false}>
        <AppSelector
         label={"Repository"}
         repos={this.state.repos}
         shownRepo={this.state.shownRepo}
         repoChange={this.onChangeApp}
         style={style.appSelector}
        />
        <AppSelector
         label={"Method"}
         repos={this.state.groums}
         shownRepo={this.state.shownGroum}
         repoChange={this.onChangeGroum}
         style={style.appSelector}
        />
        <FlatButton label="Search" style={style.appSelector}
         onClick={() => this.onSearch()}/>
        </Paper>
      </Col>
      <Col xs={6} md={6} lg={6} style={style.col}>
        <Paper style={style.paper} zDepth={1} rounded={false}>
        <div style={{flex : 1, width : '100%', height:'10%'}}>
          <div style={{flex : 1, float : 'left', width : '50%', height:'100%'}}>
            <CardText>Methods called in the pattern</CardText>
          </div>
          <div style={{flex : 1, float : 'left', width : '50%', height:'100%'}}>
            <CollectionNav collection={((this.state.clusterResults == null ||
                                         this.state.clusterIndex == null) ? null :
                                        this.state.clusterResults)}
                           index = {((this.state.clusterResults == null ||
                                      this.state.clusterIndex == null) ? null :
                                     this.state.clusterIndex)}
                           onNext = {this.onClusterNext}
                           onPrevious = {this.onClusterPrev} />
          </div>
        </div>
        <div style={{flex : 1, width : '100%', height:'30%', paddingTop:'15px'}}>
          <ClusterViewer
                   methodNames={((this.state.clusterResults == null ||
                                  this.state.clusterIndex == null) ? null :
                                 this.state.clusterResults[this.state.clusterIndex].methodNames) }/>

        </div>
        <div style={{flex : 1, width : '100%', height:'10%', paddingTop:'10px'}}>
        <CardText>List of found patterns</CardText>
        </div>
        <div style={{flex : 1, width : '100%', height:'50%', paddingTop:'15px'}}>
        <PatternViewer
         patternResult={((this.state.clusterResults == null ||
                          this.state.patternIndex == null) ? null :
                         this.state.clusterResults[this.state.clusterIndex].patternResults) }
         patternIndex = {this.state.patternIndex}
         mappingIndex = {this.state.mappingIndex}
         onCellClick = {this.props.onCellClick}/>
        </div>
        </Paper>
      </Col>
    </Row>
    <Row style={extend(style.row, {height : '100%'}) }>
      <Col xs={6} md={6} lg={6} style={style.col}>
        <Paper style={style.paper} zDepth={1} rounded={false}>
        <CodeViewer srcTextObj={this.state.querySrcData}
                    srcRepo={(this.state.repos == null ? null : this.state.repos[this.state.selectedRepo])}
                    srcGroum={(this.state.groums == null ? null : this.state.groums[this.state.selectedGroum])}
                    srcIso={this.hasMapping() ? this.getMapping().nodes_isos : null}
        />
        </Paper>
      </Col>
      <Col xs={6} md={6} lg={6} style={style.col}>
        <Paper style={style.paper} zDepth={1} rounded={false}></Paper>

      </Col>
    </Row>
  </Grid>
</div>
    )
  }


  // Request: load the repos
  load_repos() {
    console.log(`Loading repos...`);

    var reposRequest = $.ajax({
      type: 'get',
      url: window.location.protocol +
        '//' + window.location.host + "/crossdomain",
      data: {url : this.props.config.getAppsUrl}
    });

    reposRequest.fail(function(reply) {
      console.log('Failed loading repos...');
    });

    reposRequest.done(function(reply) {
      console.log('Loaded repos...');

      var repos = [];
      for (var i = 0; i < reply.length; i++) {
        var repoMap = reply[i];
        repos.push(new Repo(repoMap["app_key"],
                            repoMap["user_name"],
                            repoMap["repo_name"],
                            repoMap["commit_hash"],
                            repoMap["url"],
                           ));
      }

      var value = repos.length > 0 ? 0 : null;

      this.setState( {repos : repos,
                      selectedRepo : value} );
    }.bind(this));
  }

  // Request: load groums for repo
  load_groums(repoId) {
    console.log(`Loading groums...`);

    var reposRequest = $.ajax({
      type: 'get',
      url: window.location.protocol +
        '//' + window.location.host + "/get_groums",
      data: {url : this.props.config.getGroumsUrl,
             app_key : repoId}
    });

    reposRequest.fail(function(reply) {
      console.log('Failed loading groums for repo ' + repoId);
    });

    reposRequest.done(function(reply) {
      console.log('Loaded groums...');

      var groums = [];
      for (var i = 0; i < reply.length; i++) {
        var resMap = reply[i];
        groums.push(new GroumSrc(resMap["groum_key"],
                                 resMap["source_class_name"],
                                 resMap["class_name"],
                                 resMap["method_name"],
                                 resMap["method_line_number"]));
      }

      console.log('Loaded ' + groums.length + ' groums...');

      var value = groums.length > 0 ? 0 : null;
      this.setState( {groums : groums,
                      selectedGroum : value} );
    }.bind(this));
  }

  // Request: source code
  load_source_code(user, repo, commitId,
                   classFile, methodName, methodLine,
                   setFunction) {
    console.log(`Loading source code...`);

    var src_query = {
      "githubUrl" : "https://github.com/" + user + "/" + repo,
      "commitId" : commitId,
      "declaringFile" : classFile,
      "methodLine" : methodLine,
      "methodName" : methodName,
      "url" : this.props.config.srcServiceUrl
    };

    console.log('Getting code source ', src_query);

    var srcRequest = $.ajax({
      type: 'get',
      url: window.location.protocol + '//' + window.location.host + "/getsrc",
      data: src_query,
    });

    srcRequest.fail(function(reply){
      console.log('Failed to get source code...');
    }.bind(this));

    srcRequest.done(setFunction);
  }


  load_source_code_mapping(mapping) {
    this.load_source_code(mapping.repo.user,
                          mapping.repo.repo,
                          mapping.repo.commitId,
                          mapping.groumSrc.fileName,
                          mapping.groumSrc.simpleMethodName,
                          mapping.groumSrc.methodLine,
                          this.setMappingCode.bind(this));
  }


  // Request: search
  search(groumKey) {
    console.log(`Searching...`);

    var search_query = {
      "groum_key" : groumKey,
      "url" : this.props.config.searchUrl
    };
    console.log('Getting code source ' +  search_query);

    var srcRequest = $.ajax({
      type: 'get',
      url: window.location.protocol + '//' + window.location.host + "/search",
      data: search_query,
    });

    srcRequest.fail(function(reply){
      console.log('An error occurred searching for patterns!');

      this.setState({clusterResults : null,
                     clusterIndex : null,
                     patternIndex : null,
                     mappingIndex : null,
                    });
    }.bind(this));

    srcRequest.done(function(reply) {
      console.log('Found code...');

      if (reply["status"] != 0) {
        console.log("Error searching patterns!");
      } else {
        var cluster_results = [];

        console.log("Found " + reply["results"].length + " clusters");

        for (var i = 0; i < reply["results"].length; i++) {
          var clusterRes = reply["results"][i];
          var methodNames = [];

          for (var j = 0; j < clusterRes["method_names"].length; j++) {
            methodNames.push(clusterRes["method_names"][j]);
          }

          var patternResults = []
          for (var k = 0; k < clusterRes["search_results"].length; k++) {
            var patternRes = clusterRes["search_results"][k];
            var popularRes = patternRes["popular"];

            var mappings = [];
            for (var l = 0; l < popularRes["acdfg_mappings"].length; l++) {
              var mappingRes = popularRes["acdfg_mappings"][l];

              var add = mappingRes["nodes"]["add"];
              var iso = mappingRes["nodes"]["iso"];
              var remove = mappingRes["nodes"]["remove"];

              var repoTag = mappingRes["repo_tag"];
              var repoId = repoTag["user_name"] + "/" + repoTag["repo_name"] +
                  "/" + repoTag["commit_hash"];

              var sourceInfo = mappingRes["source_info"];
              var methodName = sourceInfo["className"] + "/" +
                  sourceInfo["methodName"];
              var groumId = repoId + "/" + methodName + "/" +
                  sourceInfo["method_line_number"];

              mappings.push(new Mapping(new SrcIso(add, iso, remove),
                                        new Repo(repoId, repoTag["user_name"],
                                                 repoTag["repo_name"],
                                                 repoTag["commit_hash"],
                                                 repoTag["url"]),
                                        new GroumSrc(groumId,
                                                     sourceInfo["source_class_name"],
                                                     sourceInfo["class_name"],
                                                     sourceInfo["method_name"],
                                                     sourceInfo["method_line_number"])));
            } // end loop on mappings

            var pattern = new Pattern(popularRes["type"],
                                      popularRes["frequency"],
                                      mappings);

            patternResults.push(new PatternResult(patternRes["type"], pattern));
          } // end loop on pattern results

          cluster_results.push(new ClusterResults(methodNames, patternResults));
        } // end loop on clusters

        var newClusterIndex = null;
        var newPatternIndex = null;
        var newMappingIndex = null;

        if (cluster_results.length > 0) {
          newClusterIndex = 0;
          if (cluster_results[0].patternResults.length > 0) {
            newPatternIndex = 0;
            var patternList = cluster_results[0].patternResults;
            if (patternList[newPatternIndex].pattern.mappings.length > 0) {
              newMappingIndex = 0;
              this.load_source_code_mapping(patternList[newPatternIndex].pattern.mappings[newMappingIndex]);
            }
          }
        }

        this.setState({clusterResults : cluster_results,
                       clusterIndex : newClusterIndex,
                       patternIndex : newPatternIndex,
                       mappingIndex : newMappingIndex,
                      });
      }
    }.bind(this));
  }
}

export default Connector;


class Repo {
  constructor(repoId, user, repo, commitId, repoName) {
    this.repoId = repoId;
    this.user = user;
    this.repo = repo;
    this.commitId = commitId;
    this.repoName = repoName;
  }
}

class GroumSrc {
  constructor(groumId, fileName, className, simpleMethodName, methodLine) {
    this.groumId = groumId;
    this.fileName = fileName;
    this.className = className;
    this.simpleMethodName = simpleMethodName;
    this.methodName = this.className + "." + this.simpleMethodName
    this.methodLine = methodLine;
  }
}

class SrcData {
  constructor(srcText, lineNumber) {
    this.srcText = srcText;
    this.lineNumber = lineNumber;
  }
}

class SrcIso {
  constructor(add, iso, remove) {
    this.srcAdded = add;
    this.srcRemoved = iso;
    this.srcMatched = remove;
  }
}

class Mapping {
  constructor(node_isos, repo, groumSrc) {
    this.node_isos = node_isos;
    this.repo = repo;
    this.groumSrc = groumSrc;
  }
}

class Pattern {
  constructor(type, frequency, mappings) {
    this.type = type;
    this.frequency = frequency;
    this.mappings = mappings;
  }
}

class PatternResult {
  constructor(type, pattern) {
    this.type = type;
    this.pattern = pattern;
  }
}

class ClusterResults {
  constructor(methodNames, patternResults) {
    this.methodNames = methodNames;
    this.patternResults = patternResults;
  }
}
