import { useState } from 'react';

type Service = {
	id: string;
	name: string;
	description: string;
};

export function useMeetingForm() {
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
	const [meetingPeople, setMeetingPeople] = useState<string>('');

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
		setMeetingPeople(e.target.value);
	};

	//미팅 모임 시간
	const meetingStartDateChangeHandler = (date: Date | null) => {
		setMeetingStartDate(date);
	};

	//미팅 모집 마감 시간
	const meetingEndDateChangeHandler = (date: Date | null) => {
		setMeetingEndDate(date);
	};

	return {
		meetingName,
		meetingPlace,
		meetingImage,
		meetingSelectedService,
		meetingStartDate,
		meetingEndDate,
		meetingPeople,
		meetingNameTextChangeHandler,
		meetingPlaceTextChangeHandler,
		meetingImageTextChangeHandler,
		meetingSelectedServiceChangeHandler,
		meetingPeopleTextChangeHandler,
		meetingStartDateChangeHandler,
		meetingEndDateChangeHandler,
	};
}
