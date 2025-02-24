import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import Image from 'next/image';

function ProfileInput({
	image,
	onImageChange,
}: {
	image: string;
	onImageChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
	const [preview, setPreview] = useState<string | null | FileReader['result']>(
		image,
	);

	useEffect(() => {
		setPreview(preview);
	}, [image]);

	/** input 변경될 때 미리보기 썸네일 url 을 생성하여 반환하는 함수 */
	const getPreview = (file: File) => {
		const reader = new FileReader();

		return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
			reader.onload = function () {
				resolve(reader.result); // 성공 시 결과 반환
			};

			reader.onerror = function (error) {
				reject(error); // 에러 발생 시 reject
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		});
	};

	/** change handler */
	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget?.files?.[0];

		if (file) {
			const previewSrc = await getPreview(file);

			setPreview(previewSrc);
		} else {
			setPreview(null);
		}

		// form valid 검사를 위한 연결
		if (typeof onImageChange === 'function') {
			onImageChange(e);
		}
	};
	return (
		<div>
			<label htmlFor='profile-file' className='cursor-pointer inline-block'>
				{!preview && <ProfileIcon.EditProfile />}
				{!!preview && (
					<div className='relative rounded-full max-w-[56px] min-w-[56px] min-h-[56px] overflow-hidden'>
						<Image
							src={preview as string}
							alt='프로필 사진'
							fill
							className='object-cover'
						/>
					</div>
				)}
			</label>
			<input
				type='file'
				id='profile-file'
				className='hidden'
				onChange={handleChangeImage}
				accept='imge/*'
				name='image'
			/>
		</div>
	);
}

export default ProfileInput;
