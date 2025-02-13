'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SignupInputSection } from './SignupInputSection';

const Signup = () => {
	const router = useRouter();
	const debouncingTimer = useRef<NodeJS.Timeout | null>(null);
	/* 변수: 회원가입 인풋 상태관리 */
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [isHidden, setIsHidden] = useState(true); //비밀번호 숨김 토글 관리

	/* 변수: 회원가입 인풋 에러 상태관리 */
	const [errorName, setErrorName] = useState('');
	const [errorId, setErrorId] = useState('');
	const [errorCompanyName, setErrorCompanyName] = useState('');
	const [errorPassword, setErrorPassword] = useState('');
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

	/* 함수: onChange */
	const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setId(e.target.value);
	};
	const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyName(e.target.value);
	};
	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	};

	/* 함수: 작성 중 인풋 에러 처리  */
	//모든 필드 빈 값 에러 처리
	const validateEmpty = (
		type: 'name' | 'id' | 'companyName' | 'password' | 'passwordConfirm',
	) => {
		const validationFunctions = {
			name: () => {
				if (name === '') {
					setErrorName('이름을 입력해주세요');
				} else {
					setErrorName('');
				}
			},
			id: () => {
				if (id === '') {
					setErrorId('아이디를 입력해주세요');
				} else {
					setErrorId('');
				}
			},
			companyName: () => {
				if (companyName === '') {
					setErrorCompanyName('회사명을 입력해주세요');
				} else {
					setErrorCompanyName('');
				}
			},
			password: () => {
				if (password === '') {
					setErrorPassword('비밀번호를 입력해주세요');
				} else {
					setErrorPassword('');
				}
			},
			passwordConfirm: () => {
				if (passwordConfirm === '') {
					setErrorPasswordConfirm('비밀번호를 다시 한 번 입력해주세요');
				} else {
					setErrorPasswordConfirm('');
				}
			},
		};

		if (validationFunctions[type]) {
			validationFunctions[type]();
		}
	};
	//추가 에러 처리
	//아이디: 유효한 이메일 형식이 아닐 경우
	const validateIdForm = () => {
		const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		if (id === '') {
			setErrorId('아이디를 입력해주세요');
		} else if (!email_regex.test(id)) {
			setErrorId('유효하지 않은 이메일 형식입니다');
		} else {
			setErrorId('');
		}
	};

	//회사명: 4자 미만일 때, 12자 초과할 때
	const validateCompanyNameForm = () => {
		if (companyName.length < 3 || companyName.length > 12) {
			setErrorCompanyName('회사명은 3자 이상, 12자 이하여야 합니다');
		}
	};

	//비밀번호 재입력: 패스워드와 패스워드 재입력이 일치하지 않을 경우
	const validatePasswordConfirmSame = () => {
		if (password !== passwordConfirm) {
			setErrorPasswordConfirm('비밀번호가 일치하지 않습니다.');
		}
	};

	/* 함수: handleSubmit) 회원가입 및 제출 시 에러 처리*/
	const handleSubmit = () => {};

	/* 함수: onFocus) Input 창을 포커스 할 경우 1초 후에 빈값 유효성 검사 시작한다. 모든 필드에서 빈값 에러 처리 */
	const handleFocus = (
		type: 'name' | 'id' | 'companyName' | 'password' | 'passwordConfirm',
	) => {
		if (debouncingTimer.current) {
			clearTimeout(debouncingTimer.current);
		}
		const validationFunctions = {
			name: () => validateEmpty('name'),
			id: () => validateEmpty('id'),
			companyName: () => validateEmpty('companyName'),
			password: () => validateEmpty('password'),
			passwordConfirm: () => validateEmpty('passwordConfirm'),
		};

		debouncingTimer.current = setTimeout(() => {
			validationFunctions[type]();
		}, 1000);
	};

	/* 함수: onBlur) Input 창을 벗어나면 형식 유효성 검사 진행한다. Input 창이 빈칸일 경우 에러 메시지를 제거한다. */
	const handleBlur = (
		type: 'name' | 'id' | 'companyName' | 'password' | 'passwordConfirm',
	) => {
		const validationFunctions = {
			name: () => {
				if (name === '') {
					setErrorName('');
				}
			},
			id: () => {
				if (id === '') {
					setErrorId('');
				} else {
					validateIdForm();
				}
			},
			companyName: () => {
				if (name === '') {
					setErrorCompanyName('');
				} else {
					validateCompanyNameForm();
				}
			},
			password: () => {
				if (password === '') {
					setErrorPassword('');
				}
			},
			passwordConfirm: () => {
				if (passwordConfirm === '') {
					setErrorPasswordConfirm('');
				}
			},
		};

		if (validationFunctions[type]) {
			validationFunctions[type]();
		}
	};

	const prevValues = useRef({
		id,
		name,
		companyName,
		password,
		passwordConfirm,
	});

	//useEffect: 작성중이면 에러 메시지를 제거한다.
	useEffect(() => {
		if (id !== prevValues.current.id) {
			setErrorId('');
		}
		if (name !== prevValues.current.name) {
			setErrorName('');
		}
		if (companyName !== prevValues.current.companyName) {
			setErrorCompanyName('');
		}
		if (password !== prevValues.current.password) {
			setErrorPassword('');
		}
		if (passwordConfirm !== prevValues.current.passwordConfirm) {
			setErrorPasswordConfirm('');
		}

		prevValues.current = { id, name, companyName, password, passwordConfirm };
	}, [name, id, companyName, password, passwordConfirm]);

	return (
		<div className='w-full h-full bg-white rounded-3xl px-5'>
			<div className='w-[90%] h-full mx-auto flex flex-col justify-between gap-2 lg:gap-4'>
				{/* Section: 제목 */}
				<div className='w-full h-[10%] flex justify-center items-center'>
					<span className='text-xl md:text-2xl'>회원가입</span>
				</div>

				{/* Section: 이름 */}
				<SignupInputSection
					title={'이름'}
					placeholderText={'이름을 입력해주세요.'}
					value={name}
					onChange={onNameChange}
					errorMsg={errorName}
					onFocus={() => handleFocus('name')}
					onBlur={() => handleBlur('name')}
					isError={errorName ? true : false}
				/>
				{/* Section: 아이디 */}
				<SignupInputSection
					title={'아이디'}
					placeholderText={'아이디를 입력해주세요.'}
					value={id}
					onChange={onIdChange}
					errorMsg={errorId}
					onFocus={() => handleFocus('id')}
					onBlur={() => handleBlur('id')}
					isError={errorId ? true : false}
				/>
				{/* Section: 회사명 */}
				<SignupInputSection
					title={'회사명'}
					placeholderText={'회사명을 입력해주세요.'}
					value={companyName}
					onChange={onCompanyNameChange}
					errorMsg={errorCompanyName}
					onFocus={() => handleFocus('companyName')}
					onBlur={() => handleBlur('companyName')}
					isError={errorCompanyName ? true : false}
				/>
				{/* Section: 비밀번호 */}
				<SignupInputSection
					title={'비밀번호'}
					placeholderText={'비밀번호를 입력해주세요.'}
					value={password}
					onChange={onPasswordChange}
					errorMsg={errorPassword}
					onFocus={() => handleFocus('password')}
					onBlur={() => handleBlur('password')}
					isError={errorPassword ? true : false}
				/>
				{/* Section: 비밀번호 확인*/}
				<SignupInputSection
					title={'비밀번호 확인'}
					placeholderText={'비밀번호를 다시 한 번 입력해주세요.'}
					value={passwordConfirm}
					onChange={onPasswordConfirmChange}
					errorMsg={errorPasswordConfirm}
					onFocus={() => handleFocus('passwordConfirm')}
					onBlur={() => handleBlur('passwordConfirm')}
					isError={errorPasswordConfirm ? true : false}
				/>
				{/* Section: 로그인 버튼 */}
				<div className='w-full h-[10%] flex justify-center items-center'>
					<button
						className='w-full aspect-[311/40] bg-gray-400 rounded-xl'
						onClick={handleSubmit}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
};

export { Signup };
