/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import categoryService, {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../services/category.service";
import { ICategory } from "../types";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getMyCategories();
      setCategories(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData: CreateCategoryDTO) => {
    setLoading(true);
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories((prev) => [...prev, newCategory]);
    } catch (err: any) {
      setError(err);
      console.error("Failed to add category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (
    categoryId: string,
    updateData: UpdateCategoryDTO
  ) => {
    setLoading(true);
    try {
      const updatedCategory = await categoryService.updateCategory(
        categoryId,
        updateData
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? updatedCategory : cat))
      );
    } catch (err: any) {
      setError(err);
      console.error("Failed to update category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (categoryId: string) => {
    setLoading(true);
    try {
      await categoryService.deleteCategory(categoryId);
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    } catch (err: any) {
      setError(err);
      console.error("Failed to delete category:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
    refetch: fetchCategories,
  };
};
