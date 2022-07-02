import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/Button/Button';
import css from './LoginForm.module.css';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(20).required(),
    }),

    onSubmit: async (values) => {
      const loginResult = await myFetch(`${baseUrl}/login`, 'POST', values);
      if (loginResult.success) {
        ctx.login(loginResult.token, values.email);
        history.replace('/home');
      }
      console.log('registerResult ===', loginResult);
      if (!loginResult.token) {
        console.log('login failed');
        return;
      }
      //   ctx.login(loginResult.token);
      console.log('registerResult ===', loginResult);

      console.log('submiting values ===', values);
    },
  });

  //   function matchPass() {
  //     const { password, repeatPassword } = initValues;
  //     if (password !== repeatPassword) {
  //       console.log('Passwords does not match');
  //     }
  //   }

  // function rightClassesForInput(field) {
  //   let resultClasses = 'email';

  //   if (formik.touched[field] && formik.errors[field]) {
  //     resultClasses += css['invalid'];
  //   }
  //   if (formik.touched[field] && formik.errors[field]) {
  //     resultClasses += css['valid'];
  //   }

  //   return resultClasses;
  // }
  return (
    <div className={css['form-container']}>
      <h1 className={css['form-title']}>Login page</h1>

      <form onSubmit={formik.handleSubmit} className={css['register-form']}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            // className={rightClassesForInput('email')}
            className={formik.touched.email && formik.errors.email ? css['invalid'] : ''}
            id='email'
            name='email'
          />
          {formik.touched.email && formik.errors.email && (
            <p className={css['error-msg']}>{formik.errors.email}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            className={formik.touched.password && formik.errors.password ? css['invalid'] : ''}
            id='password'
            name='password'
          />
          {formik.touched.password && formik.errors.password && (
            <p className={css['error-msg']}>{formik.errors.password}</p>
          )}
        </div>
        <Button submit primary>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
