import { useState } from "react";

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export function Todo({
    todo,
    onSelected,
}: {
    todo: ITodo;
    onSelected: Function;
}) {
    const [selected, setSelected] = useState(false);

    function handleOnClick() {
        let newValue = !selected;

        setSelected(newValue);

        onSelected(todo, newValue);
    }

    return (
        <div
            className={"todo" + (selected ? " selected" : "")}
            onClick={() => handleOnClick()}
        >
            <div className="todoTitle">{todo.title}</div>
            <div className="todoStatus">
                {todo.completed ? "complete" : "incomplete"}{" "}
            </div>
        </div>
    );
}
