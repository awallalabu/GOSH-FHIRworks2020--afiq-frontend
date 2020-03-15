import React from 'react';
import './main.scss';
import API from '../../utils/backendAPI'
import FhirChart from '../fhir-chart'
import CsvDownload from 'react-json-to-csv'
import {typeofgraph,charttype} from '../../utils/constants'
import {DropdownButton,Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        title: typeofgraph[0],
        chart: 'bar',
    };
    API.getdata(this.state.title.id).then((response) => this.setState({data: response.data}))
}

  _downloadxml(filename,data){
    var convert = require('xml-js');
    var options = {compact: true, ignoreComment: true, spaces: 4};
    var result = convert.json2xml(data, options);

    download(filename,result)
  }

  changeGraph(ids,values){
    const map = {id: ids,value: values}
    this.setState({title: map})
    console.log(this.state.title)
    API.getdata(ids).then((response) => this.setState({data: response.data}))
    // return id
  }

  changechart(id){
    this.setState({chart: id})
  }

  render(){
  const data = Object.entries(this.state.data).map(([key, value]) => {
    return { 'data' : key,
             'count': value}
  })
  // console.log(data)

  return (
    <div>
      <FhirChart data={data} title={this.state.title.value} chart={this.state.chart}/>
      <DropdownButton  variant="dark"  className="dropdown" id="dropdown-basic" title="Data to Display">
          {typeofgraph.map(info => <Dropdown.Item key={info.id} onSelect={this.changeGraph.bind(this,info.id,info.value)} >{info.value}</Dropdown.Item>)}
      </DropdownButton>
      <DropdownButton  variant="dark"  className="dropdown" id="dropdown-basic" title="Chart type">
          {charttype.map(info => <Dropdown.Item key={info.id} onSelect={this.changechart.bind(this,info.id)} >{info.name}</Dropdown.Item>)}
      </DropdownButton>
      <input type="button" onClick={() => this._downloadxml(this.state.title.id+'.xml',data)} value="Download data as xml"/>
      <CsvDownload data={data} filename={this.state.title.id+".csv"}/>
    </div>
  );
}
}

// from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

