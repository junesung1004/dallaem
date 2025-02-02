import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col justify-center w-full h-[60px] mx-auto p-2 sm:p-10 bg-orange-600 border-black border-b-2">
      <nav className="md:mx-auto md:w-[744px] gap-4 lg:w-[996px] flex justify-between text-sm md:text-base lg:text-lg text-white">
        <ul className="flex gap-6 sm:gap-4 lg:gap-5">
          <li>
            <Link href={"/"}>같이 달램</Link>
          </li>
          <li>
            <Link href={"/"}>모임 찾기</Link>
          </li>
          <li>
            <Link href={"/favorite-meetings"}>찜한 모임</Link>
          </li>
          <li>
            <Link href={"/all-reviews"}>모든 리뷰</Link>
          </li>
        </ul>

        <ul className="flex">
          <li>
            <Link href={"/auth/login"}>로그인</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
