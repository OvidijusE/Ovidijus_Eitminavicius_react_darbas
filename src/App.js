import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddPage from './Pages/AddPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <ProtectedRoute path={'/add'}>
          <AddPage />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/'}>
          <HomePage />
        </ProtectedRoute>
        <Route path={'*'}>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
