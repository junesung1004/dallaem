import Button from '@/app/_tests/Button';

import CardList from '../components/CardList/CardList';

export default async function Home() {
	return (
		<main className="container mx-auto px-5  w-full xl:w-[996px] ">
			<p className="font-bold text-4xl pb-10">모임찾기 home page!!</p>
			<Button />
			<CardList />
		</main>
	);
}
