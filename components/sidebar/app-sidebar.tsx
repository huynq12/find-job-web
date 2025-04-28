"use client";

import {
    AtomIcon,
    CameraIcon,
    ClipboardListIcon,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    HelpCircleIcon,
    HomeIcon,
    ListIcon,
    SearchIcon,
    SettingsIcon,
} from "lucide-react";
import * as React from "react";

// import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/sidebar/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "#",
            icon: HomeIcon,
        },
        {
            title: "Jobs",
            url: "/jobs",
            icon: ListIcon,
        },
        {
            title: "Find Job With AI",
            url: "/find-with-ai",
            icon: AtomIcon,
        },
        // {
        //     title: "Projects",
        //     url: "#",
        //     icon: FolderIcon,
        // },
        // {
        //     title: "Team",
        //     url: "#",
        //     icon: UsersIcon,
        // },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: CameraIcon,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: FileTextIcon,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: FileCodeIcon,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            title: "Search",
            url: "#",
            icon: SearchIcon,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: DatabaseIcon,
        },
        {
            name: "Reports",
            url: "#",
            icon: ClipboardListIcon,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: FileIcon,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                {/* <ArrowUpCircleIcon className="h-5 w-5" /> */}
                                <span className="text-base font-bold">
                                    Job Hunter
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
        </Sidebar>
    );
}
