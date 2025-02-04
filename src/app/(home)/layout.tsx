import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="md:w-[744px] lg:w-[996px] min-h-screen mx-auto bg-white pt-10">{children}</main>;
}
