import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '522a81d439a5413aa123326fd3b13d12', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
