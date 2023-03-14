import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import NotAvailable from './components/NotAvailable';
import UserStatistics from './components/UserStatistics';


function Statistics() {
  const userAuth = useSelector(state => state.user)
  const location = useLocation().pathname.split('/');
  const navigate = useNavigate();
  useEffect(() => {
    if(!location.includes('day') && !location.includes('alltime')) {
      navigate('day')
    }
  }, [location, navigate])
  
  return (
    <section>
        <Container>
            {userAuth.isAuthenticated && userAuth.userInfo.profile.dayStatistics ? <UserStatistics location={location} profile={userAuth.userInfo.profile}/> : <NotAvailable/>}
        </Container>
    </section>
  )
}

export default Statistics