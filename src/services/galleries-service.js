import http from './http-service';

class GalleriesService {
  getGalleries(page = 1, term = '') {
    return http
      .get(`galleries?page=${page}&term=${term}`)
      .then(({ data }) => data);
  }
}

const galleriesService = new GalleriesService();

export default galleriesService;
