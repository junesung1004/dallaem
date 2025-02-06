"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Button() {
  const router = useRouter();
  return (
    <div className="flex justify-end pr-10">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => router.push("/createmodal")}>
        모임 만들기
      </button>
    </div>
  );
}
