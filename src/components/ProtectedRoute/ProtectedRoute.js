import { Link, Route } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './ProtectedRoute.module.css';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useAuthCtx();
  const { children, ...rest } = props;
  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <div className={css['protected-container']}>
          <h2>Please login</h2>
          <Link to={'/login'}>Login here</Link>
        </div>
      )}
    </Route>
  );
}

export default ProtectedRoute;
