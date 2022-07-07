import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={css['not-found-container']}>
      <h1>Not found 404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={'/login'}>Go to login page</Link>
    </div>
  );
}

export default NotFoundPage;
