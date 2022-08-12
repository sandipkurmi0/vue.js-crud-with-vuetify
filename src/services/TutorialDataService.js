import http from '../AxiosBaseUrl'

class TutorialDataService {
    getAll(params) {
        return http.get("/api/tutorial", { params });
    }
    get(id) {
        return http.get(`/api/tutorial/${id}`)
    }
    create(data) {
        return http.post(`/api/tutorial`, data);
    }
    update(id, data) {
        return http.put(`/api/tutorial/${id}`, data)
    }
    delete(id) {
        return http.delete(`/api/tutorial/${id}`)
    }
    deleteAll() {
        return http.delete(`/api/tutorial`)
    }
    findByTitle(title) {
        return http.get(`/api/tutorial/?title=${title}`)
    }

}

export default new TutorialDataService();
