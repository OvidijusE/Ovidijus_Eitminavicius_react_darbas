import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

function RegisterPage() {
  return (
    <div className={css['main-register-form-container']}>
      <h1 className={css['register-title']}>Register page</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
