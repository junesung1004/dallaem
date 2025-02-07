import Button from '@/app/_tests/Button';
import Count from '@/app/_tests/Count';
import Todo from '@/app/hooks/query/Todo';
import Dummy from '../_tests/Dummy';

export default async function Home() {
	return (
		<main className="relative w-full">
			<p className="font-bold text-4xl pb-10">모임찾기 home page!!!!!!</p>
			<Button />
			<Dummy />
			<Count />
			<Todo />
		</main>
	);
}
