import { getAttendee } from '@/api/getAttendee';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface AttendeeProfilesInterface {
	meetingId: number;
	imgSize?: number;
}

const AttendeeProfiles = ({
	meetingId,
	imgSize = 28,
}: AttendeeProfilesInterface) => {
	const maxProfiles = 4;
	const [profiles, setProfiles] = useState(['1', '2', '3', '4', '5', '6']);

	if (profiles.length > 4) {
		//초과하는 수만큼 숫자로 표시한다
	}
	//추후 DB 연동
	useEffect(() => {}, []); //첫 마운트 시에만 실행
	return (
		<div className='h-full w-full flex justify-center items-center space-x-[-10px]'>
			{/* 프로필 사진을 4개까지 렌더링 */}
			{profiles.slice(0, maxProfiles).map((value, index) => (
				<Image
					key={index}
					width={imgSize}
					height={imgSize}
					src='/icons/profileDefault.svg'
					alt={`profile-${index}`}
				/>
			))}
			{/* 4개 초과시 숫자로 표시 */}
			{profiles.length > maxProfiles && (
				<div className={`relative w-${imgSize} h-${imgSize}`}>
					<Image
						width={imgSize}
						height={imgSize}
						src='/icons/profileDefault.svg'
						alt='profiles-over4'
					/>
					<span className='absolute inset-0 flex items-center justify-center text-xs'>
						+{profiles.length - maxProfiles}
					</span>
				</div>
			)}
		</div>
	);
};

export { AttendeeProfiles };
