import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import Search from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCbxK3HZUG2HHeLJan-9bphcukreKCBL2I';

// using you tube api.
// YTSearch({ key: API_KEY, term: 'surfboards'}, function (data){
//   console.log(data);
// });

// NOTES:

// Use ReactDom to render the applications parent component.
// in this case, our component is APP.
// the render wants to know two things - which is this root component and secondly where do you want to render this component.

// Upon load of the application we load some state definitions.
// videos and selected video currently.
// upon instantiation we set defaults to these values.

// Once the youtube api has finished we update the state with initial values.
// These are sent down to child components within the application.

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      term: ''
    };

    this.videoSearch('surfboards');

  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      // this.setState({ videos }); // when the key is the same as the value, we can assign videos to videos like this - { videos: videos }
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {

    // LoDash debounce / throttle search every 300 ms.
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

    return (
      <div>
        <Search onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}></VideoDetail>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('.container'));