import { toast } from "react-toastify"

export const categoryService = {
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
              Name: "color_c"
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

      const response = await apperClient.fetchRecords("category_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      // Map database fields to UI expected format
      return response.data.map(category => ({
        Id: category.Id,
        name: category.Name,
        color: category.color_c || "#5B4FE5",
        order: category.order_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
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
              Name: "color_c"
            }
          },
          {
            field: {
              Name: "order_c"
            }
          }
        ]
      };

      const response = await apperClient.getRecordById("category_c", parseInt(id), params);

      if (!response || !response.data) {
        throw new Error(`Category with id ${id} not found`);
      }

      // Map database fields to UI expected format
      return {
        Id: response.data.Id,
        name: response.data.Name,
        color: response.data.color_c || "#5B4FE5",
        order: response.data.order_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(categoryData) {
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
            Name: categoryData.name,
            color_c: categoryData.color || "#5B4FE5",
            order_c: categoryData.order || 1
          }
        ]
      };

      const response = await apperClient.createRecord("category_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create categories ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
            name: created.Name,
            color: created.color_c || "#5B4FE5",
            order: created.order_c
          };
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
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

      if (updates.name !== undefined) updateData.Name = updates.name;
      if (updates.color !== undefined) updateData.color_c = updates.color;
      if (updates.order !== undefined) updateData.order_c = updates.order;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("category_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update categories ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
            name: updated.Name,
            color: updated.color_c || "#5B4FE5",
            order: updated.order_c
          };
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord("category_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete categories ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
}