import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/Button/Button';

import css from './RegisterForm.module.css';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(20).required(),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      console.log('values ===', values);
      console.log('valuesCopy ===', valuesCopy);
      const registerResult = await myFetch(`${baseUrl}/register`, 'POST', valuesCopy);
      if (registerResult.changes === 1) {
        ctx.login(registerResult.token, valuesCopy.email);
        history.replace('/login');
      }
      console.log('registerResult ===', registerResult);
      // if (!registerResult.token) {
      //   console.log('cannot register');
      //   return;
      // }
      // ctx.register(registerResult.token);
      // console.log('registerResult ===', registerResult);

      console.log('submiting values ===', values);
    },
  });

  function matchPass() {
    const { password, repeatPassword } = initValues;
    if (password !== repeatPassword) {
      console.log('Passwords does not match');
    }
  }

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
      <h1 className={css['form-title']}>Register here</h1>

      <form onSubmit={formik.handleSubmit} onBlur={matchPass} className={css['register-form']}>
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
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type='password'
            className={
              formik.touched.repeatPassword && formik.errors.repeatPassword ? css['invalid'] : ''
            }
            id='repeatPassword'
            name='repeatPassword'
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className={css['error-msg']}>{formik.errors.repeatPassword}</p>
          )}
        </div>
        <Button submit primary>
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
