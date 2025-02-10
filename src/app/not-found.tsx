import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="text-lg mt-4">잘못된 경로로 이동하셨거나 페이지가 존재하지 않습니다.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md">
        홈으로 가기
      </Link>
    </div>
  );
}
