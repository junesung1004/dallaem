import Button from '@/app/_tests/Button';
import ServiceSelector from '@/app/_tests/Service';
import { CalenderTime } from '@/app/components/Calendar/CalenderTime';
import { InputWindow } from '@/app/components/InputWindow';
import React, { useState } from 'react';

export default function CreateMeetingForm() {
	const [meetingName, setMeetingName] = useState('');
	const [meetingPlace, setMeetingPlace] = useState('');
	const [meetingImage, setMeetingImage] = useState('');
	const [meetingPeople, setMeetingPeople] = useState('');

	// 모임 이름
	const meetingNameTextChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMeetingName(e.target.value);
	};

	//모임 장소
	const meetingPlaceTextChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMeetingPlace(e.target.value);
	};

	//모임 이미지
	const meetingImageTextChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files && e.target.files.length > 0) {
			setMeetingImage(e.target.files[0].name);
		}
	};

	//미팅 정원 인원수수
	const meetingPeopleTextChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMeetingPeople(e.target.value);
	};

	return (
		<form
			action={'#'}
			method='post'
			className='flex flex-col'
			encType='multipart/form-data'
		>
			<h1 className='font-semibold text-lg mb-6'>모임 만들기</h1>

			{/* 모임 이름 */}
			<div>
				<label className='font-semibold' htmlFor='meeting-name'>
					모임 이름
				</label>
				<InputWindow
					placeholderText='모임 이름을 작성해주세요'
					onChange={(e) => meetingNameTextChangeHandler(e)}
					value={meetingName}
					id='meeting-name'
				/>
			</div>

			{/* 모임 장소 */}
			<div>
				<label className='font-semibold' htmlFor='meeting-place'>
					장소
				</label>
				<InputWindow
					placeholderText='장소를 선택해주세요'
					onChange={(e) => meetingPlaceTextChangeHandler(e)}
					value={meetingPlace}
					id='meeting-place'
				/>
			</div>

			{/* 모임 이미지 */}
			<div>
				<label className='font-semibold' htmlFor='meeting-image'>
					이미지
				</label>
				<div className='flex items-center'>
					<div
						onClick={() => document.getElementById('meeting-image')?.click()}
					>
						<InputWindow
							placeholderText='이미지를 첨부해주세요'
							onChange={(e) => meetingImageTextChangeHandler(e)}
							value={meetingImage}
							id='meeting-image'
						/>
					</div>

					<div
						onClick={() => document.getElementById('picture')?.click()}
						className='flex items-center font-medium justify-center  ml-4 w-[100px] h-[40px] border rounded-xl text-orange-500 border-orange-500 cursor-pointer'
					>
						파일 찾기
						<input
							type='file'
							id='picture'
							name='picture'
							accept='image/*'
							className='hidden'
							onChange={meetingImageTextChangeHandler}
						/>
					</div>
				</div>
			</div>

			{/* 선택 서비스 */}
			<div className='mb-5'>
				<ServiceSelector />
			</div>

			{/* 모임 날짜 */}
			<div className='flex flex-col gap-2 mb-5'>
				<label className='font-semibold' htmlFor='meeting-date'>
					모임 날짜
				</label>
				<CalenderTime />
			</div>

			{/* 모임 마감 종료 날짜 */}
			<div className='flex flex-col gap-2 mb-5'>
				<label className='font-semibold' htmlFor='meeting-name'>
					마감 날짜
				</label>
				<CalenderTime />
			</div>

			{/* 모집 정원 */}
			<div className='mb-5'>
				<label className='font-semibold' htmlFor='meeting-available-people'>
					모집 정원
				</label>
				<InputWindow
					placeholderText='최소 5인 이상 입력해주세요'
					onChange={(e) => meetingPeopleTextChangeHandler(e)}
					value={meetingPeople}
					id='meeting-available-people'
				/>
			</div>

			{/* 버튼 */}
			<div className='mb-5'>
				<Button text='확인' type='submit' />
			</div>
		</form>
	);
}
