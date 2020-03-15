import React from 'react';
import DrawChart from '../../utils/drawChart.js'
import './chart.scss'


export default class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {results: [],
            graphcolour:[],
            ready: true,
            data: this.props.data,
        };
        this.chartRef = React.createRef();
    }

    componentDidUpdate(){
        if (!this.state.ready || this.props.data !== this.state.data){
        var colour = []
        for (var i = 0; i < this.props.data.length; i++){
            const newcolor = getRandomColor()
            colour.push(newcolor);
            console.log(newcolor)
        }
        this.setState({graphcolour:colour, data : this.props.data,ready:true})}
    }

    render() {
        const input = this.props.data.map(value => value.data)
        const data = this.props.data.map(value => value.count)        
        console.log(this.state.ready)
        if (this.state.ready){
        return <div className="chart-canvas">
            <DrawChart id={this.props.title + '-'+ this.state.graph} title={this.props.title} labels={input} data={data} color={this.state.graphcolour} chart={this.props.chart}/>
        </div>;}
        return <></>;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
