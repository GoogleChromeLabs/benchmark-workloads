import { BenchmarkStep, BenchmarkSuite } from "/node_modules/workload-testing-utils/dist/benchmark.mjs";
import { getElement, getAllElements } from "/node_modules/workload-testing-utils/dist/helpers.mjs";
import { getTodoText } from "/node_modules/workload-testing-utils/dist/todomvc-testing-utils.min.js";

export const appName = "todomvc-web-components";
export const appVersion = "1.0.0";

const numberOfItemsToAdd = 100;

const suites = {
    default: new BenchmarkSuite("default", [
        new BenchmarkStep("Adding-items", () => {
            const input = getElement(".new-todo-input", ["todo-app", "todo-topbar"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                input.value = getTodoText(i);
                input.dispatchEvent(new Event("input"));
                input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13, key: "Enter"}));
            }
        }),
        new BenchmarkStep("Completing-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                const item = getElement(".toggle-todo-input", [], items[i]);
                item.click();
            }
        }),
        new BenchmarkStep("Deleting-items", () => {
            const items = getAllElements("todo-item", ["todo-app", "todo-list"]);
            for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                const item = getElement(".remove-todo-button", [], items[i]);
                item.click();
            }
        }),
    ]),
}

export default suites;
