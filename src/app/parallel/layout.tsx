import React from "react";

export default function layout({ children, createmodal }: { children: React.ReactNode; createmodal: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen mx-auto bg-black bg-opacity-20">
      {children}
      {createmodal}
    </div>
  );
}
