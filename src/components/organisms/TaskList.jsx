import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks = [], 
  categories = [],
  loading = false,
  error = null,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onRetry,
  onAddTask
}) => {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (taskId) => {
    setDeletingId(taskId)
    await onDeleteTask(taskId)
    setDeletingId(null)
  }

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id.toString() === categoryId)
  }

  if (loading) {
    return <Loading message="Loading your tasks..." />
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        message="You're all caught up! Create a new task to keep your productivity flowing."
        actionLabel="Create First Task"
        onAction={onAddTask}
        icon="CheckCircle2"
      />
    )
  }

  // Separate completed and active tasks
  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="space-y-6">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>Active Tasks</span>
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {activeTasks.length}
            </span>
          </h2>
          
          <div className="space-y-3">
            <AnimatePresence>
              {activeTasks.map(task => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <TaskCard
                    task={task}
                    category={getCategoryById(task.categoryId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    onDelete={handleDelete}
                    isDragging={deletingId === task.Id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>Completed</span>
            <span className="text-sm font-normal text-gray-500 bg-success/10 text-success px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </h2>
          
          <div className="space-y-3">
            <AnimatePresence>
              {completedTasks.map(task => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <TaskCard
                    task={task}
                    category={getCategoryById(task.categoryId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    onDelete={handleDelete}
                    isDragging={deletingId === task.Id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList