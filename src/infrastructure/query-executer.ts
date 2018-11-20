import { HttpMethod, Query, QueryExecuter as QueryExecuterBase } from 'ef.lms365';

export class QueryExecuter implements QueryExecuterBase {
    public execute<T>(query: Query, resolve?: (result: T) => void, reject?: (error: any) => void): any {
        const method = query.method || HttpMethod.GET;
        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    if (resolve) {
                        resolve(JSON.parse(request.responseText));
                    }
                } else {
                    if (reject) {
                        reject(request);
                    }
                }
            }
        };

        request.open(HttpMethod[method], query.url);
        request.send(null);
    }
}