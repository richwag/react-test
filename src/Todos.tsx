import { useEffect, useState } from "react";
import { Todo, ITodo } from "./Todo";

function useGetTodos(): [ITodo[] | null, Error | null] {
    const [todos, setTodos] = useState<ITodo[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function getTodos() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );

                setError(null);

                if (!response.ok) {
                    throw new Error("Unable to return");
                }

                const resp = await response.json();

                setTodos(resp);
            } catch (e: any) {
                setError(e);
                setTodos([]);
            }
        }

        getTodos();
    }, []);

    return [todos, error];
}

export function Todos() {
    const [todos, error] = useGetTodos();

    function onSelected(todo: ITodo, selected: boolean) {

    }

    return (
        <div>
            {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} onSelected={onSelected} />)}
            {error && error.message}
        </div>
    );
}
