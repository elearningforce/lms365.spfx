import 'core-js/es6/array';
import 'core-js/es6/string';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { WebPartLoader, WebPartLoaderProps } from '../components/web-part-loader';

export abstract class LmsWebPart extends BaseClientSideWebPart<{}> {
    protected onDispose() {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    public render() {
        const element: React.ReactElement<WebPartLoaderProps> = React.createElement(
            WebPartLoader,
            {
                context: this.context,
                moduleKey: this.moduleKey
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected abstract get moduleKey(): string;
}