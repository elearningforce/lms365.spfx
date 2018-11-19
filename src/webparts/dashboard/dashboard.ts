import { LmsWebPart } from '../lms-web-part';

export default class DashboardWebPart extends LmsWebPart {
    protected get moduleKey(): string {
        return 'Dashboard-spfx';
    }
}
