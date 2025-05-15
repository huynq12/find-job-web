import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="w-full max-w-4xl mx-auto">{children}</main>;
}
