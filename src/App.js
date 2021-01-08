import * as React from "react";
import RouterManager from "./Component/RouterManager/RouterManager";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getReduxStore, getRrfProp } from "./Config/firebase-redux";

function App() {
  return (
    <div className="App">
      <Provider store={getReduxStore()}>
        <ReactReduxFirebaseProvider {...getRrfProp()}>
          <Router>
            <RouterManager />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
      {/* Windows 10 ssd test */}
    </div>
  );
}

export default App;
