import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const CategoryItem = ({ category, taskCount = 0, isActive = false }) => {
  const linkTo = category.Id === "all" ? "/" : `/category/${category.Id}`

  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) => cn(
        "sidebar-item",
        isActive && "active"
      )}
    >
      <div 
        className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium truncate">
          {category.name}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-white/20">
          {taskCount}
        </span>
        <ApperIcon name="ChevronRight" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </NavLink>
  )
}

export default CategoryItem