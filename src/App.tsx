import React from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';
import Login from './views/login';
import Gallery from './views/gallery';
import Album from './views/album';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/my-gallery'>
              <Gallery />
          </Route>
          <Route path='/albums/:id'>
              <Album />
          </Route>
          <Route path='/login'>
              <Login />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
