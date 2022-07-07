import { useState, useEffect } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { NavLink, useHistory } from 'react-router-dom';
import { baseUrl, myFetchAuth } from '../../utils';
import Card from '../../components/Card/Card';
import css from './HomePage.module.css';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  const [skills, setSkills] = useState('');

  const getSkills = async (values) => {
    const fetchResult = await myFetchAuth(`${baseUrl}v1/content/skills`, 'GET', token, values);

    if (Array.isArray(fetchResult)) {
      setSkills(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getSkills();
  }, []);

  return (
    <div className={css['cards-container']}>
      <h1 className={css['title']}>Home Page</h1>
      <div className={css['cards-output']}>
        {!Array.isArray(skills) ? (
          <h2 className={css['loading']}>Loading...</h2>
        ) : skills.length === 0 ? (
          <div className={css['add-skills-error']}>
            <h2 className={css['skills-error']}>No skills found. Please add a new skill.</h2>
            <NavLink to={'/add'} className={css['add-link']}>
              Add new skill!
            </NavLink>
          </div>
        ) : (
          skills.length > 0 && skills.map((skObj) => <Card key={skObj.id} {...skObj} />)
        )}
      </div>
    </div>
  );
}

export default HomePage;
