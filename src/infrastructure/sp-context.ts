export class SPContext {     
    public static readonly instance: SPContext = new SPContext();

    private get pageContextInfo(): any {
        return window['_spPageContextInfo'];
    }

    public get currentCultureName(): string {
        return this.pageContextInfo.currentCultureName;
    }

    public get currentUICulture(): string {
        return this.pageContextInfo.currentUICultureName;
    }

    public get webUrl(): string {
        return this.pageContextInfo.webAbsoluteUrl;
    }

    public get userLoginName(): string {
        return this.pageContextInfo.userLoginName;
    }
}