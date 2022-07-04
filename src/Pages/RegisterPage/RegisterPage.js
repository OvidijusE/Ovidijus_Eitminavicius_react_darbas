import RegisterForm from '../../components/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

function RegisterPage() {
  return (
    <div className={css['main-register-form-container']}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
