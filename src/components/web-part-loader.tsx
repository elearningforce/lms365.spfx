import * as React from 'react';
import { Helper } from '../infrastructure/helper';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface WebPartLoaderProps {
    context: WebPartContext;
    moduleKey: string;
}

export class WebPartLoader extends React.Component<WebPartLoaderProps> {
    private _contentElement: Element;
    private _scriptLoaderElement: Element;

    private createScriptElement() {
        const scriptElement = document.createElement('script') as HTMLScriptElement;

        scriptElement.async = true;
        scriptElement.type = 'text/javascript';
        scriptElement.src = this.getScriptLoaderUrl();

        this._scriptLoaderElement.appendChild(scriptElement);
    }

    private getScriptLoaderUrl() {
        const { moduleKey } = this.props;
        const hash = Date.now();
        const chunkUrl = '/assets/js/' + moduleKey.toLowerCase();
        const proxyUrl = Helper.getProxyUrl();
        
        return proxyUrl + '/assets/js/script-loader?chunkUrl=' + encodeURIComponent(chunkUrl) + '&version=' + hash;
    }

    private initializePageContext() {
        const { pageContext } = this.props.context;

        window['_spPageContextInfo'] = {
            currentCultureName: pageContext.cultureInfo.currentCultureName,
            currentUICultureName: pageContext.cultureInfo.currentUICultureName,
            webAbsoluteUrl: pageContext.web.absoluteUrl
        };
    }

    private renderSpinner() {
        const { statusRenderer } = this.props.context;

        statusRenderer.displayLoadingIndicator(this._contentElement, '');
    }

    public componentDidMount() {
        this.renderSpinner();
        this.initializePageContext();
        this.createScriptElement();
    }

    public render(): JSX.Element {
        const { moduleKey } = this.props;

        return (
            <div>
                <div className={`--efLms365${moduleKey}`} ref={x => this._contentElement = x } />
                <div className="--efLms365ScriptLoader" ref={x => this._scriptLoaderElement = x} style={{ display: 'none' }} />
            </div>
        );
    }
}