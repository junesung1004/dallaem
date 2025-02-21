'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_DATA } from '../../constants/index';
import PageNavButton from './PageNavButton';
import { useFilterStore } from '@/store/useInputSelectFilterStore';

interface NavBarProps {
	pageKey: string;
	onMainClick?: (id: string) => void;
	onSubClick?: (id: string | undefined) => void;
}

function PageNavbar({ pageKey, onMainClick, onSubClick }: NavBarProps) {
	const pathname = usePathname();
	const isMyPage = pageKey === 'mypage';
	const pageNavData = NAV_DATA[pageKey];

	const { selectedFilters, setSelectedFilters } = useFilterStore();

	// ✅ 현재 활성화된 메인 메뉴 상태
	const [activeMainItem, setActiveMainItem] = useState<string>(
		pageNavData[0]?.id || '',
	);

	// ✅ 현재 경로에서 mainId와 subId 추출
	const pathSegments = pathname.split('/');
	const initialMainId = isMyPage
		? pathSegments[2] || pageNavData[0]?.id
		: pageNavData[0]?.id;
	const initialSubId = isMyPage
		? pathSegments[3]
		: pageNavData.find((item) => item.id === initialMainId)?.subItems?.[0]?.id;

	// ✅ 초기 상태 설정
	useEffect(() => {
		setActiveMainItem(initialMainId);

		// ✅ 서브 아이템이 없는 경우 mainId를 type으로 강제 설정
		if (!initialSubId) {
			setSelectedFilters({ type: initialMainId });
		} else {
			setSelectedFilters({ type: initialSubId });
		}
	}, [initialMainId, initialSubId, setSelectedFilters]);

	// ✅ 메인 버튼 클릭 핸들러
	const handleMainClick = (id: string) => {
		const selectedMainItem = pageNavData.find((item) => item.id === id);
		const firstSubItem = selectedMainItem?.subItems?.[0]?.id;

		// ✅ 서브 아이템이 없으면 무조건 mainItem을 적용
		setSelectedFilters({ type: firstSubItem ?? id });

		// ✅ 상태 업데이트 순서 최적화
		setActiveMainItem(id);

		onMainClick?.(id);
	};

	// ✅ 서브 버튼 클릭 핸들러
	const handleSubClick = (id: string) => {
		setSelectedFilters({ type: id });
		onSubClick?.(id);
	};

	// ✅ 애니메이션을 위한 활성화 버튼 추적
	const mainNavRef = useRef<(HTMLButtonElement | null)[]>([]);
	const [currentButton, setCurrentButton] = useState({ left: 0, width: 0 });

	useEffect(() => {
		const activeIndex = pageNavData.findIndex(
			(item) => item.id === activeMainItem,
		);
		const activeButton = mainNavRef.current[activeIndex];
		if (activeButton) {
			setCurrentButton({
				width: activeButton.offsetWidth,
				left: activeButton.offsetLeft,
			});
		}
	}, [activeMainItem, pageKey]);

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
						isActive={item.id === activeMainItem}
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
						width: currentButton.width,
						left: currentButton.left,
					}}
				/>
			</div>

			{/* 서브 네비게이션 */}
			{Array.isArray(
				pageNavData.find((item) => item.id === activeMainItem)?.subItems,
			) &&
				(pageNavData?.find((item) => item.id === activeMainItem)?.subItems
					?.length ?? 0) > 0 && (
					<div className='relative overflow-hidden mt-2 whitespace-nowrap'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={activeMainItem}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
							>
								{(
									pageNavData.find((item) => item.id === activeMainItem)
										?.subItems ?? []
								).map((subItem) => (
									<PageNavButton
										key={subItem.id}
										id={subItem.id}
										label={subItem.label}
										isActive={subItem.id === selectedFilters.type}
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
