import { useLike } from '../../hooks/customs/useLike';
import { LikeButtonProps } from '../../types/likeButtonType';
import Image from 'next/image';

export const LikeButton = ({ itemId, registrationEnd }: LikeButtonProps) => {
	const { isLiked, toggleLike } = useLike(itemId);

	return (
		<button
			onClick={toggleLike}
			className={
				registrationEnd
					? `absolute bottom-[70px] left-1/2 transform -translate-x-1/2 md:top-4 md:right-4 md:left-auto md:bottom-auto`
					: `flex items-center justify-center`
			}
		>
			{/* md 이하에서 표시 (discardText) */}
			{registrationEnd && (
				<div className='md:hidden w-[116px] h-[36px]'>
					<Image
						src='/icons/discard/discardText.png'
						alt='Discard Text'
						width={116}
						height={36}
					/>
				</div>
			)}

			{/* md 이상에서 표시 (discardImg) */}
			{registrationEnd && (
				<div className='hidden md:block w-[34px] h-[34px]'>
					<Image
						src='/icons/discard/discardImg.png'
						alt='Discard Image'
						width={34}
						height={34}
					/>
				</div>
			)}

			{/* registrationEnd가 false일 때 (기본 좋아요 버튼) */}
			{!registrationEnd && (
				<div className='p-1 rounded-full border-2 border-gray-200'>
					<Image
						src={
							isLiked
								? '/icons/heart/heartActive.png'
								: '/icons/heart/heartDefault.png'
						}
						alt={isLiked ? 'Liked' : 'Not Liked'}
						width={24}
						height={24}
						className='rounded-full'
					/>
				</div>
			)}
		</button>
	);
};
