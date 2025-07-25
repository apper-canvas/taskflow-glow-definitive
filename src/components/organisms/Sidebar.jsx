import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CategoryItem from "@/components/molecules/CategoryItem"
import ProgressIndicator from "@/components/molecules/ProgressIndicator"

const Sidebar = ({ 
  categories = [], 
  tasks = [], 
  currentCategory,
  isOpen,
  onClose 
}) => {
  const [taskCounts, setTaskCounts] = useState({})

  useEffect(() => {
    const counts = categories.reduce((acc, category) => {
      if (category.Id === "all") {
        acc[category.Id] = tasks.filter(task => !task.completed).length
      } else {
        acc[category.Id] = tasks.filter(task => 
          task.categoryId === category.Id.toString() && !task.completed
        ).length
      }
      return acc
    }, {})
    setTaskCounts(counts)
  }, [categories, tasks])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length

  const allCategories = [
    { Id: "all", name: "All Tasks", color: "#5B4FE5" },
    ...categories
  ]

  // Desktop Sidebar (Static)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 font-display">TaskFlow</h2>
            <p className="text-xs text-gray-500">Task Management</p>
          </div>
        </div>

        <ProgressIndicator
          completed={completedTasks}
          total={totalTasks}
          className="mt-4"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </div>
          {allCategories.map(category => (
            <CategoryItem
              key={category.Id}
              category={category}
              taskCount={taskCounts[category.Id] || 0}
              isActive={currentCategory === category.Id.toString()}
            />
          ))}
        </div>
      </div>
    </div>
  )

  // Mobile Sidebar (Overlay)
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 font-display">TaskFlow</h2>
                    <p className="text-xs text-gray-500">Task Management</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>

              <ProgressIndicator
                completed={completedTasks}
                total={totalTasks}
                className="mt-4"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Categories
                </div>
                {allCategories.map(category => (
                  <CategoryItem
                    key={category.Id}
                    category={category}
                    taskCount={taskCounts[category.Id] || 0}
                    isActive={currentCategory === category.Id.toString()}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar