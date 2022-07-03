// import Card from '../components/Card/Card';
import { useState, useEffect } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import { baseUrl, myFetchAuth } from '../../utils';

function HomePage() {
  const history = useHistory();
  const { token } = useAuthCtx();
  if (!token) history.push('/login');
  // console.log('token ===', token);
  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    const fetchResult = await myFetchAuth(`${baseUrl}v1/content/skills`, token);
    console.log('fetchResult ===', fetchResult);
    if (Array.isArray(fetchResult)) {
      setSkills(fetchResult);
    }
  };

  useEffect(() => {
    if (token) getSkills();
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
