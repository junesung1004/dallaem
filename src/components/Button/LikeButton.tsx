import { useLike } from '../../hooks/customs/useLike';
import { LikeButtonProps } from '../../types/likeButtonType';
import Image from 'next/image';

export const LikeButton = ({ itemId }: LikeButtonProps) => {
	const { isLiked, toggleLike } = useLike(itemId);

	return (
		<button onClick={toggleLike} className='flex items-center justify-center'>
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
		</button>
	);
};
