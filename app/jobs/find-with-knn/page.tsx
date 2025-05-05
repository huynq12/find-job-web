"use client";
import { FormUpload } from "@/components/main/form-upload";
import { useCallback, useState } from "react";
interface ApiResponse {
    isSuccess: boolean;
    errorCode: null | string | number;
    data: JobItem[];
    message: null | string;
}
interface JobItem {
    id: string;
    company: string;
    position_title: string;
    benefit: string;
    similarity_score: number;
}

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";

const MATCH_JOB_KNN = process.env.NEXT_PUBLIC_MATCH_JOB_KNN;

async function post<T = any>(url: string, data?: any): Promise<Response> {
    return fetch(url, {
        method: "POST",
        headers: {},
        body: data,
    });
}

async function matchJob(
    k: string,
    resume: File | undefined
): Promise<JobItem[]> {
    const formData = new FormData();

    formData.append("k", k);

    if (resume) formData.append("resume", resume);

    const uri = `${DOMAIN}${MATCH_JOB_KNN}`;
    console.log(uri);

    const res = await post(uri, formData);

    if (!res.ok) {
        console.error("Failed to fetch jobs:", res);
        return [];
    }

    const response: ApiResponse = await res.json();

    if (!response.isSuccess) {
        console.error("Failed to fetch jobs:", response.message);
    }

    const data = response.data;

    return data;
}

export default function FindWithKnn() {
    const [jobList, setJobList] = useState<JobItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(
        async (k: string, resume: File | undefined) => {
            setLoading(true);
            setError(null);
            try {
                const result = await matchJob(k, resume);
                console.log(result.length);
                setJobList(result);
            } catch (err: any) {
                console.error("Error matching job:", err);
                setError("Failed to fetch jobs. Please try again.");
                setJobList([]);
            } finally {
                setLoading(false);
            }
        },
        []
    );
    return (
        <div className="container mx-auto py-8">
            <FormUpload onUpload={handleSubmit} />
            <div className="mt-4 mb-4 grid gap-4">
                {!loading &&
                    jobList.map((job) => (
                        <div
                            key={job.id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <h2 className="text-lg font-medium">
                                {job.position_title}
                            </h2>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-gray-600">{job.benefit}</p>
                            <h3 className="text-gray-600">
                                {job.similarity_score.toFixed(3)}
                            </h3>
                            <div className="mt-4">
                                {/* <Link
                                href={`/jobs/${job.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link> */}
                            </div>
                        </div>
                    ))}
                {loading && (
                    <p className="mt-4 text-center text-gray-500">Loading...</p>
                )}
                {jobList.length === 0 && !loading && !error && (
                    <p className="mt-4 text-center text-gray-500">No result.</p>
                )}
            </div>
        </div>
    );
}
