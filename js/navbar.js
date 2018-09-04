/**
 * Created by yue on 4/23/17.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  wholeBar: {
    backgroundColor:'#565A5C',
    height: 50,
  },
  otherDiv: {
    maxWidth:'100%',
    maxHeight:'100%'
  },
  title: {
    textAlignVertical:'center',
    paddingLeft: '2%',
  },
  titlehref: {
    color:'white',
    textAlignVertical:'center',
    fontSize: 35,
    textAlign:'left',
    textDecoration: 'none',
    fontFamily: "Helvetica Neue, Helvetica, Arial",
  },
  tutorial: {
    color:'white',
    textAlignVertical:'bottom',
    fontSize: 35,
    fontStyle: 'italic',
    textAlign:'right',
    paddingRight: 10,
    textDecoration: 'none',
    fontFamily: "Helvetica Neue, Helvetica, Arial",
  },
  titleimg: {
    height : 50,
  }
}

class Navbar extends React.Component{
    render(){
      var image = <img style={styles.titleimg} src={"./static/imgs/biggroum.png"}/>

      var nav = <div style={styles.wholeBar}>
          <div style={{float:'left', height:50}}>{image}</div>
          <span style={styles.title}><a href={"https://plv.colorado.edu/biggroum/"} style={styles.titlehref}>BigGroum</a></span>
          <div style={{float:'right'}}><a href={"https://plv.colorado.edu/biggroum/tutorial"} style={styles.tutorial}>Tutorial</a></div>
          </div>

      return nav;
    }
}

export default Navbar;
