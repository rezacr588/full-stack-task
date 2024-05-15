let tasks = []; // This is your in-memory data storage

exports.createTask = (req, res) => {
    const task = {
        id: tasks.length + 1, // simple way to generate unique id
        text: req.body.text,
        category: req.body.category,
        status: req.body.status
    };
    tasks.push(task);
    res.status(201).json(task);
};

exports.editTask = (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
};

exports.deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask);
};

exports.listTasks = (req, res) => {
    if (req.query.category) {
        const filteredTasks = tasks.filter(task => task.category === req.query.category);
        return res.json(filteredTasks);
    }
    res.json(tasks);
};