function ErrorModalContent({ children }: { children: React.ReactNode }) {
	return children;
}

function Auth() {
	return (
		<span>
			로그인이 만료되었습니다.
			<br />
			로그인 페이지로 이동합니다
		</span>
	);
}
function FORBIDDEN() {
	return (
		<span>
			모임에 참여하지 않아 리뷰를 작성할 수 없어요
			<br />
			작성 중인 내용을 모두 삭제하고 나가시겠어요?
		</span>
	);
}
function NOT_FOUND() {
	return (
		<span>
			모임을 찾을 수 없습니다.
			<br />
			작성 중인 내용을 모두 삭제하고 나가시겠어요?
		</span>
	);
}
function ALREADY_REVIEWED() {
	return (
		<span>
			이 모임에 이미 작성한 리뷰가 있어
			<br />
			새로운 리뷰를 남길 수 없어요
			<br />
			작성 중인 내용을 모두 삭제하고 나가시겠어요?
		</span>
	);
}
function Default() {
	return <></>;
}

ErrorModalContent.Auth = Auth;
ErrorModalContent.FORBIDDEN = FORBIDDEN;
ErrorModalContent.NOT_FOUND = NOT_FOUND;
ErrorModalContent.ALREADY_REVIEWED = ALREADY_REVIEWED;
ErrorModalContent.Default = Default;

export default ErrorModalContent;
