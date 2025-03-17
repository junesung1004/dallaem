'use client';

import PageNavbar from '@/components/PageNav/PageNavbarCustom';
import { useRouter } from 'next/navigation';

function MyPageNav() {
	const router = useRouter();

	const navigate = (path: string) => {
		router.push(`/mypage/${path}`);
	};

	const handleMainClick = (id: string) => navigate(id);
	const handleSubClick = (id?: string) => navigate(`reviews/${id}`);

	return (
		<PageNavbar
			pageKey='mypage'
			onMainClick={handleMainClick}
			onSubClick={handleSubClick}
		/>
	);
}

export default MyPageNav;
