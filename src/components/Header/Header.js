import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

function Header() {
  return (
    <header>
      <nav className={css['main-nav']}>
        <div>
          <img src='' alt='logo' />
        </div>
        <div className={css['nav-link-container']}>
          <NavLink className={css['nav-link']} to={'/register'}>
            Register
          </NavLink>
          <NavLink className={css['nav-link']} to={'/login'}>
            Login
          </NavLink>
          <NavLink className={css['nav-link']} to={'/home'}>
            Home
          </NavLink>
          <NavLink className={css['nav-link']} to={'/add'}>
            Add
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
