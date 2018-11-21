import 'core-js/es6/array';
import 'core-js/es6/string';

import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { EnvironmentConfigProvider } from '../infrastructure/environment-config-provider';

export abstract class LmsWebPart extends BaseClientSideWebPart<{}> {
    private createScriptElement(url: string): HTMLElement {
        const result = document.createElement('script');

        result.async = true;
        result.charset = 'utf-8';
        result.src = url;
        result.type = 'text/javascript';

        return result;
    }

    private initializePageContext() {
        const { aadInfo, cultureInfo, legacyPageContext, web, user } = this.context.pageContext;

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

    public render() {
        this.initializePageContext();

        EnvironmentConfigProvider.instance.get(x => {
            const scriptUrl = `${x.assetsUrl}assets/js/${this.moduleKey}`;
            const scriptElement = this.createScriptElement(scriptUrl);

            this.domElement.innerHTML = `<div class="--efLms365${this.moduleKey}"></div>`;
            this.domElement.appendChild(scriptElement);
        });
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected abstract get moduleKey(): string;
}