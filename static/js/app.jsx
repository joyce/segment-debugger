import React from "react";
import openSocket from "socket.io-client";

const socket = openSocket('http://localhost:7055/stream');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      events: []
    };
  }

  startStopButton() {
    const desc = this.state.isRunning ? 'Stop' : 'Start';
    return (
      <li>
        <button onClick={() => this.toggleDebugger()}>{desc}</button>
      </li>
    );
  }

  updateEvents(data) {
    if (!this.state.isRunning) {
      return;
    }
    const updatedEvents = this.state.events;
    updatedEvents.push(data);
    this.setState({
      isRunning: this.state.isRunning,
      events: updatedEvents
    });
    return;
  }

  toggleDebugger() {
    if (!this.state.isRunning) {
      // Start
      socket.on('event', data => this.updateEvents(data) );
    }
    this.setState({isRunning: !this.state.isRunning});
  }

  render () {
    socket.on('connect', function(){
      console.log('connected');
    });
    socket.on('disconnect', function(){
      console.log('disconnected');
    });

    const eventsData = this.state.events;
    const events = [];
    for (var i = 0; i < eventsData.length; i++){
      events.push(
        <button type="button" className="N7RqZlA3wCu6uBab7WCZe" data-is-selected="true">
          {eventsData[i]}
          <div title="Allowed event" className="ui-lib-box css-1c2r582">
            <svg style={{}} viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg" fill="#016cd1">
              <title>Allowed event</title>
              <path d="M8 .51c-4.41 0-8 3.588-8 8 0 4.41 3.59 8 8 8s8-3.59 8-8c0-4.412-3.59-8-8-8zm0 14c-3.31 0-6-2.692-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.308-2.69 6-6 6z" />
              <path d="M7 11.923L3.586 8.51 5 7.094l2 2 4-4 1.414 1.414" />
            </svg>
          </div>
          <div className="_3th8iVl_LfZwPM8LEi1s3X">{eventsData[i].type}</div>
          <div className="_3of-EWNO1IxbMWx-75-G3q">
          <div className="QWHzinJxouIIUBH7EMOmx" title="/">/</div>
        </div>
        <time className="_1OaBdfXOfy6o6Wyq9OaFmn" dateTime="2018-01-14T20:41:13.412Z" title="2018-01-14T20:41:13.412Z">{eventsData[i].sentAt}</time>
      </button>);
    }

    return (
      <div className="ui-lib-box css-1c2r582 css-n9fe5c">
        {this.startStopButton()}
        {events}
      </div>
    );
  }
}
