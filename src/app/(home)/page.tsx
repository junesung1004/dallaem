import Button from '@/app/_tests/Button';
import CardList from '../components/cardlist/CardList';
import PageInfo from '../components/PageInfo/PageInfo';
import PageNavbar from '../components/PageNav/PageNavbar';
import { CalenderImage } from '../components/Calendar/CalenderImage';

export default async function Home() {
	return (
		<div className='mx-auto px-5 sm:px-16 xl:px-0 py-10  w-full xl:w-[996px] '>
			<CalenderImage />
			{/* 함께 할 사람이 없나요? */}
			<PageInfo pageKey='meetings' />

			{/* 달램핏 nav 및 filter 및 모임 만들기기 */}
			<div className='flex relative mt-10 mb-5'>
				<PageNavbar pageKey='meetings' />
				<div className='absolute right-0'>
					<Button />
				</div>
			</div>
			<div className='border-b-2'></div>
			<CardList />
		</div>
	);
}
