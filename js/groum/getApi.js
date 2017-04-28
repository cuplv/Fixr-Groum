/**
 * Created by yue on 4/26/17.
 */
import React from 'react';
import Info from './info.js';

class GetApi extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            response:""
        }
    }

    render(){

        if(this.state.response!="")
            return <Info data={this.state.response}/>
        else return <div>Rendering...</div>
    }

    componentDidMount(){
        console.log('request',this.props.data)
        var item = this.props.data;
        var page_url = this.props.config.provenance+'user='+item.user+'&repo='+item.repo+'&class='+item.class+'&method='+item.method+'&hash='+item.hash;
        console.log('page url',page_url)
        var request = $.ajax({
            type: 'get',
            url: window.location.protocol+'//'+window.location.host+"/crossdomain",
            data: {url:page_url},
            });

        request.done(function(reply){
            var json = JSON.parse(reply.content);
            console.log('reply',json)
            this.setState({
                response:json
            })
        }.bind(this));
    }
}

export default GetApi;