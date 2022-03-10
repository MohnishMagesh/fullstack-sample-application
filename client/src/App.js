import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
          <Switch>
            {/* <Route exact path="/" element={<UserList/>} /> */}
            <Route path="/">
              <UserList/>
            </Route>
            <Route path="/:userId">
              <UserDetail/>
            </Route>
            {/* <Route path="/usernames/userdetails" component={UserDetail} /> */}
          </Switch>
        </Router>
    </div>
  );
}

export default App;
