export class Utils {
    static removeSpecialCharacters(text: string) {
        return text.replace(/[^\w\s]/gi, '').replace(/ /g, '');
    }

    static convertHoursToMilliseconds(hour: number): number {
        return hour * 3600000;
    }
}
