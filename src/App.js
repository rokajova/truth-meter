import * as React from "react";
import RouterManager from "./Component/RouterManager/RouterManager";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";
import Tags from "./Component/Tags";

function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <RouterManager />
            {/* <Tags /> */}
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
