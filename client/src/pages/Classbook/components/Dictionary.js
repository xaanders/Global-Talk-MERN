import React from 'react'
import ClassbookCards from './Cards/ClassbookCards'
import NoCards from './Cards/NoCards';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../store/actions/userActions';
import { userActions } from '../../../store/reducers/user-slice';

function Dictionary({ words }) {
  const id = useSelector(state => state.user.userInfo && state.user.userInfo.profile._id);
  const dictionary = useSelector(state => state.user.userInfo.profile.dictionary);
  const dispatch = useDispatch();

  const removeWordFromDictionary = (word) => {
    if (id) {
      const newDictionary = dictionary.filter(item => item !== word.translation)

      const newProfile = {
        profileId: id,
        newDictionary: newDictionary
      }
      setUserProfile(newProfile, dispatch);
    } else {
      dispatch(userActions.removeFromDictionary(word.translation));
    }
  }

  return (
    <React.Fragment>
      {dictionary && dictionary.length > 0 ? <ClassbookCards words={words} wordHandler={removeWordFromDictionary} textbook={false} /> :
        <NoCards message="To save difficult words for further study, go to the textbook and select 'add to dictionary'" />}
    </React.Fragment>
  )
}

export default Dictionary