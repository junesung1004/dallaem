import React from "react";

type Props = {
  children: React.ReactNode;
  createmodal: React.ReactNode;
};

export default function Layout({ children, createmodal }: Props) {
  return (
    <main className=" md:w-[744px] lg:w-[996px] min-h-screen mx-auto bg-white">
      {createmodal}
      {children}
    </main>
  );
}
