import { EventEmitter } from "events";
import axios from 'axios';

class ScrobbleStore extends EventEmitter{
  constructor(){
    super();
    this.scrobbles = [];

    var that = this;

    axios.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rastier_b&api_key=621f15dae69f3555d1558ff438087cf5&format=json')
    .then(function (response) {

      var data = response.data.recenttracks.track;
      that.scrobbles = data;

      that.emit("change");

      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAll() {
    return this.scrobbles;
  }

}

const scrobbleStore = new ScrobbleStore;

export default scrobbleStore;
