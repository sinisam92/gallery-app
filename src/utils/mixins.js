import moment from 'moment';

export const DateMixin = {
  filters: {
    formatDate(str, outputFormat = 'DD-MM-YYYY HH:mm') {
      return moment(str).format(outputFormat);
    },
    diffForHumans(str) {
      return moment(str).fromNow();
    }
  }
};
