import PageInfo from '@/components/PageInfo/PageInfo';

type Props = {
	children: React.ReactNode;
};

function FavoriteMeetingLayout({ children }: Props) {
	return (
		<section className='flex flex-col gap-8 md:max-w-[996px] mx-auto'>
			<PageInfo pageKey='saved' />
			{children}
		</section>
	);
}

export default FavoriteMeetingLayout;
