import { User } from '../../models/user.class';

export class RoleValidator {
    isTeach(user: User): boolean {
        return user.role === 'TEACHER';
    }
    isStud(user: User): boolean {
        return user.role === 'STUDENT';
    }
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }
}