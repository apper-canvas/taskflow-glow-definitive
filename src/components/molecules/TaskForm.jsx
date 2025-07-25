import { useState } from "react"
import { format } from "date-fns"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Label from "@/components/atoms/Label"
import ApperIcon from "@/components/ApperIcon"

const TaskForm = ({ 
  onSubmit, 
  onCancel, 
  categories = [], 
  initialData = {},
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    categoryId: initialData.categoryId || (categories[0]?.Id?.toString() || ""),
    priority: initialData.priority || "medium",
    dueDate: initialData.dueDate ? format(new Date(initialData.dueDate), "yyyy-MM-dd") : ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      dueDate: formData.dueDate || null
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add task details (optional)"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            {categories.map(category => (
              <option key={category.Id} value={category.Id.toString()}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formData.title.trim() || isLoading}
          className="min-w-[100px]"
        >
          {isLoading ? (
            <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
          ) : (
            "Save Task"
          )}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm