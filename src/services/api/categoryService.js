import categoriesData from "@/services/mockData/categories.json"

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories].sort((a, b) => a.order - b.order)
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || "#5B4FE5",
      order: Math.max(...categories.map(c => c.order), 0) + 1
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(250)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    categories[index] = { ...categories[index], ...updates }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(200)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    const deletedCategory = categories[index]
    categories.splice(index, 1)
    return { ...deletedCategory }
  }
}