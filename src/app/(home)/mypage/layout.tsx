import { IUser } from '@/types/userType';
import MyPageNav from './components/MyPageNav/MyPageNav';
import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import { cookies } from 'next/headers';
import { BASE_URL } from '@/constants';

type Props = {
	children: React.ReactNode;
	review: React.ReactNode;
	profile: React.ReactNode;
};

async function MyPageLayout({ children, review, profile }: Props) {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	const userInfoRes = await fetch(`${BASE_URL}/auths/user`, {
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	});

	if (!userInfoRes?.ok) return new Error('invalid token');
	const userInfo: IUser = await userInfoRes.json();

	return (
		<section className='mt-6 flex flex-col gap-5 md:max-w-[996px] mx-auto min-h-screen'>
			<h2 className='text-2xl font-semibold'>마이 페이지</h2>
			<ProfileHeader initialPropfile={userInfo} />
			<div className='border-t-2 border-gray-900 px-4 py-6 bg-white'>
				<MyPageNav />
				{children}
				{review}
				{profile}
			</div>
		</section>
	);
}

export default MyPageLayout;
