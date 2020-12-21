import * as React from "react";
import RouterManager from "./Component/RouterManager/RouterManager";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <RouterManager />
      </Router>
    </div>
  );
}

export default App;
