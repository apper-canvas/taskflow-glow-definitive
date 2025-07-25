import { useState, useContext } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import { AuthContext } from '../../App'

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      <ApperIcon name="LogOut" className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

const Header = ({ 
  onSearch, 
  onFilterChange, 
  onAddTask,
  currentFilters,
  totalTasks = 0,
  completedTasks = 0 
}) => {
  const [showFilters, setShowFilters] = useState(false)

return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            TaskFlow
          </h1>
          <p className="text-gray-600 text-sm">
            {totalTasks > 0 ? (
              `${completedTasks} of ${totalTasks} tasks completed`
            ) : (
              "Stay organized and productive"
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <LogoutButton />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <ApperIcon name="Filter" className="w-4 h-4" />
          </Button>

          <Button onClick={onAddTask} className="inline-flex items-center gap-2">
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar 
            onSearch={onSearch}
            placeholder="Search tasks..."
          />
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: showFilters || window.innerWidth >= 1024 ? "auto" : 0,
            opacity: showFilters || window.innerWidth >= 1024 ? 1 : 0
          }}
          className="overflow-hidden lg:overflow-visible"
        >
          <FilterBar
            onFilterChange={onFilterChange}
            currentFilters={currentFilters}
            className="lg:flex-shrink-0"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Header