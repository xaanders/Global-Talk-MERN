import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import jwt_decode from "jwt-decode";
import axios from 'axios'


import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from './common/layout/Layout';
import HomePage from './pages/Home';
import Statistics from './pages/Statistics';
import Sprint from './pages/Games/Sprint';
import AudioCall from './pages/Games/AudioCall';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';


import { getUserProfile, logoutUser } from './store/actions/userActions';
import { errorActions } from "./store/reducers/error-slice";
import { userActions } from './store/reducers/user-slice';
import setAuthToken from "./utils/setAuthToken";
import CustomSpinner from './common/CustomSpinner';

const Classbook = lazy(() => import('./pages/Classbook'))

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const storageToken = localStorage.getItem('jwtToken');
  useEffect(() => {
    dispatch(errorActions.getErrors({}));
    if (storageToken) {
      // Set auth token header auth
      const token = storageToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        logoutUser(dispatch);
      } else {
        getUserProfile({ _id: decoded.profile }, dispatch);
      }
    }
  }, [location.pathname, dispatch, storageToken])

  useEffect(() => {
    if (storageToken) {
      // Set auth token header auth
      const token = storageToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      dispatch(userActions.setUser({ auth: true, user: decoded }));
    }
  }, [dispatch, storageToken])

 
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/router/words/`)
      .then(response => {
        setCards(response.data);
      })
      .catch(err => console.log(err));
  }, [setCards]);

  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />

        <Route path="/statistics" element={<Statistics />}>
          <Route path="day" element={<Statistics />} />
          <Route path="alltime" element={<Statistics />} />
          <Route path="/statistics/*" element={<Navigate to="day" replace />} />
        </Route>

        <Route path="/textbook" element={<Suspense fallback={<CustomSpinner/>}><Classbook cards={cards} /></Suspense>}>
          <Route path=":level" element={<Suspense fallback={<CustomSpinner/>}><Classbook cards={cards} /></Suspense>}>
            <Route path=":pageNumber" element={<Suspense fallback={<CustomSpinner/>}><Classbook cards={cards} /></Suspense>} />
          </Route>
        </Route>

        <Route path="/dictionary" element={<Classbook cards={cards}/>}>
          <Route path=":level" element={<Classbook cards={cards}/>}>
            <Route path=":pageNumber" element={<Classbook cards={cards}/>} />
          </Route>
        </Route>

        <Route path="/audiocall" element={<AudioCall />} />
        <Route path="/sprint" element={<Sprint />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/classbook" element={<Navigate to="/textbook" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Layout>
  );
}

export default App;
