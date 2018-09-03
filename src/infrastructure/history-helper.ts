import { UrlHelper } from './url-helper';

export class HistoryHelper {
    public initialize() {
        const parameterName = 'lms365cc';
        const { onpopstate } = window;

        if (onpopstate) {
            window.onpopstate = (e) => {
                const parameters = UrlHelper.getCurrentParameters();

                if ((parameters.length > 1) || (parameters[parameterName] == null)) {
                    onpopstate.apply(window, e);
                }
            };
        }
    }
}