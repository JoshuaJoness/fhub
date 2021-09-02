import React from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';
import Login from './views/login';
import Gallery from './views/gallery';

function App() {
  return (
    <div>
      <Switch>
          <Route path='/login'>
              <Login />
          </Route>
          <Route path='/'>
              <Gallery />
          </Route>
          <Route path='/photo/:id'>
              <Login />
          </Route>
        <Route path='/logout'>
            <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
