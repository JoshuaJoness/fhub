import React from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';
import Login from './views/login';

function App() {
  return (
    <div>
      <Switch>
          <Route path='/login'>
              <Login />
          </Route>
      </Switch>
      <Switch>
          <Route path='/'>
              {/* <Login /> */}
          </Route>
        </Switch>
      <Switch>
          <Route path='/photo/:id'>
              <Login />
          </Route>
      </Switch>
      <Switch>
        <Route path='/logout'>
            <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
