/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export interface PaymentSettingsDTO {
  online: {
    active: boolean;
    methods: {
      creditCard: boolean;
      debitCard: boolean;
      pix: boolean;
    };
  };
  onDelivery: {
    active: boolean;
    methods: {
      cash: boolean;
      creditCard: boolean;
      debitCard: boolean;
      pix: boolean;
    };
    needsChange: boolean;
  };
  pixDetails: {
    key: string;
    keyHolderName: string;
  };
  additionalInstructions?: string;
}

export interface CreateRestaurantDTO {
  name: string;
  cnpj: string;
  logo?: string;
  email: string;
  description?: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentSettings?: PaymentSettingsDTO;
}

export interface UpdateRestaurantAddressDTO {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UpdateRestaurantDTO {
  name?: string;
  logo?: string;
  description?: string;
  phone?: string;
  address?: UpdateRestaurantAddressDTO;
}

export interface IRestaurant {
  _id: string;
  name: string;
  cnpj: string;
  logo: string;
  email: string;
  description: string;
  phone: string;
  ownerId: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentSettings?: PaymentSettingsDTO;
  createdAt: string;
  updatedAt: string;
}

class RestaurantService {
  private readonly baseEndpoint = "/restaurant";

  /**
   * Criar um novo restaurante
   */
  async create(restaurantData: CreateRestaurantDTO): Promise<IRestaurant> {
    try {
      const response = await api.post<IRestaurant>(
        `${this.baseEndpoint}/create`,
        restaurantData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Buscar todos os restaurantes
   */
  async getAll(): Promise<IRestaurant[]> {
    try {
      const response = await api.get<IRestaurant[]>(`${this.baseEndpoint}/all`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Buscar restaurante por ID
   */
  async getById(id: string): Promise<IRestaurant> {
    try {
      const response = await api.get<IRestaurant>(`${this.baseEndpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Buscar restaurante por ID do proprietário
   */
  async getByOwnerId(): Promise<IRestaurant> {
    try {
      const response = await api.get<IRestaurant>(`${this.baseEndpoint}/owner`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Atualizar dados do restaurante
   */
  async update(
    id: string,
    updateData: UpdateRestaurantDTO
  ): Promise<IRestaurant> {
    try {
      const response = await api.patch<IRestaurant>(
        `${this.baseEndpoint}/update/${id}`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Atualizar apenas o endereço do restaurante
   */
  async updateAddress(
    id: string,
    addressData: UpdateRestaurantAddressDTO
  ): Promise<IRestaurant> {
    try {
      const response = await api.patch<IRestaurant>(
        `${this.baseEndpoint}/${id}/update_address`,
        addressData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Atualizar configurações de pagamento
   */
  async updatePaymentSettings(
    paymentSettings: PaymentSettingsDTO
  ): Promise<IRestaurant> {
    try {
      const response = await api.patch<IRestaurant>(
        `${this.baseEndpoint}/payment-settings`,
        paymentSettings
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Deletar restaurante
   */
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseEndpoint}/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Tratamento de erros centralizados
   */
  private handleError(error: any): Error {
    if (error?.message) {
      return new Error(error.message);
    }

    if (error?.error) {
      return new Error(error.error);
    }

    return new Error("Erro inesperado ao processar solicitação");
  }
}

export default new RestaurantService();
