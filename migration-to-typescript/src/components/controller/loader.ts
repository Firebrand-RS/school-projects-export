import {
    INewsRequest,
    QueryStringOptions,
    ILoaderClass,
    AccessData,
    RequestMethod,
    DrawViewCallback,
} from '../../utils/models';

class Loader implements ILoaderClass {
    private baseLink: string;
    private options: AccessData;

    public constructor(baseLink: string, options: AccessData) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: INewsRequest,
        callback: DrawViewCallback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: QueryStringOptions, endpoint: string): string {
        const urlOptions: AccessData & QueryStringOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`; //ts ругается на очевидную анотацию. Не типизирую

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: RequestMethod,
        endpoint: INewsRequest['endpoint'],
        callback: DrawViewCallback,
        options: INewsRequest['options'] = {}
    ): void | never {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: unknown) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
