import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header(props) {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();
  return (
    <header className={css['header']}>
      <nav className={css['main-nav']}>
        <div>
          <img src='./assets/globe.png' alt='logo' />
        </div>
        <div className={css['nav-link-container']}>
          {isUserLoggedIn && <p className={css['user-email']}>You are logged in as: {userEmail}</p>}

          {!isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/register'}>
                Register
              </NavLink>
              <NavLink className={css['nav-link']} to={'/login'}>
                Login
              </NavLink>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <NavLink className={css['nav-link']} to={'/'}>
                Home
              </NavLink>
              <NavLink className={css['nav-link']} to={'/add'}>
                Add
              </NavLink>
              <NavLink onClick={logout} className={css['nav-link']} to={'/login'}>
                Logout
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
