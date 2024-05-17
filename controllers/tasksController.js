let tasks = []; 
exports.createTask = (req, res) => {
    const task = {
        id: req.body.id,
        text: req.body.description,
        category: req.body.category,
        status: req.body.status,
        createdAt: req.body.createdAt,
        state: false
    };
    tasks.push(task);
    res.status(201).json(tasks);
};

exports.editTask = (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
};

exports.updateTask = (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTask = { ...tasks[taskIndex], ...req.body };

    tasks[taskIndex] = updatedTask;

    res.json(tasks);
}

exports.deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.json(tasks);
};

exports.deleteAlllTasks = (req, res) => {
    tasks = [];
    res.json(tasks);
};

exports.listTasks = (req, res) => { 
    const searchQuery = req.query.search;
    if (searchQuery) {
        const filteredTasks = tasks.filter(task => task.text.includes(searchQuery) || task.category.includes(searchQuery));
        res.json(filteredTasks);
    } else {
        res.json(tasks);
    }
}