import { useFormik } from 'formik';

import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/Button/Button';
import css from './AddForm.module.css';

const initValues = {
  title: '',
  description: '',
};

function AddForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(4, 'At least 4 characters')
        .max(20, 'Maximum title length reached')
        .required(),
      description: Yup.string()
        .min(4, 'At least 4 characters')
        .max(30, 'Maximum description length reached')
        .required(),
    }),

    onSubmit: async (values) => {
      const addResult = await myFetch(`${baseUrl}v1/content/skills`, 'POST', values);
      console.log('addResult ===', addResult);

      if (addResult.msg === 'Added new skill to account') {
        ctx.login(addResult.token, values.title);
        history.replace('/home');
      }
      console.log('addResult ===', addResult);
      if (addResult.msg === 'Incorrect data sent') {
        console.log('please check your data');
        return;
      }
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
      <h3 className={css['form-title']}>Enter skills</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor='title'>Enter title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type='text'
            // className={rightClassesForInput('email')}
            className={formik.touched.title && formik.errors.title ? css['invalid'] : ''}
            id='title'
            name='title'
          />
          {formik.touched.title && formik.errors.title && (
            <p className={css['error-msg']}>{formik.errors.title}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor='description'>Enter description</label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            type='description'
            className={
              formik.touched.description && formik.errors.description ? css['invalid'] : ''
            }
            id='description'
            name='description'
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className={css['error-msg']}>{formik.errors.description}</p>
          )}
        </div>
        <Button submit primary>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddForm;
