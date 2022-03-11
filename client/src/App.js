import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
          <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/users" exact component={UserList}/>
            <Route path="/users/:userId" exact component={UserDetail}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
