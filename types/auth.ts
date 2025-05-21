// types/auth.ts
export interface User {
    id: number;
    username: string;
    // Các thuộc tính khác của người dùng
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
}
