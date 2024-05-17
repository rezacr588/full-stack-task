# Introduction

The front end is in the front-end folder
first run the back end on port 3000 by this command

```
npm i
node index.js
```

Then run the front end in the front end folder but this command please don't forget to press y when the cra asks for executing the project on another port

```
npm i
npm start 
```

also you can run tests with this command in the main folder

`npm test `

The back end has three main folders

`controllers`  `routes` __`tests`__

I have used jest for testing
The folder structure in the react project is like this
`Components` for managing reusable components

`Assets`for managing icons``

`Context`for managing states

I have used `Context Api` for state management

`Tailwind` for css optimization

`React DND` for dragging between the stacks

Tasks Provider and Context
==========================

The `TasksProvider` is a React component that provides a context with task management related state and functions to its child components. The `TasksContext` is the context object that is created with `createContext` and is used by the `TasksProvider` and child components.

State and Props
---------------

The `TasksProvider` component has the following state and props:

### State

* `tasks`: an array of task objects, each with the following properties:
  + `description`: a string containing the task description
  + `status`: a string indicating the task status, either 'To Do', 'In Progress', or 'Done'
  + `category`: a string indicating the task category
  + `id`: a unique string identifier for the task
  + `createdAt`: a Date object indicating when the task was created
* `description`: a string containing the description for a new task
* `descriptionEdit`: a string containing the description for an edited task
* `categoryEdit`: a string containing the category for an edited task
* `selectedOption`: an object with `label` and `value` properties, indicating the currently selected category for new tasks
* `isModalOpen`: a boolean indicating whether the new task modal is open
* `isEditModalOpen`: a boolean indicating whether the edit task modal is open
* `selectedTask`: an object containing the currently selected task for editing

### Props

* `children`: the child components that will have access to the `TasksContext`

Functions
---------

The `TasksProvider` component provides the following functions in the `TasksContext`:

* `setTasks`: a function that sets the `tasks` state
* `setDescription`: a function that sets the `description` state
* `onDragEnd`: a function that is called when a task is dragged and dropped to a new status column
* `addTask`: a function that adds a new task to the `tasks` array and updates the state and backend
* `deleteTask`: a function that deletes a task from the `tasks` array and updates the state and backend
* `updatedTask`: a function that updates the status of a task in the `tasks` array and backend
* `setDescriptionEdit`: a function that sets the `descriptionEdit` state
* `setCategoryEdit`: a function that sets the `categoryEdit` state
* `setSelectedOption`: a function that sets the `selectedOption` state
* `editTask`: a function that edits a task in the `tasks` array and backend
* `handleSelect`: a function that is called when the category select input is changed
* `handleEditSelect`: a function that is called when the category select input is changed in the edit modal
* `openModal`: a function that sets the `isModalOpen` state to `true`
* `closeModal`: a function that sets the `isModalOpen` state to `false`
* `openEditModal`: a function that sets the `isEditModalOpen` state to `true` and sets the `selectedTask`, `descriptionEdit`, and `categoryEdit` state
* `closeEditModal`: a function that sets the `isEditModalOpen` state to `false` and clears the `selectedTask`, `descriptionEdit`, and `categoryEdit` state
* `deleteAllTasks`: a function that deletes all tasks from the backend
* `searchTask`: a function that searches for tasks in the backend and updates the `tasks` state



# TaskStack Component

The `TaskStack` component is a React component that renders a stack of tasks. It uses the `react-beautiful-dnd` library to make the tasks draggable.

## Props

- `type`: A string that represents the type of tasks in the stack.
- `tasks`: An array of task objects. Each task object should have the following properties:
  - `id`: A unique identifier for the task.
  - `text`: The text of the task.
  - `status`: The status of the task.
  - `createdAt`: The date and time when the task was created.
  - `state`: The state of the task.
  - `category`: The category of the task.

## Usage

```jsx
<TaskStack type="To Do" tasks={tasks} />
```

## Structure

The component first renders a `div` with some styling. Inside this `div`, it renders a `p` element with the `type` prop as its content.

Then, it maps over the `tasks` prop and for each task, it creates a `Draggable` component from `react-beautiful-dnd`. Inside the `Draggable` component, it renders a `div` that contains a `Task` component.

The `Task` component is passed all the properties of the task object as props. The `Draggable` component is given the task's `id` as the `key` and `draggableId` props, and the index of the task in the `tasks` array as the `index` prop.

