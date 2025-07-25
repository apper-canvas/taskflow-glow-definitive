import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks].sort((a, b) => a.order - b.order)
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return { ...task }
  },

  async getByCategory(categoryId) {
    await delay(300)
    return tasks
      .filter(t => t.categoryId === categoryId)
      .sort((a, b) => a.order - b.order)
      .map(task => ({ ...task }))
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: Math.max(...tasks.map(t => t.order), 0) + 1
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    tasks[index] = { ...tasks[index], ...updates }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(250)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    const deletedTask = tasks[index]
    tasks.splice(index, 1)
    return { ...deletedTask }
  },

  async toggleComplete(id) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    tasks[index].completed = !tasks[index].completed
    return { ...tasks[index] }
  },

  async reorder(taskIds) {
    await delay(200)
    taskIds.forEach((id, index) => {
      const task = tasks.find(t => t.Id === parseInt(id))
      if (task) {
        task.order = index + 1
      }
    })
    return tasks.sort((a, b) => a.order - b.order).map(task => ({ ...task }))
  },

  async search(query) {
    await delay(250)
    const searchTerm = query.toLowerCase()
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
      )
      .map(task => ({ ...task }))
  }
}