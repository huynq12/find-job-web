import React from "react";

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main>{children}</main>;
}
