/**
 * Created by yue on 4/23/17.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
    wholeBar: {
        backgroundColor:'#1e88e5',
        height: 50
    },
    title: {
        textAlign:'center',
        height:50,
        lineHeight:'50px',
    }
}

class Navbar extends React.Component{
    render(){
        return <AppBar
            title="Groum Explorer: Understanding API Usage Patterns on GitHub"
            style={styles.wholeBar}
            titleStyle={styles.title}
            showMenuIconButton={false}
        />
    }
}

export default Navbar;