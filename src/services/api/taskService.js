import { toast } from "react-toastify"

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "categoryId_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "dueDate_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "createdAt_c"
            }
          },
          {
            field: {
              Name: "order_c"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "order_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI expected format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c || "",
        categoryId: task.categoryId_c?.Id ? task.categoryId_c.Id.toString() : task.categoryId_c,
        priority: task.priority_c || "medium",
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c,
        order: task.order_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "categoryId_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "dueDate_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "createdAt_c"
            }
          },
          {
            field: {
              Name: "order_c"
            }
          }
        ]
      };

      const response = await apperClient.getRecordById("task_c", parseInt(id), params);

      if (!response || !response.data) {
        throw new Error(`Task with id ${id} not found`);
      }

      // Map database fields to UI expected format
      return {
        Id: response.data.Id,
        title: response.data.title_c,
        description: response.data.description_c || "",
        categoryId: response.data.categoryId_c?.Id ? response.data.categoryId_c.Id.toString() : response.data.categoryId_c,
        priority: response.data.priority_c || "medium",
        dueDate: response.data.dueDate_c,
        completed: response.data.completed_c || false,
        createdAt: response.data.createdAt_c,
        order: response.data.order_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "categoryId_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "dueDate_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "createdAt_c"
            }
          },
          {
            field: {
              Name: "order_c"
            }
          }
        ],
        where: [
          {
            FieldName: "categoryId_c",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ],
        orderBy: [
          {
            fieldName: "order_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI expected format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c || "",
        categoryId: task.categoryId_c?.Id ? task.categoryId_c.Id.toString() : task.categoryId_c,
        priority: task.priority_c || "medium",
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c,
        order: task.order_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI fields to database fields (only Updateable fields)
      const params = {
        records: [
          {
            title_c: taskData.title,
            description_c: taskData.description || "",
            categoryId_c: parseInt(taskData.categoryId),
            priority_c: taskData.priority || "medium",
            dueDate_c: taskData.dueDate || null,
            completed_c: false,
            createdAt_c: new Date().toISOString(),
            order_c: taskData.order || 1
          }
        ]
      };

      const response = await apperClient.createRecord("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          const created = successfulRecords[0].data;
          // Map back to UI format
          return {
            Id: created.Id,
            title: created.title_c,
            description: created.description_c || "",
            categoryId: created.categoryId_c?.Id ? created.categoryId_c.Id.toString() : created.categoryId_c,
            priority: created.priority_c || "medium",
            dueDate: created.dueDate_c,
            completed: created.completed_c || false,
            createdAt: created.createdAt_c,
            order: created.order_c
          };
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Map UI fields to database fields (only Updateable fields)
      const updateData = {
        Id: parseInt(id)
      };

      if (updates.title !== undefined) updateData.title_c = updates.title;
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.categoryId !== undefined) updateData.categoryId_c = parseInt(updates.categoryId);
      if (updates.priority !== undefined) updateData.priority_c = updates.priority;
      if (updates.dueDate !== undefined) updateData.dueDate_c = updates.dueDate;
      if (updates.completed !== undefined) updateData.completed_c = updates.completed;
      if (updates.order !== undefined) updateData.order_c = updates.order;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          // Map back to UI format
          return {
            Id: updated.Id,
            title: updated.title_c,
            description: updated.description_c || "",
            categoryId: updated.categoryId_c?.Id ? updated.categoryId_c.Id.toString() : updated.categoryId_c,
            priority: updated.priority_c || "medium",
            dueDate: updated.dueDate_c,
            completed: updated.completed_c || false,
            createdAt: updated.createdAt_c,
            order: updated.order_c
          };
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async toggleComplete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // First get the current task to toggle its completed status
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error(`Task with id ${id} not found`);
      }

      const params = {
        records: [
          {
            Id: parseInt(id),
            completed_c: !currentTask.completed
          }
        ]
      };

      const response = await apperClient.updateRecord("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to toggle task completion ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          // Map back to UI format
          return {
            Id: updated.Id,
            title: updated.title_c,
            description: updated.description_c || "",
            categoryId: updated.categoryId_c?.Id ? updated.categoryId_c.Id.toString() : updated.categoryId_c,
            priority: updated.priority_c || "medium",
            dueDate: updated.dueDate_c,
            completed: updated.completed_c || false,
            createdAt: updated.createdAt_c,
            order: updated.order_c
          };
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async reorder(taskIds) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Create update records for each task with new order
      const updateRecords = taskIds.map((id, index) => ({
        Id: parseInt(id),
        order_c: index + 1
      }));

      const params = {
        records: updateRecords
      };

      const response = await apperClient.updateRecord("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Return all tasks in new order
      return this.getAll();
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error reordering tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "title_c"
            }
          },
          {
            field: {
              Name: "description_c"
            }
          },
          {
            field: {
              Name: "categoryId_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "dueDate_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "createdAt_c"
            }
          },
          {
            field: {
              Name: "order_c"
            }
          }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description_c",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "order_c",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords("task_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI expected format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c,
        description: task.description_c || "",
        categoryId: task.categoryId_c?.Id ? task.categoryId_c.Id.toString() : task.categoryId_c,
        priority: task.priority_c || "medium",
        dueDate: task.dueDate_c,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c,
        order: task.order_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
}