import React, { Component } from "react";
import Todos from "./components/Todos";

import "./App.css";

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Clean the bathroom",
        completed: false,
      },
      {
        id: 2,
        title: "Feed the animals",
        completed: true,
      },
      {
        id: 3,
        title: "Play disc golf",
        completed: false,
      },
    ],
  };
  render() {
    return <Todos todos={this.state.todos} />;
  }
}

export default App;
