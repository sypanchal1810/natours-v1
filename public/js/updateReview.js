/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateReview = async (id, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${id}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Thank you !! Your tour review Updated successfully...!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
