import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ScrobbleStore from "./stores/Scrobbles";

class App extends Component {

  constructor(){
    super();
    this.state = {
      scrobbles: ScrobbleStore.getAll()
    };
  }

  componentWillMount(){
    ScrobbleStore.on("change", () => {
      this.setState({
        scrobbles : ScrobbleStore.getAll(),
      });
    });
  }

  render() {

    var scrobbles = this.state.scrobbles.map(function(scrobble,i){
      return <ScrobbleItem scrobble={scrobble} key={i} />
    });

    return (
      <div className="Scrobbles">
        {scrobbles}
      </div>
    );
  }
}

class ScrobbleItem extends Component{

  render(){
    if(this.props.scrobble['@attr'] != undefined){
      if(this.props.scrobble['@attr'].nowPlaying == "true"){
          var date = "En ce moment";
      }
    } else {
      var date = this.props.scrobble.date["#text"];
    }


    return (
      <div className="scrobble">
        <img src={this.props.scrobble.image[0]["#text"]} />
        <p>{this.props.scrobble.name}</p>
        <p>{date}</p>
      </div>
    );
  }

}

export default App;
