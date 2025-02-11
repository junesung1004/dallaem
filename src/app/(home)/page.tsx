import Button from '@/app/_tests/Button';
import CardList from '../components/cardlist/CardList';

export default async function Home() {
	return (
		<main className='container mx-auto px-5 py-10  w-full xl:w-[996px] '>
			<Button />
			<CardList />
		</main>
	);
}
