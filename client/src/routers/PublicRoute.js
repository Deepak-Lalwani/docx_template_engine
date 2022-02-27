import React from "react";
//import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user?.isAuthenticated) {
          return <Navigate to="/main" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.UserReducer || null,
//   };
// };

//export default connect(mapStateToProps)(PublicRoute);
export default PublicRoute;
