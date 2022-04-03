
import './App.css';
import SubmitItem from './pages/SubmitItem';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './Utils/Utils';
import { AuthProvider } from "./context/AuthContext";
import MyItems from './pages/MyItems'
import AllItems from './pages/AllItems'
import LostItems from './pages/LostItems'
import FoundItems from './pages/FoundItems'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <PrivateRoute component={Dashboard} path="/" exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute  path="/submit-items" component={SubmitItem} />
        <PrivateRoute path="/mine" component={MyItems} />
        <PrivateRoute path="/all" component={AllItems} />
        <PrivateRoute path="/lost" component={LostItems} />
        <PrivateRoute path="/found" component={FoundItems} />
        

        
</AuthProvider>
        </Router>
  
    </div>
  );
}

export default App;
