"use client";

import { FormSearch } from "@/components/main/form-search";
import { JobListPagination } from "@/components/main/job-list-pagination";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ApiResponse {
    isSuccess: boolean;
    errorCode: null | string | number;
    data: JobData;
    message: null | string;
}
interface JobData {
    totalCount: number;
    items: JobItem[];
}
interface JobItem {
    id: string;
    company: string;
    position_title: string;
    benefit: string;
}

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";
const LIST_JOB_URL = process.env.NEXT_PUBLIC_LIST_JOB_URL;

const ITEM_PER_PAGE = 10;

async function fetchJobs(
    filter: string = "",
    skip: number = 0,
    take: number = ITEM_PER_PAGE
): Promise<{ totalCount: number; items: JobItem[] }> {
    const searchParams = new URLSearchParams();
    if (filter) {
        searchParams.append("filter", filter);
    }
    searchParams.append("skip", String(skip));
    searchParams.append("take", String(take));

    const uri = `${DOMAIN}${LIST_JOB_URL}?${searchParams.toString()}`;
    console.log(uri);

    const res = await fetch(uri);

    if (!res.ok) {
        console.error("Failed to fetch jobs:", res);
        return { items: [], totalCount: 0 };
    }

    const response: ApiResponse = await res.json();

    if (!response.isSuccess) {
        console.error("Failed to fetch jobs:", response.message);
    }

    const data = response.data;

    return { items: data?.items || [], totalCount: data?.totalCount || 0 };
}

export default function JobsPage() {
    const [jobList, setJobList] = useState<JobItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);

    const handleSearch = useCallback((filter: string) => {
        setSearchTerm(filter);
        setCurrentPage(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        async function loadJobs() {
            const skip = (currentPage - 1) * ITEM_PER_PAGE;
            const { items, totalCount } = await fetchJobs(searchTerm, skip);
            setJobList(items);
            setTotalJobs(totalCount);
        }
        loadJobs();
    }, [searchTerm, currentPage]);

    const totalPages = Math.ceil(totalJobs / ITEM_PER_PAGE);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Danh sách công việc</h1>

            <FormSearch onSearch={handleSearch} />
            <div className="grid gap-4">
                {jobList.map((job) => (
                    <div
                        key={job.id}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <h2 className="text-lg font-medium">
                            {job.position_title}
                        </h2>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-600">{job.benefit}</p>
                        <div className="mt-4">
                            <Link
                                href={`/jobs/${job.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <JobListPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
