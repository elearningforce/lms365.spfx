import { LmsWebPart } from '../lms-web-part';

export default class CoursePageWebPart extends LmsWebPart {
    protected get moduleKey(): string {
        return 'Course-page-spfx';
    }
}