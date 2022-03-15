import { triggerAsyncId } from "async_hooks";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Todos } from "./Todos";
import { ITodo } from "./Todo";

import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

let container: Element | null = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    fetchMock.resetMocks();
});

afterEach(() => {
    // cleanup on exiting
    if (container !== null) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }

    fetchMock.resetMocks();
});

describe("todos", () => {
    it("renders", async () => {
        const fakeTodos: ITodo[] = [
            {
                id: 1,
                completed: true,
                title: "test",
                userId: 1,
            },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(fakeTodos));

        await act(async () => {
            render(<Todos />, container);
        });

        let todoElement = container?.querySelector(".todo");

        expect(todoElement).toBeTruthy();

        expect(container).toMatchSnapshot();
    });

    it("renders error when retrieve fails", async () => {
        fetchMock.mockRejectOnce(new Error("Error"));

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<Todos />, container);
        });

        expect(container).toMatchSnapshot();
    });
});
