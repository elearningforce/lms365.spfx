import { LmsWebPart } from '../lms-web-part';
import { HistoryHelper } from '../../infrastructure/history-helper';

new HistoryHelper().initialize();

export default class CourseCatalogWebPart extends LmsWebPart {
    protected get moduleKey(): string {
        return 'Course-catalog-spfx';
    }
}
