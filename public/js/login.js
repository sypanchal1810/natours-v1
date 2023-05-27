/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password, type, activationToken) => {
  try {
    const res = await axios({
      method: 'POST',
      url:
        type === 'activate'
          ? `/api/v1/users/activate-account/${activationToken}`
          : '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      type === 'activate'
        ? showAlert('success', 'Email verified successfully!')
        : showAlert('success', 'Logged in successfully!');

      window.setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