The `div` inside the `Draggable` component is given a `ref` and two sets of props from the `Draggable` component: `draggableProps` and `dragHandleProps`. These are necessary for the `react-beautiful-dnd` library to handle the drag and drop functionality.

# Layout Component

The `Layout` component is a React component that provides a layout for the application. It includes a sidebar, a header, and a main content area.

## Props

- `children`: React nodes that will be rendered in the main content area.

## Usage

```jsx
<Layout>
  <YourComponent />
</Layout>
```

## Structure

The component uses the `useState`, `useEffect`, and `useRef` hooks from React, and the `useTasksContext` hook from the application's context.

The `useState` hook is used to manage the state of the sidebar (whether it is open or not), and the `useRef` hook is used to get a reference to the sidebar element.

The `useEffect` hook is used to add or remove an event listener for clicks outside the sidebar when the state of the sidebar changes. If the sidebar is open and the user clicks outside it, the sidebar will close.

The `useTasksContext` hook is used to get the `deleteAllTasks` and `searchTask` functions from the application's context. These functions are used in the sidebar's "Delete All Tasks" button and the header's search input, respectively.

The component returns a `div` that contains an `aside` element for the sidebar, and another `div` for the header and main content area. The sidebar contains a title, a "Tasks" button, and a "Delete All Tasks" button. The header contains a button to toggle the sidebar (only visible on small screens), a search input, and an image. The main content area renders the `children` prop.

The sidebar, header, and main content area all have some inline styles and classes for layout and styling. The sidebar also has a transition for the transform property to animate it sliding in and out.


# Modal Component

The `Modal` component is a React component that renders a modal dialog.

## Props

- `isOpen`: A boolean that determines whether the modal is open or not.
- `onClose`: A function that will be called when the close button is clicked.
- `children`: React nodes that will be rendered in the body of the modal.
- `title`: A string that will be used as the title of the modal.

## Usage

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
  <YourComponent />
</Modal>
```

## Structure

The component first checks if `isOpen` is false. If it is, it returns `null` and nothing is rendered.

If `isOpen` is true, it returns a `div` that covers the entire viewport and is centered both vertically and horizontally. This `div` has a semi-transparent black background to create an overlay effect.

Inside this `div`, it renders another `div` for the modal dialog itself. This `div` has a white background, some padding, and a shadow to make it stand out from the overlay.

The modal dialog contains a `p` element for the title, a `button` for closing the modal, and the `children` prop.

The close button is positioned in the top-right corner of the modal dialog. It contains an SVG for the close icon. When the close button is clicked, the `onClose` prop is called.

The `children` prop is rendered below the close button. This is where you would put the content of the modal.

# Task Component

The `Task` component is a part of a task management interface, built using React. It uses the `useTasksContext` hook to access the task context, which provides functions for deleting and updating tasks, as well as opening a modal for editing tasks.

### Props

The `Task` component accepts the following props:

- `text`: The text of the task.
- `state`: The state of the task, which determines its background color and whether the text is crossed out.
- `createdAt`: The creation date of the task, which is converted to a readable format.
- `category`: The category of the task, which is displayed in a blue tag.

### Usage

The `Task` component renders a `div` that represents a task. The task is clickable and opens the edit modal when clicked. The task has a delete button and a button for toggling its state between done and undone. The state of the task determines the background color of the task and whether the text is crossed out.

The task displays the text, the creation date, and the category. The creation date is displayed next to an image, and the category is displayed in a blue tag.

### Styling

The component uses inline styles for styling. However, inline styles are not recommended for larger applications due to the lack of reusability and the difficulty of managing styles. For larger applications, consider using CSS modules or a CSS-in-JS solution like styled-components.

### Component Structure

```jsx
<div (task container)>
  <div (task header)>
    <span (done/undone button)>
    <p (task text)>
    <span (delete button)>
  </div>
  <div (task footer)>
    <div>
      <img>
      <p (creation date)>
    </div>
    <p (category)>
  </div>
