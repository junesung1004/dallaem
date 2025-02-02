"use client";

import { useQuery } from "@tanstack/react-query";
import { getTods } from "../../api/todo";

export default function Todo() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
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
