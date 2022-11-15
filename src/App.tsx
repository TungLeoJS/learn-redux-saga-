import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { authActions } from 'features/auth/authSlice';
import { useAppDispatch } from 'app/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  });

  return (
    <>
      <Button onClick={() => dispatch(authActions.logout())} variant='contained' color='primary'>
        Logout
      </Button>
      <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
    </>
  );
}

export default App;
