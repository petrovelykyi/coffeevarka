import * as ProfileTypes from './profileTypes';

export const requestUserProfile = () => ({
  type: ProfileTypes.REQUEST_USER_PROFILE,
});

export const requestedUserProfileSucceeded = (payload) => ({
  type: ProfileTypes.REQUESTED_USER_PROFILE_SUCCEEDED,
  payload,
});

export const requestedUserProfileFailed = (payload) => ({
  type: ProfileTypes.REQUESTED_USER_PROFILE_FAILED,
  payload,
});

export const requestUpdateUserProfile = () => ({
  type: ProfileTypes.REQUEST_UPDATE_USER_PROFILE,
});

export const requestedUpdateUserProfileSucceeded = (payload) => ({
  type: ProfileTypes.REQUESTED_UPDATE_USER_PROFILE_SUCCEEDED,
  payload,
});

export const requestedUpdateUserProfileFailed = (payload) => ({
  type: ProfileTypes.REQUESTED_UPDATE_USER_PROFILE_FAILED,
  payload,
});
export const requestUpdatePassword = () => ({
  type: ProfileTypes.REQUEST_UPDATE_PASSWORD,
});

export const requestedUpdatePasswordSucceeded = () => ({
  type: ProfileTypes.REQUESTED_UPDATE_PASSWORD_SUCCEEDED,
});

export const requestedUpdatePasswordFailed = (payload) => ({
  type: ProfileTypes.REQUESTED_UPDATE_PASSWORD_FAILED,
  payload,
});
export const setUserCity = (payload) => ({
  type: ProfileTypes.SET_USER_CITY,
  payload,
});

export const setUserField = (payload) => ({
  type: ProfileTypes.SET_USER_FIELD,
  payload,
});

export const setUserPassword = (payload) => ({
  type: ProfileTypes.SET_USER_PASSWORD,
  payload,
});

export const setUserDataEditMode = (payload) => ({
  type: ProfileTypes.SET_USER_DATA_EDIT_MODE,
  payload,
});

export const setPasswordEditMode = (payload) => ({
  type: ProfileTypes.SET_PASSWORD_EDIT_MODE,
  payload,
});

export const setProfileInitialState = () => ({
  type: ProfileTypes.SET_PROFILE_INITIAL_STATE,
});
