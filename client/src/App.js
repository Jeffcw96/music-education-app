import Home from './Route/Home.js'
import Register from './Route/Register.js'
import Login from './Route/Login.js'
import Checkout from './Route/Checkout.js'
import './App.css';
import Footer from './Footer.js'
import User from './Route/User'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/user" component={User} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
