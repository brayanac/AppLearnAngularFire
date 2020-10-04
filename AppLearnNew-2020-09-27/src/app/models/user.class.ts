export type Roles = 'TEACHER' | 'STUDENT' | 'ADMIN';
export class User {
    uid?: string;
    email?: string;
    phone?: string;
    displayName?: string;
    instituteId?: string;
    institute?: string;
    password?: string;
    photoURL?: string;
    role?: string;
}