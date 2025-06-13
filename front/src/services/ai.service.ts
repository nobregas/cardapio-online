/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatHistory } from "../types";
import api from "./api";

export const sendMessageToAI = async (
  message: string,
  history: ChatHistory[]
): Promise<string> => {
  try {
    const { data } = await api.post("/ai/generate", {
      message,
      history,
    });
    if (data && typeof data.response === "string") {
      return data.response;
    }
    throw new Error("Formato de resposta da API inválido.");
  } catch (error: any) {
    console.error("Erro ao enviar mensagem para a IA:", error);

    if (error?.errorCode === 40110 || error?.message?.includes("token")) {
      throw new Error("Sessão expirada. Por favor, faça login novamente.");
    }

    throw error;
  }
};
