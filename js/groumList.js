import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

const style = {
    cardText:{
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        height:40,
        fontSize: 12,
        overflowY:'auto',
        overflowX:'hidden',
        paddingBottom:0,
        paddingTop:'0.6vw'
    },
    cardHeader:{
        height:40,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflowY:'auto',
        overflowX:'hidden',
        padding:5
    },
};

class GroumList extends React.Component{

    onSelect(item){
        console.log('onSelect',item);
        createCookie('test',JSON.stringify(item),7);
        window.open(
              '/groum',
              '_blank'
        );
        /*
        var page_url = 'http://13.58.122.176:8081/query/provenance/groums?user='+item.user+'&repo='+item.repo+'&class='+item.class+'&method='+item.method+'&hash='+item.hash;
        console.log('page url',page_url)
        var request = $.ajax({
            type: 'get',
            url: window.location.protocol+'//'+window.location.host+"/crossdomain",
            data: {url:page_url},
            });

        request.done(function(reply){
            console.log(reply.groum_key_sni)
            window.open(
              '/groum',
              '_blank'
            );
            //document.write(reply)
        }.bind(this));
        */


        function createCookie(name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }
    }

    render(){
        var item = this.props.item;
        return <Card>
                    <CardHeader
                        title={'User: '+item.user}
                        subtitle={'Repo: '+item.repo}
                        style={style.cardHeader}
                        titleStyle={{fontSize:14,}}
                        subtitleStyle={{fontSize:14,color:'#000'}}
                        textStyle={{paddingRight:0,paddingLeft:11}}
                    />
                    <CardText style={style.cardText}>
                        <Subheader style={{lineHeight:0,height:20,padding:0,color:'#000'}}>{'Class: '+item.class}</Subheader>
                        <Subheader style={{lineHeight:0,height:20,padding:0,color:'#000'}}>{'Method: '+item.method}</Subheader>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Detail" style={{minWidth:8, height:35}} labelStyle={{fontSize:12}} onClick={() => this.onSelect(item)}/>
                    </CardActions>
                </Card>;
    }
}

export default GroumList;