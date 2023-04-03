import React from 'react'
import ClassbookCards from './Cards/ClassbookCards';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../store/actions/userActions';
import { userActions } from '../../../store/reducers/user-slice';
import NoCards from './Cards/NoCards';
import CustomSpinner from '../../../common/CustomSpinner';

function Textbook({ words }) {
    const id = useSelector(state => state.user.userInfo && state.user.userInfo.profile._id);
    const dictionary = useSelector(state => state.user.userInfo.profile.dictionary);
    const dispatch = useDispatch();

    const addWordToDictionary = (word) => {
        if (id) {
            const newProfile = {
                profileId: id,
                newDictionary: [...dictionary, word.translation]
            }
            setUserProfile(newProfile, dispatch);
        } else {
            dispatch(userActions.setDictionary(word.translation));
        }
    }

    return (
        <>
            {words.length === 0 ? <CustomSpinner/>
                 :
                <ClassbookCards words={words} wordHandler={addWordToDictionary} />}
        </>
    )
}

export default Textbook