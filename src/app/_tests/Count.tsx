"use client";

import React from "react";
import { useCount } from "../store/useCount";

export default function Count() {
  const { count, increase, decrease } = useCount();
  return (
    <div className="flex flex-col gap-5">
      <h1>Count : {count}</h1>
      <button className="py-2 px-10 border-2" onClick={increase}>
        + 버튼
      </button>
      <button className="py-2 px-10 border-2" onClick={decrease}>
        - 버튼
      </button>
    </div>
  );
}
