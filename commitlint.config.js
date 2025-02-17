module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// "subject-case": [2, "always", ["sentence-case"]], // 제목은 문장형식으로....!!!!!
		'subject-full-stop': [2, 'never', '.'], // 제목에 마침표 금지
		'header-max-length': [2, 'always', 50], // 제목은 50자 이하
		'body-max-line-length': [1, 'always', 72], // 본문은 72자 이하
		'type-enum': [
			2,
			'always',
			[
				'config', // npm 모듈 설치 , 설정 파일 추가, 라이브러리 추가 등
				'chore', // 그 외 기타 변경 사항에 대한 커밋(기타변경, 오탈자 수정,네이밍 변경 등)으로 프로덕션 코드 변경X
				'docs', // README.md, json 파일 등 수정 (문서 관련, 코드 수정 없음)
				'feat', // 기능 추가, 수정, 삭제
				'fix', // 버그, 오류 수정
				'hotfix', // 배포된 코드에 바로 합쳐야 하는 경우
				'style', // 코드 스타일 및 포맷  / CSS 등 사용자 UI 디자인 변경 (제품 코드 수정 발생, 코드 형식, 정렬 등의 변경)
				'remove', // 파일을 삭제하는 작업만 수행한 경우
				'refactor', // 코드 리팩토링
				'test', // 테스트 코드 추가, 삭제, 변경 등 (코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
			],
		], // 커밋 type 제한
	},
};



