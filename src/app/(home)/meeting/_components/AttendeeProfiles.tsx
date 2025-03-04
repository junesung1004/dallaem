'use client';
import { getMeetingAttendee } from '@/api/meeting/getMeetingAttendee';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MeetingAttendee } from '@/types/userType';

interface AttendeeProfilesProps {
	gatheringId: number;
	imgSize?: number;
	participantCount: number;
}

const AttendeeProfiles = ({
	participantCount,
	gatheringId,
	imgSize = 29,
}: AttendeeProfilesProps) => {
	const maxProfiles = 4;
	const [profiles, setProfiles] = useState<string[]>([]);

	useEffect(() => {
		const fetchAttendees = async () => {
			try {
				const res: MeetingAttendee[] = await getMeetingAttendee(gatheringId);
				const images = res.map((item) =>
					item.User.image && item.User.image.trim() !== ''
						? item.User.image
						: '/icons/profileDefault.svg',
				);
				setProfiles(images);
			} catch (error) {
				console.error('Error fetching meeting attendees:', error);
			}
		};

		fetchAttendees();
	}, [participantCount]);

	return (
		<div className='h-full w-full flex justify-center items-center space-x-[-10px]'>
			{/* 프로필 사진을 4개까지 렌더링 */}
			{profiles.slice(0, maxProfiles).map((value, index) => (
				<div
					key={index}
					className={`relative w-${imgSize} h-${imgSize}`}
					style={{
						width: imgSize,
						height: imgSize,
						backgroundImage: `url(/icons/profileDefault.svg)`,
						backgroundSize: 'cover', // 이미지가 div에 꽉 차도록
						backgroundPosition: 'center', // 이미지가 중앙에 위치하도록
						borderRadius: '50%', // 원형으로 만들기 (프로필 이미지 효과)
					}}
				>
					<Image
						key={index}
						src={value ? value : '/icons/profileDefault.svg'}
						alt={`profile-${index}`}
						priority
						fill
						className='object-cover rounded-full overflow-hidden'
					/>
				</div>
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
					<span className='absolute inset-0 flex items-center justify-center text-[14px] font-semibold'>
						+{profiles.length - maxProfiles}
					</span>
				</div>
			)}
		</div>
	);
};

export { AttendeeProfiles };
