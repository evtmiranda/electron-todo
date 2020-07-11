'use strict';

const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./Window');
const DataStore = require('./DataStore');

const todosData = new DataStore({ name: 'Todos Main' });

function main() {
  let mainWindow = new Window({
    file: path.join('renderer', 'index.html'),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  let addTodoWindow;

  ipcMain.on('add-todo-window', () => {
    console.log('add');
    if (!addTodoWindow) {
      addTodoWindow = new Window({
        file: path.join('renderer', 'add.html'),
        width: 400,
        height: 400,
        parent: mainWindow,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: true,
        },
      });

      addTodoWindow.on('closed', () => {
        addTodoWindow = null;
      });
    }
  });

  ipcMain.on('add-todo', (event, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos;

    mainWindow.send('todos', updatedTodos);
  });

  ipcMain.on('delete-todo', (event, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos;

    mainWindow.send('todos', updatedTodos);
  });
}

app.on('ready', main);
app.on('window-all-closed', () => app.quit());
