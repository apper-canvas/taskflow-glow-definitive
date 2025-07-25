import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"
import Header from "@/components/organisms/Header"
import TaskList from "@/components/organisms/TaskList"
import TaskModal from "@/components/organisms/TaskModal"
import Sidebar from "@/components/organisms/Sidebar"

const TasksPage = () => {
  const { categoryId } = useParams()
  
  // Data state
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  
  // Loading states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [taskLoading, setTaskLoading] = useState(false)
  
  // UI state
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all"
  })

  // Load initial data
  useEffect(() => {
    loadData()
  }, [])

  // Filter tasks based on category, search, and filters
  useEffect(() => {
    filterTasks()
  }, [tasks, categoryId, searchQuery, filters])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let filtered = [...tasks]

    // Filter by category
    if (categoryId && categoryId !== "all") {
      filtered = filtered.filter(task => task.categoryId === categoryId)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(task => 
        filters.status === "completed" ? task.completed : !task.completed
      )
    }

    // Filter by priority
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    setFilteredTasks(filtered)
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setShowTaskModal(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  const handleSubmitTask = async (taskData) => {
    try {
      setTaskLoading(true)
      
      if (editingTask) {
        // Update existing task
        const updatedTask = await taskService.update(editingTask.Id, taskData)
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ))
        toast.success("Task updated successfully!")
      } else {
        // Create new task
        const newTask = await taskService.create(taskData)
        setTasks(prev => [...prev, newTask])
        toast.success("Task created successfully!")
      }
    } catch (err) {
      toast.error("Failed to save task. Please try again.")
      console.error("Error saving task:", err)
    } finally {
      setTaskLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉")
      } else {
        toast.info("Task marked as active")
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error toggling task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const getCurrentCategoryName = () => {
    if (!categoryId || categoryId === "all") return "All Tasks"
    const category = categories.find(cat => cat.Id.toString() === categoryId)
    return category ? category.name : "Unknown Category"
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        tasks={tasks}
        currentCategory={categoryId || "all"}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onAddTask={handleAddTask}
          currentFilters={filters}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">
                {getCurrentCategoryName()}
              </h1>
              <p className="text-gray-600">
                {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            <TaskList
              tasks={filteredTasks}
              categories={categories}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onRetry={loadData}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleSubmitTask}
        categories={categories}
        initialData={editingTask}
        title={editingTask ? "Edit Task" : "Add New Task"}
        isLoading={taskLoading}
      />
    </div>
  )
}

export default TasksPage