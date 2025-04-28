import Link from "next/link";

// Hàm này sẽ nhận tham số từ URL
export default function JobDetailPage({
    params,
}: {
    params: { jobId: string };
}) {
    const { jobId } = params;

    // Trong thực tế, bạn sẽ lấy dữ liệu từ API hoặc database
    // Đây chỉ là dữ liệu mẫu
    const jobDetail = {
        id: jobId,
        title: `Job Title ${jobId}`,
        company: "Example Company",
        location: "Hà Nội, Việt Nam",
        description: "Đây là mô tả chi tiết về công việc...",
        requirements: [
            "3+ năm kinh nghiệm",
            "Thành thạo React, Next.js",
            "Kỹ năng làm việc nhóm tốt",
        ],
        salary: "Thỏa thuận",
        publishedDate: "20/04/2025",
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-4">
                <Link href="/jobs" className="text-blue-600 hover:underline">
                    &larr; Quay lại danh sách
                </Link>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-2">{jobDetail.title}</h1>
                <p className="text-lg text-gray-700 mb-4">
                    {jobDetail.company}
                </p>

                <div className="flex gap-4 text-sm text-gray-600 mb-6">
                    <div>{jobDetail.location}</div>
                    <div>Lương: {jobDetail.salary}</div>
                    <div>Đăng ngày: {jobDetail.publishedDate}</div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Mô tả công việc
                    </h2>
                    <p>{jobDetail.description}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Yêu cầu</h2>
                    <ul className="list-disc pl-5">
                        {jobDetail.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
