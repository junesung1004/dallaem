import Button from "../_tests/Button";
import Count from "../_tests/Count";
import Todo from "../hooks/query/Todo";

export default async function Home() {
  return (
    <main>
      <p className="font-bold text-4xl">모임찾기 home page</p>
      <Button />
      <Count />
      <Todo />
    </main>
  );
}
