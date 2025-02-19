import MyPageNav from './components/MyPageNav/MyPageNav';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';

type Props = {
	children: React.ReactNode;
	review: React.ReactNode;
	profile: React.ReactNode;
};

function MyPageLayout({ children, review, profile }: Props) {
	return (
		<section className='mt-6 flex flex-col gap-5 md:max-w-[996px] mx-auto min-h-screen'>
			<h2 className='text-2xl font-semibold'>마이 페이지</h2>
			<ProfileHeader />
			<div className='border-t-2 border-gray-900'>
				<MyPageNav />
				{children}
				{review}
				{profile}
			</div>
		</section>
	);
}

export default MyPageLayout;
