import { useState } from "react"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const FilterBar = ({ 
  onFilterChange, 
  currentFilters = { status: "all", priority: "all" },
  className 
}) => {
  const [filters, setFilters] = useState(currentFilters)

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = { status: "all", priority: "all" }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = filters.status !== "all" || filters.priority !== "all"

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <ApperIcon name="Filter" className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      <Select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="w-32"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </Select>

      <Select
        value={filters.priority}
        onChange={(e) => handleFilterChange("priority", e.target.value)}
        className="w-32"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs"
        >
          <ApperIcon name="X" className="w-3 h-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}

export default FilterBar