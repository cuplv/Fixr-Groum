/**
 * Created by yue on 4/23/17.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  wholeBar: {
    backgroundColor:'#1e88e5',
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
  },
  tutorial: {
    color:'white',
    textAlignVertical:'bottom',
    fontSize: 35,
    fontStyle: 'italic',
    textAlign:'right',
    paddingRight: 10,
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
          <div style={{float:'right'}}><span style={styles.tutorial}>Tutorial</span></div>
          </div>

      return nav;
    }
}

export default Navbar;
