import News from './news/news';
import Sources from './sources/sources';
import { IArticle, IArticlesResponse, ISource, ISourcesResponse, IViewClass } from '../../utils/models';

export class AppView implements IViewClass {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IArticlesResponse): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesResponse): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
