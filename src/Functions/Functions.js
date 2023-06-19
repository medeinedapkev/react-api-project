export function firstLetterUpperCase(element) {
    const firstLetter = element.charAt(0).toUpperCase();
    const lastOfStr = element.slice(1, element.length);
    const newElement = firstLetter + lastOfStr;

    return newElement;
}