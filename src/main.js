import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from './mock/task.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

renderComponent(headerElement, createMenuTemplate());
renderComponent(mainElement, createFilterTemplate(filters));
renderComponent(mainElement, createBoardTemplate());

const taskListElement = mainElement.querySelector(`.board__tasks`);
const boardElement = mainElement.querySelector(`.board`);

renderComponent(boardElement, createSortingTemplate(), `afterbegin`);
renderComponent(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

renderComponent(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderComponent(taskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
