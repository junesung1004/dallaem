import CardList from '../components/CardList/CardList';

function Page() {
	return (
		<div className='flex min-h-[380px] md:min-h-[688px] lg:min-h-[617px]'>
			<CardList cardType='joined' pageKey='review' />
		</div>
	);
}

export default Page;
