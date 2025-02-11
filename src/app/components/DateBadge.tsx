import React from 'react';
import { DateBadgeProps } from '../types/dateType';

const formatDate = (isoString: string): string => {
	const registrationEnd = new Date(isoString);
	const month = registrationEnd.getMonth() + 1;
	const day = registrationEnd.getDate();
	return `${month}월 ${day}일`;
};

export const DateBadge: React.FC<DateBadgeProps> = ({ registrationEnd }) => {
	return (
		<div className="bg-[#111827] text-white px-2 py-1 rounded-md text-xs w-[60px]">
			{formatDate(registrationEnd)}
		</div>
	);
};
