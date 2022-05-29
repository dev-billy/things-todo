require('dotenv').config();

export const BASE_URL = process.env.PROJECT_BASE_URL;
export const TODO_LISTS_URL = `${BASE_URL}/api/todo-lists`;
export const TODO_ITEMS_URL = `${BASE_URL}/api/todos`;
