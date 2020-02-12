import * as LoginRegistrationTypes from './loginRegistrationTypes';

export const showLoginRegistration = () => ({
  type: LoginRegistrationTypes.SHOW_LOGIN_REGISTRATION,
});

export const hideLoginRegistration = () => ({
  type: LoginRegistrationTypes.HIDE_LOGIN_REGISTRATION,
});
