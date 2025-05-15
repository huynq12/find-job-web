// // contexts/AuthContext.tsx
// import {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     ReactNode,
// } from "react";
// import { useRouter } from "next/router";
// import { User, AuthContextType } from "@/types/auth"; // Import các kiểu dữ liệus

// const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
// const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN;

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//     children,
// }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const router = useRouter();

//     useEffect(() => {
//         const checkLoggedIn = async () => {
//             try {
//                 const token = localStorage.getItem("accessToken");
//                 if (token) {
//                     const userData = JSON.parse(
//                         localStorage.getItem("user") || "{}"
//                     );
//                     setUser(userData);

//                     const response = await fetch(
//                         "http://localhost:8000/users/me",
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                             },
//                         }
//                     );

//                     if (response.ok) {
//                         const verifiedUserData: User = await response.json();
//                         setUser(verifiedUserData);
//                         localStorage.setItem(
//                             "user",
//                             JSON.stringify(verifiedUserData)
//                         );
//                     } else {
//                         logout();
//                     }
//                 }
//             } catch (error) {
//                 console.error("Auth error:", error);
//                 logout();
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkLoggedIn();
//     }, []);

//     const login = async (email: string, password: string): Promise<void> => {
//         setLoading(true);
//         try {
//             const formData = new URLSearchParams();
//             formData.append("username", email);
//             formData.append("password", password);

//             const response = await fetch("http://localhost:8000/token", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 body: formData,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || "Đăng nhập thất bại");
//             }

//             localStorage.setItem("accessToken", data.access_token);

//             const userResponse = await fetch("http://localhost:8000/users/me", {
//                 headers: {
//                     Authorization: `Bearer ${data.access_token}`,
//                 },
//             });

//             if (!userResponse.ok) {
//                 throw new Error("Không thể lấy thông tin người dùng");
//             }

//             const userData: User = await userResponse.json();
//             localStorage.setItem("user", JSON.stringify(userData));
//             setUser(userData);
//         } catch (error: any) {
//             console.error("Login error:", error);
//             throw new Error(
//                 error.message || "Đã có lỗi xảy ra trong quá trình đăng nhập."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const register = async (
//         name: string,
//         email: string,
//         password: string
//     ): Promise<void> => {
//         setLoading(true);
//         try {
//             const response = await fetch("http://localhost:8000/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name,
//                     email,
//                     password,
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || "Đăng ký thất bại");
//             }
//         } catch (error: any) {
//             console.error("Register error:", error);
//             throw new Error(
//                 error.message || "Đã có lỗi xảy ra trong quá trình đăng ký."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logout = (): void => {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");
//         setUser(null);
//         router.push("/login");
//     };

//     const value: AuthContextType = {
//         user,
//         isAuthenticated: !!user,
//         loading,
//         login,
//         register,
//     };

//     return (
//     <AuthContext.Provider value={value}>
//         {children}
//     </AuthContext.Provider>
// );
// };

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// };
