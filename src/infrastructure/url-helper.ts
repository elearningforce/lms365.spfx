export class UrlHelper {
    public static getCurrentParameters(): { [name: string]: string } & string[] {
        return UrlHelper.getQueryParameters(window.location.search.substr(1));
    }

    public static getQueryParameters(query: string): { [name: string]: string } & string[] {
        const hashes = query.split('&');
        let result: string[] = [];

        for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i].split('=');
            const value = decodeURIComponent(hash[1]);

            result[hash[0]] = value;
            result.push(value);
        }

        return result as any;
    }
}