'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_DATA } from '../../constants/index';
import PageNavButton from './PageNavButton';
import { useFilter } from '@/hooks/customs/useFilter';

interface NavBarProps {
	pageKey: string;
	onMainClick?: (id: string) => void;
	onSubClick?: (id: string | undefined) => void;
}

function PageNavbar({ pageKey, onMainClick, onSubClick }: NavBarProps) {
	const pathname = usePathname();
	const isMyPage = pageKey === 'mypage';
	const pageNavData = NAV_DATA[pageKey];

	// 실제 데이터 state
	const { type, setType } = useFilter();
	const [selectedType, setSelectedType] = useState(
		type || NAV_DATA[pageKey][0].id,
	);

	// UI 관련 state(애니메이션)
	const [activeMainItem, setActiveMainItem] = useState<string>(
		pageNavData[0]?.id || '',
	);

	const pathSegments = pathname.split('/');
	const initialMainId = isMyPage
		? pathSegments[2] || pageNavData[0]?.id
		: pageNavData[0]?.id;
	const initialSubId = isMyPage
		? pathSegments[3]
		: pageNavData.find((item) => item.id === initialMainId)?.subItems?.[0]?.id;

	// 초기 상태 설정
	useEffect(() => {
		setActiveMainItem(initialMainId);
		const newType = initialSubId ? initialSubId : initialMainId;
		setSelectedType(newType);
		setType(newType);
	}, [initialMainId, initialSubId]);

	const handleMainClick = (id: string) => {
		const selectedMainItem = pageNavData.find((item) => item.id === id);
		const firstSubItem = selectedMainItem?.subItems?.[0]?.id;

		// 서브 아이템이 없으면 mainItem을 적용
		setSelectedType(firstSubItem ?? id);
		setType(firstSubItem ?? id);

		setActiveMainItem(id);
		onMainClick?.(id);
	};

	const handleSubClick = (id: string) => {
		setSelectedType(id);
		setType(id);
		onSubClick?.(id);
	};

	// 애니메이션을 위한 활성화 버튼 추적
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
										isActive={subItem.id === selectedType}
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
