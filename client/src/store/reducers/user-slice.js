import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userInfo: {
        profile: {
            dictionary: [],
            dayStatistics: {
                Sprint: [],
                AudioCall: []
            }
        }
    },
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, actions) {
            return {
                ...state,
                isAuthenticated: actions.payload.auth,
                userInfo: actions.payload.user,
            };
        },
        setDictionary(state, actions) {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    profile: {
                        ...state.userInfo.profile,
                        dictionary: [...state.userInfo.profile.dictionary, actions.payload]
                    }
                }
            }
        },
        removeFromDictionary(state, actions) {
            const newDictionary = state.userInfo.profile.dictionary.filter(item => item !== actions.payload)
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    profile: {
                        ...state.userInfo.profile,
                        dictionary: newDictionary
                    }
                }
            }
        },
        setGame(state, actions) {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    profile: {
                        ...state.userInfo.profile,
                        dayStatistics: actions.payload.dayStatistics
                    }
                }
            }
        },
        setUserProfile(state, actions) {
            return {
                ...state,
                userInfo: { ...state.userInfo, profile: actions.payload }
            }
        },
        userLoading(state, actions) {
            return {
                ...state,
                loading: actions.payload
            };
        },
    }

});

export const userActions = userSlice.actions;

export default userSlice;