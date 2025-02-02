import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <main className="w-[376px] md:w-[744px] lg:w-[996px] min-h-screen mx-auto bg-white pt-10">{children}</main>;
}
