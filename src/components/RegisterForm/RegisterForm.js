import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';

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
      password: Yup.string().min(4, 'At least 8 characters').max(10).required(),
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
      if (registerResult.succcess) {
        ctx.register(registerResult.token, valuesCopy.email);
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

  function rightClassesForInput(field) {
    let resultClasses = css['form-control'];

    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? ' is-invalid' : ' is-valid';
    }

    return resultClasses;
  }
  return (
    <div className={css['container']}>
      <h1 className={css['form-title']}>Register here</h1>

      <form onSubmit={formik.handleSubmit} onBlur={matchPass} className={css['register-form']}>
        <div className={css['form-group']}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type='email'
            className={rightClassesForInput('email')}
            id='email'
            name='email'
          />
          <div className={css['invalid-feedback']}>{formik.errors.email}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='password'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type='password'
            className={rightClassesForInput('password')}
            id='password'
            name='password'
          />
          <div className={css['invalid-feedback']}>{formik.errors.password}</div>
        </div>
        <div className={css['form-group']}>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type='password'
            className={rightClassesForInput('repeatPassword')}
            id='repeatPassword'
            name='repeatPassword'
          />
          <div className={css['invalid-feedback']}>{formik.errors.repeatPassword}</div>
        </div>
        <button type='submit' className={css['button']}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
