import Home from './Route/Home.js'
import Register from './Route/Register.js'
import Login from './Route/Login.js'
import './App.css';
import User from './Route/User'
import Plan from './Route/Plan'
import ForgotPassword from './Route/ForgotPassword.js'
import ResetPassword from './Route/ResetPassword.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/user" component={User} />
          <Route path="/plan/:id" component={Plan} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>

  );
}

export default App;
