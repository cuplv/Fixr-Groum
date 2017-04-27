/**
 * Created by yue on 4/27/17.
 */
import React from 'react';
import {List, ListItem, NestedList} from 'material-ui/List';

const styles = {
    codeSnippet: {
        fontFamily: "Fira Mono",
        fontSize: 14
    },
}

class JimpleCode extends React.Component{
    render(){
        var res = this.props.code.split("\n").map(function(line, index) {
            return <ListItem
                key={index}
                primaryText={
                    <pre style={{marginTop:0,marginBottom:0}}><code dangerouslySetInnerHTML={{__html: line}}></code></pre>
                }
                innerDivStyle={{padding:0}}
                style={styles.codeSnippet}
            />
        })
        return <List>{res}</List>
    }
}

export default JimpleCode;