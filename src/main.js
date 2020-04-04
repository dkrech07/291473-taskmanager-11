import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortingTemplate} from './components/sorting.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';

const TASK_COUNT = 3;
const DEFAULT_RENDER_COUNT = 1;

const renderComponent = (container, template, place = `beforeend`, count = DEFAULT_RENDER_COUNT) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

renderComponent(headerElement, createMenuTemplate());
renderComponent(mainElement, createFilterTemplate());
renderComponent(mainElement, createBoardTemplate());

const taskListElement = mainElement.querySelector(`.board__tasks`);
const boardElement = mainElement.querySelector(`.board`);

renderComponent(boardElement, createSortingTemplate(), `afterbegin`);
renderComponent(taskListElement, createTaskEditTemplate());
renderComponent(taskListElement, createTaskTemplate(), `beforeend`, TASK_COUNT);
renderComponent(boardElement, createLoadMoreButtonTemplate());
