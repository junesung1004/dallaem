import Button from '@/app/_tests/Button';
import CardList from '../components/cardlist/CardList';
import { Calender } from '../components/Calendar/Calender';
import { CalenderTime } from '../components/Calendar/CalenderTime';

export default async function Home() {
	return (
		<main className='container mx-auto px-5 py-10  w-full xl:w-[996px] '>
			<Button />
			<Calender />
			<CalenderTime />
			<CardList />
		</main>
	);
}
