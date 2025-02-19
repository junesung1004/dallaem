import Button from '@/app/(home)/_components/Button';

import CardList from '@/components/MainCard/CardList';

import PageInfo from '@/components/PageInfo/PageInfo';
import PageNavbar from '@/components/PageNav/PageNavbar';
import HomeFilter from './_components/HomeFilter';

export default async function Home() {
	return (
		<div className='flex flex-col gap-5'>
			{/* 함께 할 사람이 없나요? */}
			<PageInfo pageKey='meetings' />

			{/* 필터 드롭다운 메뉴  */}
			<HomeFilter />

			{/* 달램핏 nav 및 filter 및 모임 만들기 */}
			<div className='flex relative mt-10 mb-5'>
				<PageNavbar pageKey='meetings' />
				<div className='absolute right-0'>
					<Button text='모임 만들기' />
				</div>
			</div>

			{/* 보더 콘테이너 */}
			<div className='border-b-2'></div>

			{/* 모임 목록 */}
			<CardList />
		</div>
	);
}
