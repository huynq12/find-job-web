"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mainSideUrl: { title: string; href: string }[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Jobs",
        href: "/jobs",
    },
];
const components: {
    title: string;
    href: string;
    description: string;
}[] = [
    {
        title: "Find with KNN",
        href: "/jobs/find-with-knn",
        description: "Upload your CV and find with KNN model",
    },
    {
        title: "Find with BERT",
        href: "/jobs/find-with-bert",
        description: "Use deep learning to help you find suitable job",
    },
];
export function NavigationMenuApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const handleLogoutClick = () => {
        sessionStorage.removeItem("access_token");
        setIsLoggedIn(false);
        setTimeout(() => {
            router.push("/");
        }, 500);
        window.location.reload();
        console.log("trigger");
    };
    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, [pathname]);
    return (
        <div className="mt-4">
            <NavigationMenu>
                <NavigationMenuList>
                    {mainSideUrl.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                                href={item.href}
                                className={navigationMenuTriggerStyle()}
                            >
                                {item.title}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Find job with AI
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {!isLoggedIn && (
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                href="/auth/login"
                                className={navigationMenuTriggerStyle()}
                            >
                                Login
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )}
                    {isLoggedIn && (
                        <NavigationMenuItem>
                            <button
                                className="text-sm rounded-md p-3 font-medium leading-none hover:bg-accent"
                                type="submit"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
