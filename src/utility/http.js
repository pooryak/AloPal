class HttpClient {
    static _instance = null;

    static get instance() {
        return HttpClient._instance;
    }

    static set instance(instance) {
        HttpClient._instance = instance;
    }
}

export default HttpClient;
