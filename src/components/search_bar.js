import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="search for a video"
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}


// only use setState, never change vars with = unless inside the constructor.

export default SearchBar;

