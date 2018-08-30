import React from 'react';

const styles = {
  wholeBar: {
    backgroundColor:'#1e88e5',
    position: 'fixed',
    overflow: 'hidden',
    height : 40,
    bottom: 0,
    width: '100%'
  },
  bottomimg: {
    maxWidth:'100%',
    maxHeight:'100%',
  }
}

class Bottombar extends React.Component{
    render(){
      var image = <img style={styles.bottomimg} src={"./static/imgs/cuplv-logo-300ppi_rectangle-gold-text.png"}/>

      var nav = <div style={styles.wholeBar}>
          <div style={{float:'left', height:40}}>{image}</div>
          </div>

      return nav;
    }
}

export default Bottombar;
