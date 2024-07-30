import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager } from "./workload-testing-utils.min.js";
import { getTodoText } from "./todomvc-testing-utils.min.js";

const numberOfItemsToAdd = 100;

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("CRUD", [
        new BenchmarkTestStep("Adding items", () => {
            const input = document.querySelector("todo-app").shadowRoot.querySelector("todo-topbar").shadowRoot.querySelector(".new-todo-input");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                input.value = getTodoText(i);
                input.dispatchEvent(new Event("input"));
                input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13, key: "Enter"}));
            }
        }),
        new BenchmarkTestStep("Completing items", () => {
            const items = document.querySelector("todo-app").shadowRoot.querySelector("todo-list").shadowRoot.querySelectorAll("todo-item");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = items[i].shadowRoot.querySelector(".toggle-todo-input");
                item.click();
            }
        }),
        new BenchmarkTestStep("Deleting items", () => {
            const items = document.querySelector("todo-app").shadowRoot.querySelector("todo-list").shadowRoot.querySelectorAll("todo-item");
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = items[i].shadowRoot.querySelector(".remove-todo-button");
                item.click();
            }
        }),
    ])
]);
