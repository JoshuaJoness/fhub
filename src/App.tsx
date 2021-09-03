import React from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';
import Login from './views/login';
import Gallery from './views/gallery';
import Galleries from './views/galleries';
import Album from './views/album';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path='/gallery'>
              <Gallery />
          </Route>
          <Route path='/albums/:id'>
              <Album />
          </Route>
          <Route path='/login'>
              <Login />
          </Route>
          <Route path='/'>
              <Galleries />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
