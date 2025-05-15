// pages/register.js
"use client";
import { FormRegister } from "@/components/auth/register-form";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";
const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTER;

interface RegisterResponse {
    message: String;
}

interface RegisterFormInput {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone_number: string;
}

async function register_account(
    username: string,
    fullname: string,
    email: string,
    phone_number: string,
    password: string
): Promise<{ message: string }> {
    const response = await fetch(DOMAIN + REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            fullname,
            email,
            phone_number,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Register failed");
    }

    console.log("Register successfully");

    return data.message;
}

export default function Register() {
    const [registerMessage, setRegisterMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(
        async (
            username: string,
            fullname: string,
            email: string,
            phone_number: string,
            password: string
        ) => {
            setLoading(true);
            setError("");
            setRegisterMessage("");
            try {
                const response = await register_account(
                    username,
                    fullname,
                    email,
                    phone_number,
                    password
                );
                setRegisterMessage(
                    response.message || "Create new account successfully!"
                );
            } catch (error: any) {
                setError(error.message || "Error while creating new account.");
            } finally {
                setLoading(false);
            }
        },
        [register_account]
    );

    return (
        <>
            <Head>
                <title>Đăng ký | Hệ thống gợi ý việc làm</title>
            </Head>
            <div className="container mx-auto py-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create new user
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <Link
                                href="/auth/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Log in if you have already account
                            </Link>
                        </p>
                    </div>
                    <FormRegister submit={handleSubmit} />
                    {loading && <p className="mt-4">Loading...</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    {registerMessage && (
                        <p className="mt-4 text-green-500">{registerMessage}</p>
                    )}
                </div>
            </div>
        </>
    );
}
