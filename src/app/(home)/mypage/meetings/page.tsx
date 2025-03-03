import CardList from '../components/CardList/CardList';

function Page() {
	return (
		<div className='flex min-h-[436px] md:min-h-[744px] lg:min-h-[832px]'>
			<CardList cardType='joined' pageKey='joined' />
		</div>
	);
}

export default Page;
