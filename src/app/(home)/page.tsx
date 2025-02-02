import Count from "../_tests/Count";
import Todo from "../hooks/query/Todo";

export default async function Home() {
  return (
    <main>
      <p className="font-bold text-4xl">home page</p>
      <Count />
      <Todo />
    </main>
  );
}
