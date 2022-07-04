import AddForm from '../../components/AddForm/AddForm';
import css from './AddPage.module.css';

function AddPage() {
  return (
    <div className={css['cards-container']}>
      <h1 className={css['title']}>Add page</h1>
      <AddForm />
    </div>
  );
}

export default AddPage;
