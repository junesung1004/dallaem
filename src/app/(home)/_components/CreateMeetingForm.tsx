import Button from '@/app/(home)/_components/Button';
import { CalenderTime } from '@/components/Calendar/CalenderTime';
import ServiceSelector from '@/components/Service/Service';
import { InputWindow } from '@/components/InputSection/InputWindow';
import { useMeetingForm } from '@/hooks/customs/useMeeting';
import { Selectbox } from '@/components/InputSection/Selectbox';
import { useCreateMeeting } from '@/hooks/mutation/useCreateMeeting';

export default function CreateMeetingForm() {
	// 커스텀 훅훅
	const {
		meetingName,
		meetingPlace,
		meetingImageFileName,
		meetingSelectedService,
		meetingStartDate,
		meetingEndDate,
		meetingPeople,
		isFormValid,
		nameValid,
		peopleCountValid,
		startDateValid,
		endDateValid,
		meetingPlaceTextChangeHandler,
		meetingImageTextChangeHandler,
		meetingSelectedServiceChangeHandler,
		handleNameChange,
		handlePeopleCountChange,
		handleStartDateChange,
		handleEndDateChange,
	} = useMeetingForm();

	const { mutate, isPending, isError } = useCreateMeeting();

	// form data submit 이벤트 핸들러 == 모임 만들기 이벤트
	const clickUpdateMeetingHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		formData.append('location', meetingPlace);
		formData.append('type', meetingSelectedService || '');
		formData.append('name', meetingName);
		formData.append('dateTime', meetingStartDate?.toISOString() || '');
		formData.append('capacity', String(meetingPeople));
		formData.append('registrationEnd', meetingEndDate?.toISOString() || '');

		mutate(formData);
	};

	return (
		<form
			onSubmit={clickUpdateMeetingHandler}
			className='flex flex-col'
			encType='multipart/form-data'
		>
			<h1 className='font-semibold text-lg mb-3'>모임 만들기</h1>

			{/* 모임 이름 */}
			<div>
				<label className='font-semibold' htmlFor='meeting-name'>
					모임 이름
				</label>
				<InputWindow
					placeholderText='모임 이름을 작성해주세요'
					onChange={handleNameChange}
					value={meetingName}
					id='meeting-name'
				/>
				<div className='text-red-600 text-sm mb-1 ml-2 py-'>
					{nameValid && meetingName.length > 0 && (
						<div>모임 이름은 2~25자 사이로 한글, 영문, 숫자만 가능합니다.</div>
					)}
				</div>
			</div>

			{/* 모임 장소 */}
			<div>
				<label className='font-semibold' htmlFor='meeting-place'>
					장소
				</label>
				<Selectbox
					value={meetingPlace}
					placeholderText='장소를 선택해주세요'
					onChange={(e) => meetingPlaceTextChangeHandler(e)}
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
						className='sm:w-[230px] md:w-[350px]'
						onClick={() => document.getElementById('meeting-image')?.click()}
					>
						<InputWindow
							placeholderText='이미지를 첨부해주세요'
							onChange={(e) => meetingImageTextChangeHandler(e)}
							value={meetingImageFileName ?? ''}
							id='meeting-image'
						/>
					</div>

					<div
						onClick={() => document.getElementById('image')?.click()}
						className='flex items-center font-medium justify-center  ml-4 w-[100px] h-[40px] border rounded-xl text-primary-500 border-primary-500 cursor-pointer'
					>
						파일 찾기
						<input
							type='file'
							id='image'
							name='image'
							accept='image/*'
							className='hidden'
							onChange={meetingImageTextChangeHandler}
						/>
					</div>
				</div>
			</div>

			{/* 선택 서비스 */}
			<div className='mb-3'>
				<ServiceSelector onSelect={meetingSelectedServiceChangeHandler} />
			</div>

			{/* 모임 날짜 관련 콘테이너 */}
			<div className='flex flex-wrap'>
				{/* 모임 시작 날짜 */}
				<div className='flex flex-col gap-2 mb-3'>
					<label className='font-semibold' htmlFor='meeting-date'>
						모임 날짜
					</label>
					<CalenderTime
						selectedDate={meetingStartDate}
						onDateChange={handleStartDateChange}
					/>

					<div className='text-red-600 text-sm mb-1 ml-2'>
						{startDateValid && (
							<div>모임 날짜는 이틀 이후 부터 선택 가능 ✅</div>
						)}
					</div>
				</div>

				{/* 모임 모집 마감 종료 날짜 */}
				<div className='flex flex-col gap-2 mb-3'>
					<label className='font-semibold' htmlFor='meeting-name'>
						마감 날짜
					</label>

					<CalenderTime
						selectedDate={meetingEndDate}
						onDateChange={handleEndDateChange}
					/>

					<div className='text-red-600 text-sm mb-1 ml-2'>
						{endDateValid && (
							<div>
								마감 날짜는 현 시점부터 모임 시작 날짜 2시간 이전 까지 ✅
							</div>
						)}
					</div>
				</div>
			</div>

			{/* 모집 정원 */}
			<div className='mb-5'>
				<label className='font-semibold' htmlFor='meeting-available-people'>
					모집 정원
				</label>
				<InputWindow
					type={'number'}
					placeholderText='최소 5인 이상 입력해주세요'
					onChange={handlePeopleCountChange}
					value={meetingPeople ?? 0}
					id='meeting-available-people'
				/>
				<div className='text-red-600 text-sm mb-2 ml-2'>
					{peopleCountValid && (
						<div>모집 최소 인원은 5명 이상 20명 이하로 숫자로 기입해주세요</div>
					)}
				</div>
			</div>

			{/* 버튼 */}
			<div className='mb-5'>
				<Button
					text={isPending ? '생성 중...' : '확인'}
					type='submit'
					disabled={!isFormValid}
				/>
			</div>
			{isError && (
				<p className='text-red-500'>모임 생성 중 오류가 발생했습니다.</p>
			)}
		</form>
	);
}
