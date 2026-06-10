import type { User, UserRole } from '@/lib/mock-data';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from './storage';
import { UserService } from './UserService';

const ROLE_LOGIN_USER_IDS: Record<UserRole, string> = {
  student: '1',
  lecturer: '2',
  hod: '3',
  admin: '4',
  sysadmin: '5',
};

function toAuthUser(systemUser: { id: string; name: string; email: string; role: UserRole; department?: string }): User {
  return {
    id: systemUser.id,
    name: systemUser.name,
    email: systemUser.email,
    role: systemUser.role,
    department: systemUser.department,
  };
}

export const AuthService = {
  getCurrentUser(): User | null {
    return getStorageItem<User>(STORAGE_KEYS.AUTH_USER);
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      setStorageItem(STORAGE_KEYS.AUTH_USER, user);
    } else {
      removeStorageItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  login(role: UserRole): User | null {
    const preferredId = ROLE_LOGIN_USER_IDS[role];
    const systemUser = UserService.getById(preferredId) ?? UserService.getByRole(role);
    if (!systemUser) return null;

    const authUser = toAuthUser(systemUser);
    this.setCurrentUser(authUser);
    return authUser;
  },

  logout(): void {
    this.setCurrentUser(null);
  },
};
