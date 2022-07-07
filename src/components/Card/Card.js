import css from './Card.module.css';

function Card(props) {
  return (
    <div className={css['card']}>
      <h3 className={css['card-title']}>Title: {props.title}</h3>
      <p className={css['card-description']}>Description: {props.description}</p>
    </div>
  );
}

export default Card;
