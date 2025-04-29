import React from "react";

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="w-full max-w-4xl mx-auto">{children}</main>;
}
