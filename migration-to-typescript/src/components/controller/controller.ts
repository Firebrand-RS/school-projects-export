import AppLoader from './appLoader';
import { DrawViewCallback } from '../../utils/models';
import { INewsAppController } from '../../utils/models';

class AppController extends AppLoader implements INewsAppController {
    public getSources(callback: DrawViewCallback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: DrawViewCallback) {
        let target: HTMLElement = e.target as HTMLElement;
        if (!target) {
            return;
        }
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;
        if (!newsContainer) {
            return;
        }

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string; // была проверка на 'source__item'. Гарантированный атрибут
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
