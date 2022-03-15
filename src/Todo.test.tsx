import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { ITodo, Todo } from "./Todo";

let container: Element | null = null;
const todo: ITodo = {
    id: 1,
    completed: true,
    title: "test",
    userId: 1,
};

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    if (container !== null) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

describe("todo", () => {
    it("renders", async () => {
        function onSelected() {}

        await act(async () => {
            render(<Todo todo={todo} onSelected={onSelected} />, container);
        });

        let todoElement = container?.querySelector(".todo");

        expect(todoElement).toBeTruthy();

        expect(todoElement?.querySelector(".todoTitle")).toHaveTextContent(
            todo.title
        );
    });

    it("is selected when clicked", async () => {
        const onSelected = jest.fn();

        await act(async () => {
            render(<Todo todo={todo} onSelected={onSelected} />, container);
        });

        let todoElement = container?.querySelector(".todo");

        expect(todoElement?.classList.contains("selected")).toBe(false);

        act(() => {
            todoElement?.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        expect(todoElement?.classList.contains("selected")).toBe(true);
        expect(onSelected).toHaveBeenCalledWith(todo, true);
    });
});
