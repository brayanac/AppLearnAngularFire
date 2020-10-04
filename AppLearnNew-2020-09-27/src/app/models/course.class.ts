export type Roles = 'TEACHER' | 'STUDENT' | 'ADMIN';
export class Course {
    uid?: string;
    description?: string;
    schedule?: string;
    teacher?: string;
    student?: string;
}