import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  category,
  isDragging = false 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    await onToggleComplete(task.Id)
    setIsCompleting(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-error"
      case "medium": return "text-warning"
      case "low": return "text-success"
      default: return "text-gray-400"
    }
  }

  const getDueDateInfo = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    const isOverdue = isPast(date) && !isToday(date)
    
    let label
    if (isToday(date)) {
      label = "Today"
    } else if (isTomorrow(date)) {
      label = "Tomorrow"
    } else {
      label = format(date, "MMM d")
    }

    return {
      label,
      isOverdue,
      className: isOverdue ? "bg-error text-white" : "bg-gray-100 text-gray-700"
    }
  }

  const dueDateInfo = getDueDateInfo(task.dueDate)

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "task-card group",
          task.completed && "opacity-60",
          isDragging && "dragging"
        )}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="flex-shrink-0 pt-1">
            <button
              onClick={handleToggleComplete}
              disabled={isCompleting}
              className={cn(
                "task-checkbox",
                isCompleting && "animate-pulse",
                task.completed && "bg-success border-success"
              )}
            >
              {task.completed && (
                <ApperIcon name="Check" className="w-3 h-3 text-white" />
              )}
            </button>
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={cn(
                  "font-semibold text-gray-900 mb-1",
                  task.completed && "line-through text-gray-500"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={cn(
                    "text-sm text-gray-600 mb-3",
                    task.completed && "line-through text-gray-400"
                  )}>
                    {task.description}
                  </p>
                )}

                {/* Task Meta */}
                <div className="flex items-center gap-3 text-xs">
                  {/* Priority Indicator */}
                  <div className="flex items-center gap-1">
                    <div className={cn(
                      "priority-dot",
                      getPriorityColor(task.priority)
                    )} />
                    <span className="text-gray-500 capitalize">
                      {task.priority}
                    </span>
                  </div>

                  {/* Category */}
                  {category && (
                    <Badge 
                      variant="default"
                      className="category-pill"
                      style={{ borderColor: category.color }}
                    >
                      {category.name}
                    </Badge>
                  )}

                  {/* Due Date */}
                  {dueDateInfo && (
                    <Badge 
                      variant={dueDateInfo.isOverdue ? "error" : "default"}
                      className={cn(
                        "flex items-center gap-1",
                        dueDateInfo.className
                      )}
                    >
                      <ApperIcon name="Calendar" className="w-3 h-3" />
                      {dueDateInfo.label}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(task)}
                    className="p-2 h-auto"
                  >
                    <ApperIcon name="Edit2" className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.Id)}
                    className="p-2 h-auto text-error hover:text-error hover:bg-error/10"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskCard