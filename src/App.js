import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddPage from './Pages/AddPage/AddPage';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Toaster />
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
        <ProtectedRoute exact path={'/home'}>
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
