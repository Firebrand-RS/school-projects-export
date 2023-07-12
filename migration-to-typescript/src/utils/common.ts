//функция поиска гарантированных элементов на странице
export const getGuaranteedElement = (parentElement: HTMLElement | Document, selector: string): HTMLElement => {
    return parentElement.querySelector(selector) as HTMLElement;
};

export function isValidParsedObject<T>(data: unknown, verifProp: keyof T): data is T {
    if (typeof data === 'object' && data !== null) {
        return verifProp in data;
    } else {
        return false;
    }
}
