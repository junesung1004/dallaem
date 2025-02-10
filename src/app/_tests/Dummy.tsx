'use client';
import Link from 'next/link';
import { dummyData } from '../lib/dummy';

export default function Dummy() {
	// console.log(dummyData);
	return (
		<article className="mt-10 flex flex-wrap justify-center container w-full h-full mx-auto gap-6">
			{dummyData &&
				dummyData.length > 0 &&
				dummyData.map((el) => (
					<Link href={`/meeting/${el.id}`} key={el.id}>
						<div className="p-10 w-[250px] flex flex-col gap-2 mx-auto border-2 rounded-3xl">
							<h1>이름 : {el.title}</h1>
							<p>역할 : {el.role}</p>
						</div>
					</Link>
				))}
		</article>
	);
}
