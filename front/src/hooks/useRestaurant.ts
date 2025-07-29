import { useState, useCallback } from "react";
import restaurantService, {
  IRestaurant,
  CreateRestaurantDTO,
  UpdateRestaurantDTO,
  UpdateRestaurantAddressDTO,
  PaymentSettingsDTO,
} from "../services/restaurant.service";

interface UseRestaurantReturn {
  // Estados
  restaurant: IRestaurant | null;
  loading: boolean;
  error: string | null;

  // Ações
  createRestaurant: (data: CreateRestaurantDTO) => Promise<IRestaurant | null>;
  getRestaurantById: (id: string) => Promise<IRestaurant | null>;
  getRestaurantByOwnerId: () => Promise<IRestaurant | null>;
  updateRestaurant: (
    id: string,
    data: UpdateRestaurantDTO
  ) => Promise<IRestaurant | null>;
  updateRestaurantAddress: (
    id: string,
    data: UpdateRestaurantAddressDTO
  ) => Promise<IRestaurant | null>;
  deleteRestaurant: (id: string) => Promise<boolean>;
  updatePaymentSettings: (
    data: PaymentSettingsDTO
  ) => Promise<IRestaurant | null>;
  clearError: () => void;
  resetState: () => void;
}

export const useRestaurant = (): UseRestaurantReturn => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsync = useCallback(
    async <T>(asyncOperation: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncOperation();
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createRestaurant = useCallback(
    async (data: CreateRestaurantDTO): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.create(data);
        setRestaurant(result);
        return result;
      });
    },
    [handleAsync]
  );

  const getRestaurantById = useCallback(
    async (id: string): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.getById(id);
        setRestaurant(result);
        return result;
      });
    },
    [handleAsync]
  );

  const getRestaurantByOwnerId =
    useCallback(async (): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.getByOwnerId();
        setRestaurant(result);
        return result;
      });
    }, [handleAsync]);

  const updateRestaurant = useCallback(
    async (
      id: string,
      data: UpdateRestaurantDTO
    ): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.update(id, data);
        setRestaurant(result);

        return result;
      });
    },
    [handleAsync]
  );

  const updateRestaurantAddress = useCallback(
    async (
      id: string,
      data: UpdateRestaurantAddressDTO
    ): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.updateAddress(id, data);
        setRestaurant(result);

        return result;
      });
    },
    [handleAsync]
  );

  const updatePaymentSettings = useCallback(
    async (data: PaymentSettingsDTO): Promise<IRestaurant | null> => {
      return handleAsync(async () => {
        const result = await restaurantService.updatePaymentSettings(data);
        setRestaurant(result);

        return result;
      });
    },
    [handleAsync]
  );

  const deleteRestaurant = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await handleAsync(async () => {
        await restaurantService.delete(id);

        // Limpar o restaurant atual se for o mesmo que foi deletado
        if (restaurant?._id === id) {
          setRestaurant(null);
        }

        return true;
      });

      return result !== null;
    },
    [handleAsync, restaurant]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setRestaurant(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    // Estados
    restaurant,
    loading,
    error,

    // Ações
    createRestaurant,
    getRestaurantById,
    getRestaurantByOwnerId,
    updateRestaurant,
    updateRestaurantAddress,
    updatePaymentSettings,
    deleteRestaurant,
    clearError,
    resetState,
  };
};
