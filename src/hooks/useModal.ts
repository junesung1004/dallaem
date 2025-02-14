// useModal 을 하면 중첩인지 아닌지 반환 값이 있음
// or stack 을 보내줌

import { useEffect, useState } from 'react';

const useModal = () => {
	// 모달이 중첩인지 아닌지 확인하기
	const [isNested, setIsNested] = useState(false);

	useEffect(() => {}, [isNested]);
	return { isNested, setIsNested };
};

export { useModal };
