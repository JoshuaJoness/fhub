import React, { useEffect } from 'react';
import { 
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './views/login';
import Posts from './views/posts';
import Albums from './views/albums';
import Galleries from './views/galleries';
import Album from './views/album';

function App() {
  const isAuthenticated = !!localStorage.getItem('userId');
  console.log(isAuthenticated)

  return (
    <div>
      <Switch>
        <Route 
              path='/albums/:id'
              render={() =>
                isAuthenticated ? <Album /> : <Redirect to="/login" />
              }
            />
        <Route 
            path='/albums'
            render={() =>
              isAuthenticated ? <Albums /> : <Redirect to="/login" />
            }
          />
          <Route 
            path='/posts'
            render={() =>
              isAuthenticated ? <Posts /> : <Redirect to="/login" />
            }
          />
          <Route 
            path='/login'
            render={(props) =>
              <Login props={props} />
            }
          />
          <Route 
            path='/'
            render={(props) =>
              isAuthenticated ? <Galleries props={props} /> : <Redirect to="/login" />
            }
          />
      </Switch>
    </div>
  );
}

export default App;
