import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";
import { getTodoText } from "./todomvc-testing-utils.min.js";

const numberOfItemsToAdd = 100;
const page = new Page(document);

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("CRUD", [
        new BenchmarkTestStep("Adding items", () => {
            const element = page.querySelector(".new-todo-input", ["todo-app", "todo-topbar"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                element.value = getTodoText(i);
                element.dispatchEvent(new Event("input"));
                element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13, key: "Enter"}));
            }
        }),
        new BenchmarkTestStep("Completing items", () => {
            const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = page.querySelector(".toggle-todo-input", [], items[i].node);
                item.click();
            }
        }),
        new BenchmarkTestStep("Deleting items", () => {
            const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = page.querySelector(".remove-todo-button", [], items[i].node);
                item.click();
            }
        }),
    ])
]);
