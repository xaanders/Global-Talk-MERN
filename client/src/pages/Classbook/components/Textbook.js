import React from 'react'
import ClassbookCards from './Cards/ClassbookCards';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../store/actions/userActions';
import { userActions } from '../../../store/reducers/user-slice';
import NoCards from './Cards/NoCards';
import { Spinner } from 'react-bootstrap';

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
            {words.length === 0 ?
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" className="spinner" role="status" style={{ width: '100px', height: '100px' }} />
                </div> :
                <ClassbookCards words={words} wordHandler={addWordToDictionary} />}
        </>
    )
}

export default Textbook