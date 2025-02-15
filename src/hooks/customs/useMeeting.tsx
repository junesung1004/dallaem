import { useState } from 'react';

type Service = {
	id: string;
	name: string;
	description: string;
};

export function useMeetingForm() {
	//상태값 state
	const [meetingName, setMeetingName] = useState<string>('');
	const [meetingPlace, setMeetingPlace] = useState<string>('');
	const [meetingImage, setMeetingImage] = useState<string>('');
	const [meetingSelectedService, setMeetingSelectedService] = useState<{
		id: string;
		name: string;
		description: string;
	} | null>(null);
	const [meetingStartDate, setMeetingStartDate] = useState<Date | null>(null);
	const [meetingEndDate, setMeetingEndDate] = useState<Date | null>(null);
	const [meetingPeople, setMeetingPeople] = useState<number | null>(5);

	//유효성 검사 state
	const [nameValid, setNameValid] = useState<boolean>(false);
	const [peopleCountValid, setPeopleCountValid] = useState<boolean | null>(
		false,
	);
	const [startDateValid, setStartDateValid] = useState<boolean>(false);
	const [endDateValid, setEndDateValid] = useState<boolean>(false);

	//모임 정원수 유효성 검사
	const peopleCountValidErrorMessage = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = Number(e.target.value); // 문자열을 숫자로 변환

		// 숫자로 변환된 값에 대해 비교
		if (value < 5 || value > 20) {
			setPeopleCountValid(true); // 유효하지 않은 값
		} else {
			setPeopleCountValid(false); // 유효한 값
		}
	};

	//모임 정원수 유효성 검사
	const handlePeopleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		meetingPeopleTextChangeHandler(e);
		peopleCountValidErrorMessage(e);
	};

	//모임 이름 유효성 검사
	const nameValidErrorMessage = () => {
		const nameRegex = /^[가-힣a-zA-Z]{2,8}$/;

		if (nameRegex.test(meetingName)) {
			setNameValid(false);
		} else {
			setNameValid(true);
		}
	};

	//모임 이름 유효성 검사
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		meetingNameTextChangeHandler(e);
		nameValidErrorMessage();
	};

	//모임 시작 날짜 유효성 검사
	const startDateValidErrorMessage = (selectedDate: Date | null) => {
		const today = new Date();
		today.setDate(today.getDate() + 2);
		today.setHours(0, 0, 0, 0);

		const isValid = selectedDate ? selectedDate >= today : false;

		setStartDateValid(!isValid);
	};

	//모임 시작 날짜 유효성 검사
	const handleStartDateChange = (date: Date | null) => {
		meetingStartDateChangeHandler(date);
		startDateValidErrorMessage(date);
	};

	//모임 마감 날짜 유효성 검사
	const endDateValidErrorMessage = (endDate: Date | null) => {
		if (!endDate || !meetingStartDate) {
			setEndDateValid(false);
			return;
		}

		const currentTime = new Date(); // 현재 시간 (년-월-일 시:분:초)
		const startDateWithBuffer = new Date(meetingStartDate);
		startDateWithBuffer.setHours(startDateWithBuffer.getHours() - 2); // 시작 2시간 전

		// 조건 1: 마감일이 현재 시간 이후인가?
		const isAfterCurrent = endDate >= currentTime;
		// 조건 2: 마감일이 시작 2시간 전 이전인가?
		const isBeforeBuffer = endDate <= startDateWithBuffer;

		// 두 조건 중 하나라도 만족하지 않으면 오류 (true 반환)
		const isInvalid = !(isAfterCurrent && isBeforeBuffer);
		setEndDateValid(isInvalid);
	};

	//모임 마감 날짜 유효성 검사
	const handleEndDateChange = (date: Date | null) => {
		meetingEndDateChangeHandler(date);
		endDateValidErrorMessage(date);
	};

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

	//선택 서비스
	const meetingSelectedServiceChangeHandler = (service: Service) => {
		setMeetingSelectedService(service);
	};

	//미팅 정원 인원수
	const meetingPeopleTextChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMeetingPeople(Number(e.target.value));
	};

	//미팅 모임 시간
	const meetingStartDateChangeHandler = (date: Date | null) => {
		setMeetingStartDate(date);
	};

	//미팅 모집 마감 시간
	const meetingEndDateChangeHandler = (date: Date | null) => {
		setMeetingEndDate(date);
	};

	// 모든 입력 필드가 채워졌는지 체크
	const isFormValid =
		meetingName &&
		meetingPlace &&
		meetingImage &&
		meetingSelectedService &&
		meetingStartDate &&
		meetingEndDate &&
		meetingPeople &&
		!nameValid &&
		!peopleCountValid &&
		!startDateValid &&
		!endDateValid;

	return {
		meetingName,
		meetingPlace,
		meetingImage,
		meetingSelectedService,
		meetingStartDate,
		meetingEndDate,
		meetingPeople,
		isFormValid,
		nameValid,
		peopleCountValid,
		startDateValid,
		endDateValid,
		meetingNameTextChangeHandler,
		meetingPlaceTextChangeHandler,
		meetingImageTextChangeHandler,
		meetingSelectedServiceChangeHandler,
		meetingPeopleTextChangeHandler,
		meetingStartDateChangeHandler,
		meetingEndDateChangeHandler,
		handleNameChange,
		handlePeopleCountChange,
		handleStartDateChange,
		handleEndDateChange,
	};
}
