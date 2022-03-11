import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import AlbumDetail from './components/AlbumDetail';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
          <Switch>
            <Route path="/" exact component={UserList}/>
            <Route path="/users" exact component={UserList}/>
            <Route path="/users/:userId" exact component={UserDetail}/>
            <Route path="/users/:userId/album/:albumId" exact component={AlbumDetail}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
