import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={css['login-form-main-container']}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
