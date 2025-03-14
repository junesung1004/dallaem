import PageInfo from '@/components/PageInfo/PageInfo';
import PageNavbar from '@/components/PageNav/PageNavbar';
import FilterProvider from '@/context/FilterContent';

type Props = {
	children: React.ReactNode;
};

function FavoriteMeetingLayout({ children }: Props) {
	return (
		<section className='mt-6 flex flex-col gap-5 md:max-w-[996px] mx-auto min-h-screen'>
			<PageInfo pageKey='saved' />
			<FilterProvider>
				<PageNavbar pageKey='meetings' />
				<div>{children}</div>
			</FilterProvider>
		</section>
	);
}

export default FavoriteMeetingLayout;
