"use client";

import { FormUploadMini } from "@/components/main/form-upload-mini";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

interface BaseResponse {
    isSuccess: boolean;
    errorCode: null | string | number;
    message: null | string;
    data: JobByUser[];
}
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

interface JobByUser {
    job_id: string;
    company: string;
    position_title: string;
    benefit: string;
    similarity_score: number;
}

interface GetJobByUserResponse {
    isUnauth: boolean;
    items: JobByUser[];
}

interface UserProfile {
    username: string;
    fullname: string;
    created_at: string;
    email: string;
    phone_number: string;
}

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";
const JOB_BY_USER_URL = process.env.NEXT_PUBLIC_JOB_BY_USER_URL;
const FIND_JOB_USER_URL = process.env.NEXT_PUBLIC_FIND_JOB_USER_URL;
const EXPORT_RESUME_URL = process.env.NEXT_PUBLIC_EXPORT_RESUME_URL;
const PROFILE_URL = process.env.NEXT_PUBLIC_PROFILE_URL;

const ITEM_PER_PAGE = 10;

async function fetchJobsByUser(): Promise<{
    auth: boolean;
    items: JobByUser[];
}> {
    const token = sessionStorage.getItem("access_token");
    const uri = `${DOMAIN}${JOB_BY_USER_URL}`;
    console.log(uri);

    const res = await fetch(uri, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("token:" + token);

    if (!res.ok) {
        // console.error("Failed to fetch jobs:", res);
        return { auth: false, items: [] };
    }

    const response: BaseResponse = await res.json();

    const data = response.data;

    return { auth: true, items: data };
}

async function post<T = any>(
    url: string,
    data?: any,
    token?: string | null
): Promise<Response> {
    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: data,
    });
}

async function findJobUser(resume: File | undefined): Promise<string> {
    const formData = new FormData();

    if (resume) formData.append("resume", resume);

    const uri = `${DOMAIN}${FIND_JOB_USER_URL}`;
    console.log(uri);

    const token = sessionStorage.getItem("access_token");

    const res = await post(uri, formData, token);

    if (!res.ok) {
        // console.error("Failed to fetch jobs:", res);
        return "Error while upload resume";
    }

    const response: ApiResponse = await res.json();

    if (!response.isSuccess) {
        // console.error("Failed to fetch jobs:", response.message);
    }

    const data = response.data;

    return "Upload resume successfully";
}

async function getProfile(): Promise<UserProfile> {
    const token = sessionStorage.getItem("access_token");

    var uri = DOMAIN + PROFILE_URL;

    const res = await fetch(uri, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        // console.error("Error while get user profile:", res.status);
        // alert('Đã xảy ra lỗi khi tải xuống resume.');
        // return undefined;
    }

    const response: UserProfile = await res.json();

    return response;
}

async function exportResume(): Promise<Blob | undefined> {
    const token = sessionStorage.getItem("access_token");

    const uri = DOMAIN + EXPORT_RESUME_URL;
    console.log(uri);

    const res = await fetch(uri, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        // console.error("Error while downloading resume:", res.status);
        // alert('Đã xảy ra lỗi khi tải xuống resume.');
        return;
    }

    const blob = await res.blob();
    return blob;
}

export default function Home() {
    const [jobByUser, setJobByUser] = useState<JobByUser[]>([]);
    const [auth, setAuth] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadResult, setUploadResult] = useState("");
    const [userProfile, setUserProfile] = useState<UserProfile>();

    useEffect(() => {
        async function loadJobByUser() {
            const { auth, items } = await fetchJobsByUser();
            console.log(items);
            if (!auth) {
                setAuth(false);
                setUploaded(false);
            } else if (items.length == 0) {
                setAuth(true);
                setUploaded(false);
            } else {
                setAuth(true);
                setUploaded(true);
                setJobByUser(items);
            }
        }
        async function loadUserProfile() {
            const user = await getProfile();
            console.log(user);
            setUserProfile(user);
        }
        loadUserProfile();
        loadJobByUser();
        // loadJobs();
    }, []);

    const handleDownload = async () => {
        const blob = await exportResume();
        if (!blob) {
            console.log("No data.");
            return;
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleSubmit = useCallback(async (resume: File | undefined) => {
        setLoading(true);
        setError(null);
        try {
            const result = await findJobUser(resume);
            setUploadResult(result);
            window.location.reload();
        } catch (err: any) {
            // console.error("Error matching job:", err);
            setError("Failed to fetch jobs. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container mx-auto py-8">
            {!auth && (
                <div>
                    <h1 className="text-2xl font-bold mb-6">
                        Please login and upload your profile to find matching
                        jobs with AI
                    </h1>
                    {/* <Link href="/auth/login">Log In</Link> */}
                </div>
            )}
            {auth && !uploaded && (
                <h1 className="text-2xl font-bold mb-6">
                    Please upload your resume to find matching jobs
                </h1>
            )}
            {auth && (
                <>
                    <h1 className="mt-8 text-2xl font-bold mb-6">Profile</h1>
                    <p>Username: {userProfile?.username}</p>
                    <p>Fullname: {userProfile?.fullname}</p>
                    <p>Create at: {userProfile?.created_at}</p>
                    <p>Email: {userProfile?.email}</p>
                    <p>Phone number: {userProfile?.phone_number}</p>
                    {uploaded && (
                        <>
                            <p>Your resume uploaded:</p>
                            <Button onClick={handleDownload}>Download</Button>
                        </>
                    )}

                    <FormUploadMini onUpload={handleSubmit} />
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    {uploadResult && (
                        <p className="mt-4 text-green-500">{uploadResult}</p>
                    )}
                </>
            )}
            {uploaded && (
                <div>
                    <h1 className="mt-8 text-2xl font-bold mb-6">
                        Jobs that match your profile
                    </h1>

                    <div className="mt-4 mb-4 grid gap-4">
                        {jobByUser.map((job) => (
                            <div
                                key={job.job_id}
                                className="border rounded-lg p-4 shadow-sm"
                            >
                                <h2 className="text-lg font-medium">
                                    {job.position_title}
                                </h2>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-600">{job.benefit}</p>
                                {/* <div className="mt-4">
                            <Link
                                href={`/jobs/${job.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
