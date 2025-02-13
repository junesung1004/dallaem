'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_DATA } from '../../../../constants/index';
import PageNavButton from './PageNavButton';

interface NavBarProps {
	pageKey: string;
	onMainClick?: (id: string) => void;
	onSubClick?: (id: string) => void;
}

function PageNavbar({ pageKey, onMainClick, onSubClick }: NavBarProps) {
	const pathname = usePathname();
	const isMyPage = pageKey === 'mypage';
	const pageNavData = NAV_DATA[pageKey];

	// 현재 경로에서 mainId와 subId 추출 (mypage일 경우)
	const pathSegments = pathname.split('/');
	const initialMainId = isMyPage
		? pathSegments[2] || pageNavData[0]?.id
		: pageNavData[0]?.id;
	const initialSubId = isMyPage ? pathSegments[3] : undefined;

	// 내부 상태로 관리
	const [activeMainId, setActiveMainId] = useState(initialMainId);
	const [activeSubId, setActiveSubId] = useState(initialSubId);

	const activeMainItem =
		pageNavData.find((item) => item.id === activeMainId) || pageNavData[0];

	const handleMainClick = (id: string) => {
		setActiveMainId(id);
		const selectedMainItem = pageNavData.find((item) => item.id === id);
		const firstSubItem = selectedMainItem?.subItems?.[0]?.id || undefined;
		setActiveSubId(firstSubItem);

		// 외부에서 라우팅 처리를 원하면 실행
		onMainClick?.(id);
	};

	const handleSubClick = (id: string) => {
		setActiveSubId(id);
		onSubClick?.(id);
	};

	// 애니메이션을 위한 활성화 버튼 추적
	const mainNavRef = useRef<(HTMLButtonElement | null)[]>([]);
	const [CurrentButton, setCurrentButton] = useState({ left: 0, width: 0 });

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
						variant='main'
						ref={(el) => {
							mainNavRef.current[index] = el;
						}}
					/>
				))}
				{/* 메인 버튼 애니메이션 */}
				<motion.div
					className='absolute bottom-1 h-[2px] bg-black rounded-full'
					animate={{
						width: CurrentButton.width,
						left: CurrentButton.left,
					}}
				/>
			</div>

			{/* 서브 네비게이션 */}
			{Array.isArray(activeMainItem?.subItems) &&
				activeMainItem.subItems.length > 0 && (
					<div className='relative overflow-hidden mt-2 whitespace-nowrap'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={activeMainId}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
							>
								{(activeMainItem?.subItems ?? []).map((subItem) => (
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
						</AnimatePresence>
					</div>
				)}
		</div>
	);
}

export default PageNavbar;
