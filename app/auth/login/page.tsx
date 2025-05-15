// pages/login.js
"use client";
import { FormLogin } from "@/components/auth/login-form";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const USER_PROFILE = process.env.NEXT_PUBLIC_USER_PROFILE_URL;

async function connect_token(
    username: string,
    password: string
): Promise<string> {
    const response = await fetch(DOMAIN + LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    console.log(DOMAIN + LOGIN_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
    }

    console.log("Login successfully");

    return data.access_token;
}

export default function Login() {
    const [loginMessage, setLoginMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (username: string, password: string) => {
            setLoading(true);
            setError("");
            setLoginMessage("");
            try {
                const access_token = await connect_token(username, password);
                sessionStorage.setItem("access_token", access_token);
                setLoginMessage("Login successfully!");
                setTimeout(() => {
                    router.push("/");
                }, 500);
            } catch (error: any) {
                setError(error.message || "Error while signing in");
            } finally {
                setLoading(false);
            }
        },
        [connect_token]
    );

    return (
        <>
            <Head>
                <title>Đăng nhập | Hệ thống gợi ý việc làm</title>
            </Head>
            <div className="container mx-auto py-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <Link
                                href="/auth/register"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Sign up if you don't have account
                            </Link>
                        </p>
                    </div>
                    <FormLogin submit={handleSubmit} />
                    {loading && <p className="mt-4">Loading...</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    {loginMessage && (
                        <p className="mt-4 text-green-500">{loginMessage}</p>
                    )}
                </div>
            </div>
        </>
    );
}
