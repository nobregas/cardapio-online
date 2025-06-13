import api from "./api";
import { ICategory } from "../types";

export interface CreateCategoryDTO {
  name: string;
  description: string;
  order: number;
  image?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  order?: number;
  image?: string;
}

class CategoryService {
  private readonly baseEndpoint = "/category";

  async getMyCategories(): Promise<ICategory[]> {
    const { data } = await api.get<ICategory[]>(`${this.baseEndpoint}/`);
    return data;
  }

  async getCategoryById(categoryId: string): Promise<ICategory> {
    const { data } = await api.get<ICategory>(
      `${this.baseEndpoint}/${categoryId}`
    );
    return data;
  }

  async createCategory(categoryData: CreateCategoryDTO): Promise<ICategory> {
    const url = `${this.baseEndpoint}/create`;

    const { data } = await api.post<ICategory>(url, categoryData);
    return data;
  }

  async updateCategory(
    categoryId: string,
    categoryData: UpdateCategoryDTO
  ): Promise<ICategory> {
    const { data } = await api.patch<ICategory>(
      `${this.baseEndpoint}/${categoryId}`,
      categoryData
    );
    return data;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await api.delete(`${this.baseEndpoint}/${categoryId}`);
  }
}

export default new CategoryService();
