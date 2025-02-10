'use client';

import { useQuery } from '@tanstack/react-query';
import { getTods } from '../../api/todo';

/*
  data : 쿼리 결과 데이터
  status : loading, success, error, idle 등등
  isPending : 쿼리 결과 데이터가 아직 없을 때. 쿼리는 호출 중 status = 'pending'
  isError : 에러인지 아닌지 체크 status = 'error'
  isSucceess : 쿼리 결과가 성공 했는지 체크 status = 'success'
  isFetching: 위 3개의 조건은 내부적으로 'status'를 체크하지만 isFetching은
  상태와 상관없이 쿼리가 실행 중('fetching')이면 'true'이다.
  */

export default function Todo() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['todos'],
		queryFn: getTods,
	});

	if (isPending) return <p>Loading...</p>;
	if (isError) return <p>Error : {error.message}</p>;

	return (
		<div>
			{data &&
				data.length > 0 &&
				data.map((todo) => (
					<div key={todo.id} className="pt-10">
						<h1 className="font-bold text-4xl">{todo.title}</h1>
					</div>
				))}
		</div>
	);
}
