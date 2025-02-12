'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_DATA } from '../../../../constants/index';
import PageNavButton from './PageNavButton';

interface NavBarProps {
	pageKey: string;
}

const PageNavbar = ({ pageKey }: NavBarProps) => {
	const pathname = usePathname();
	const isMyPage = pageKey === 'mypage';
	const [currentPath, setCurrentPath] = useState('');

	const [stateMainId, setStateMainId] = useState(NAV_DATA[pageKey][0].id);
	const [stateSubId, setStateSubId] = useState('all');

	const activeMainId = isMyPage
		? currentPath.split('/')[2] || 'myMeetings'
		: stateMainId;
	const activeSubId = isMyPage ? null : stateSubId;

	const handleMainClick = (id: string) => {
		if (isMyPage) return;
		setStateMainId(id);
		setStateSubId('all');
	};

	const handleSubClick = (id: string) => {
		if (isMyPage) return;
		setStateSubId(id);
	};

	const pageNavData = NAV_DATA[pageKey];
	const activeMainItem = pageNavData.find((item) => item.id === activeMainId);

	// 버튼 너비 추적을 위한 ref
	const mainNavRef = useRef<(HTMLButtonElement | null)[]>([]);
	const [CurrentButton, setCurrentButton] = useState({ left: 0, width: 0 });

	// 활성화 버튼 추적
	useEffect(() => {
		const activeIndex = pageNavData.findIndex(
			(item) => item.id === activeMainId,
		);
		const activeButton = mainNavRef.current[activeIndex];
		if (activeButton) {
			setCurrentButton({
				width: activeButton.offsetWidth,
				left: activeButton.offsetLeft,
			});
		}
	}, [activeMainId, pageKey]);

	useEffect(() => {
		setCurrentPath(pathname);
	}, [pathname]);

	return (
		<div className='flex flex-col relative'>
			{/* 메인 네비게이션 */}
			<div className='flex relative'>
				{pageNavData.map((item, index) => (
					<PageNavButton
						key={item.id}
						id={item.id}
						label={item.label}
						icon={item.icon}
						isActive={item.id === activeMainId}
						onClick={() => handleMainClick(item.id)}
						href={isMyPage ? `/mypage/${item.id}` : undefined}
						variant='main'
						ref={(el) => {
							mainNavRef.current[index] = el;
						}}
					/>
				))}
				{/* 메인 버튼 애니메이션 */}
				<motion.div
					className='absolute bottom-0 h-[2px] bg-black rounded-full'
					animate={{
						width: CurrentButton.width,
						left: CurrentButton.left,
					}}
				/>
			</div>
			{/* 서브 네이비게이션 (마이페이지를 제외한 페이지에서 사용) */}
			{!isMyPage && (
				<div className='relative overflow-hidden mt-4'>
					<AnimatePresence mode='wait'>
						{activeMainItem?.subItems && activeMainItem.subItems.length > 0 && (
							// 서브 버튼 애니메이션
							<motion.div
								key={activeMainId}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
							>
								{activeMainItem.subItems.map((subItem) => (
									<PageNavButton
										key={subItem.id}
										id={subItem.id}
										label={subItem.label}
										isActive={subItem.id === activeSubId}
										onClick={() => handleSubClick(subItem.id)}
										variant='sub'
									/>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
};

export default PageNavbar;
