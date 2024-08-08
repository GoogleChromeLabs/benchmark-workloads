import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, getElement, getAllElements } from "./workload-testing-utils.min.js";
import { getTodoText } from "./todomvc-testing-utils.min.js";

const numberOfItemsToAdd = 100;

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("CRUD", [
        new BenchmarkTestStep("Adding-items", () => {
            const input = getElement(".new-todo-input", ["todo-app", "todo-topbar"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                input.value = getTodoText(i);
                input.dispatchEvent(new Event("input"));
                input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13, key: "Enter"}));
            }
        }),
        new BenchmarkTestStep("Completing-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = getElement(".toggle-todo-input", [], items[i]);
                item.click();
            }
        }),
        new BenchmarkTestStep("Deleting-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = getElement(".remove-todo-button", [], items[i]);
                item.click();
            }
        }),
    ])
]);
