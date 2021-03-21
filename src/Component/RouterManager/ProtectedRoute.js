import React from "react";
import { Route, Redirect } from "react-router-dom";

// check if user has logged, if true, then allow to render the component, if false, redirect somewhere else. This component goes to RouterManager
function ProtectedRoute({
  isAuth: isAuth,
  component: Component,
  redirectpathname: pathname,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: pathname, state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
