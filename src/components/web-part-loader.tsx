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
        const { aadInfo, cultureInfo, legacyPageContext, web, user } = this.props.context.pageContext;

        window['_spPageContextInfo'] = {
            aadTenantId: aadInfo.tenantId,
            currentCultureName: cultureInfo.currentCultureName,
            currentUICultureName: cultureInfo.currentUICultureName,
            themeCacheToken: legacyPageContext.themeCacheToken,
            webAbsoluteUrl: web.absoluteUrl,

            userEmail: user.email,
            userLoginName: user.loginName,
            userDisplayName: user.displayName
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