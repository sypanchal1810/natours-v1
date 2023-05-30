/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const submitReview = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews/',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Thank you !! Your tour review submitted successfully...!');
      window.setTimeout(() => {
        location.reload(true);
      }, 4000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