</div>
```

This structure represents a task that can be clicked to open an edit modal, marked as done or undone, and deleted. It displays the task text, creation date, and category.

# DnDContainer Component

The `Container` component is a part of a drag-and-drop interface, built using React and the `react-dnd` library. It serves as a drop target for draggable items of type 'TASK'.

### Props

The `Container` component accepts the following props:

- `id`: A unique identifier for the container. This is used to determine the background color of the container and is returned when a task is dropped into the container.
- `tasks`: An array of tasks that are displayed in the container.

### Usage

The `Container` component uses the `useDrop` hook from the `react-dnd` library to enable drag-and-drop functionality. The hook is configured to accept items of type 'TASK'. When an item is dropped into the container, the `drop` function returns an object with the `id` of the container.

The component renders a `div` that serves as a drop target for draggable items. Inside this `div`, a `TaskStack` component is rendered, which is passed the `id` of the container and the tasks as props.

The background color of the `div` is determined by the `getBackgroundColor` function, which returns a different color depending on the `id` of the container.

### Styling

The component uses inline styles for styling. The styles set the background color, padding, border radius, and minimum height of the container.

### Component Structure

```jsx
<div (drop target container)>
  <TaskStack type={id} tasks={tasks} />
</div>
```

This structure represents a container that can accept dropped items and displays a stack of tasks.

# Dropdown Component

The `Dropdown` component is a customizable dropdown menu built using React. It maintains its own state for tracking whether the dropdown is open and which option is currently selected.

### Props

The `Dropdown` component accepts the following props:

- `options`: An array of options for the dropdown. Each option should be an object with `label` and `value` properties.
- `onSelect`: A function that is called when an option is selected. The selected option is passed as an argument to this function.
- `selected`: The initial selected option.

### Usage

The `Dropdown` component uses the `useState` hook to maintain its own state. It tracks whether the dropdown is open (`isOpen`) and which option is currently selected (`selectedOption`).

The `toggleDropdown` function is used to open and close the dropdown. The `handleOptionClick` function is used to update the selected option and call the `onSelect` function passed in through props.

The component renders a button that displays the selected option and a dropdown icon. When the button is clicked, the dropdown opens, displaying a list of options. Each option is a list item that calls `handleOptionClick` when clicked, passing the clicked option as an argument.

### Styling

The component uses a combination of Tailwind CSS classes and inline styles for styling. The button and options have hover effects for better user experience.

### Component Structure

```jsx
<div (dropdown container)>
  <button (dropdown button)>
    {selectedOption.label}
    <svg (dropdown icon)>
  </button>
  {isOpen && (
    <ul (dropdown options)>
      {options.map((option) => (
        <li (dropdown option)>
          {option.label}
        </li>
      ))}
    </ul>
  )}
</div>
```

This structure represents a dropdown that displays the selected option and a list of options when open. Each option can be clicked to select it.<div (task container)>

## Task Management API

This API provides endpoints for managing tasks. It supports creating, editing, updating, deleting, and listing tasks.

### Data Structure

Each task is an object with the following properties:

- `id`: The unique identifier of the task.
- `text`: The description of the task.
- `category`: The category of the task.
- `status`: The status of the task.
- `createdAt`: The creation date of the task.
- `state`: The state of the task, initially set to `false`.

### Endpoints

#### `createTask(req, res)`

Creates a new task with the data provided in `req.body` and adds it to the `tasks` array. Returns the updated `tasks` array with a status of `201`.

#### `editTask(req, res)`

Finds a task by `id` provided in `req.params.id` and updates it with the data provided in `req.body`. Returns the updated task. If the task is not found, returns a `404` status with a message of 'Task not found'.

#### `updateTask(req, res)`

Similar to `editTask`, but returns the entire updated `tasks` array instead of the single updated task.

#### `deleteTask(req, res)`

Deletes a task by `id` provided in `req.params.id` and returns the updated `tasks` array. If the task is not found, returns a `404` status with a message of 'Task not found'.

#### `deleteAllTasks(req, res)`

Deletes all tasks and returns the empty `tasks` array.

#### `listTasks(req, res)`

Returns the `tasks` array. If a `search` query parameter is provided, returns an array of tasks that include the search query in their `text` or `category` properties.

### Usage

To use these endpoints, import the module and attach the functions to your Express app's routes. For example:

```javascript
const tasksAPI = require('./tasksAPI');

app.post('/tasks', tasksAPI.createTask);
app.put('/tasks/:id', tasksAPI.editTask);
app.patch('/tasks/:id', tasksAPI.updateTask);
app.delete('/tasks/:id', tasksAPI.deleteTask);
app.delete('/tasks', tasksAPI.deleteAllTasks);
app.get('/tasks', tasksAPI.listTasks);
```

This will create routes for managing tasks at `/tasks` and `/tasks/:id`, where `:id` is the `id` of a task.

<div (task header)>
    <span (done/undone button)>
    <p (task text)>
    <span (delete button)>
  </div>
  <div (task footer)>
    <div>
      <img>
      <p (creation date)>
    </div>
    <p (category)>
  </div>
</div>
