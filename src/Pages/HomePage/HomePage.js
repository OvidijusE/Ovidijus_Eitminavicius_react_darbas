// import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import { baseUrl, myFetchAuth } from '../../utils';
import Card from '../../components/Card/Card';
import css from './HomePage.module.css';
// import toast from 'react-hot-toast';

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
          <h2>Loading...</h2>
        ) : skills.length === 0 ? (
          <h2>No skills found. Please add a new skill.</h2>
        ) : (
          skills.length > 0 && skills.map((skObj) => <Card key={skObj.id} {...skObj} />)
        )}
      </div>
    </div>
  );
}
//   return (
//     <div className={css['cards-container']}>
//       <h1 className={css['title']}>Home Page</h1>
//       <div className={css['cards-output']}>
//         {/* {skills.length === 0 && <h2>No skills found! Add a new one.</h2>} */}
//         {skills.length === 0 && <h2>Loading skills...</h2>}
//         {skills.map((sObj) => (
//           <Card key={sObj.id} {...sObj} />
//         ))}
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className={css['cards-container']}>
//       <h1 className={css['title']}>Home Page</h1>
//       <div className={css['cards-output']}>
//         {skills.length === 0 ? (
//           <h2>Loading skills</h2>
//         ) : Array.isArray(skills) ? (
//           <h2>No skills</h2>
//         ) : (
//           skills.map((sObj) => <Card key={sObj.id} {...sObj} />)
//         )}
//       </div>
//     </div>
//   );
// }

export default HomePage;
