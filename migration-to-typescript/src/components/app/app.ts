import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getGuaranteedElement, isValidParsedObject } from '../../utils/common';
import { IArticlesResponse, ISourcesResponse, IApplication } from '../../utils/models';

class App implements IApplication {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        getGuaranteedElement(document, '.sources').addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data) => {
                /*У меня аннотированы оба метода отрисовки. Они принимают разные объекты.
                Допустим, что я не доверяю апи. Сделаю простую проверку на свойство и приведу к нужному интерфейсу*/
                if (isValidParsedObject<IArticlesResponse>(data, 'articles')) {
                    this.view.drawNews(data);
                } else {
                    throw new Error('Invalid news response object');
                }
            })
        );
        this.controller.getSources((data) => {
            if (isValidParsedObject<ISourcesResponse>(data, 'sources')) {
                this.view.drawSources(data);
            } else {
                throw new Error('Invalid sources response object');
            }
        });
    }
}

export default App;
