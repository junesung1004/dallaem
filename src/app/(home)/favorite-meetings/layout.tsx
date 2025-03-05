import PageInfo from '@/components/PageInfo/PageInfo';
import PageNavbar from '@/components/PageNav/PageNavbar';
import FilterProvider from '@/context/FilterContent';

type Props = {
	children: React.ReactNode;
};

function FavoriteMeetingLayout({ children }: Props) {
	return (
		<section className='flex flex-col gap-8 md:max-w-[996px] mx-auto'>
			<PageInfo pageKey='saved' />
			<FilterProvider>
				<PageNavbar pageKey='meetings' />
				<div className='-mt-[1rem] border-t-2 border-solid border-gray-200'>
					{children}
				</div>
			</FilterProvider>
		</section>
	);
}

export default FavoriteMeetingLayout;
