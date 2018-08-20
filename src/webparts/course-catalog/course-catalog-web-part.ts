import { LmsWebPart } from '../lms-web-part';

export default class CourseCatalogWebPart extends LmsWebPart {
    protected get moduleKey(): string {
        return 'Course-catalog-v2';
    }
}
