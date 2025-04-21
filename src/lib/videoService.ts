import api from "./api";

interface PresignedUrlResponse {
  videoId: string;
  uploadPresignedUrl: string;
}

interface PresignedZipVideoDownloadUrlResponse {
  downloadUrl: string;
}

export interface VideoData {
  id: string;
  userId: string;
  name: string;
  originalKey: string;
  description: string;
  createdAt: string;
  processingJob: {
    id: string;
    videoId: string;
    requestedAt: string;
    statusHistory: {
      jobId: string;
      status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";
      changedAt: string;
    }[];
    notifications: unknown[];
    currentStatus: string;
  };
  downloadUrl?: string;
  viewUrl?: string;
}

export const videoService = {
  /**
   * Solicita uma URL pré-assinada para upload de vídeo
   * @param fileName Nome do arquivo
   * @param fileType Tipo MIME do arquivo
   * @param frameCount Número de frames a serem extraídos
   */
  getPresignedUrl: async (
    name: string,
    description?: string
  ): Promise<PresignedUrlResponse> => {
    const response = await api.post("/videos", {
      name,
      description,
    });
    return response.data;
  },

  getPresignedZipVideoDownloadUrl: async (
    videoId: string
  ): Promise<PresignedZipVideoDownloadUrlResponse> => {
    console.log("videoId", videoId);
    const response = await api.get(`/videos/download/${videoId}`);
    console.log("response", response);
    return response.data;
  },

  /**
   * Realiza o upload do arquivo diretamente para o S3 usando URL pré-assinada
   * @param presignedUrl URL pré-assinada
   * @param file Arquivo a ser enviado
   */
  uploadToS3: async (presignedUrl: string, file: File): Promise<void> => {
    console.log("Iniciando upload para S3...");
    console.log(presignedUrl);
    console.log(file);
    try {
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          // Importante para assegurar que o conteúdo não seja transformado durante o upload
          //   "Content-Length": file.size.toString(),'
          "Cache-Control": "no-cache",
        },
      });
      console.log("Upload para S3 concluído com sucesso:");
    } catch (error) {
      console.error("Erro durante upload para S3:", error);
      throw error;
    }
  },

  /**
   * Obtém a lista de vídeos do usuário
   * @param userId ID do usuário
   */
  getVideos: async (userId: string): Promise<VideoData[]> => {
    const response = await api.get(`/videos/user/${userId}`);
    return response.data;
  },

  /**
   * Obtém os detalhes de um vídeo específico
   * @param videoId ID do vídeo
   */
  getVideoDetails: async (videoId: string): Promise<VideoData> => {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  },

  /**
   * Obtém URL para visualização do vídeo
   * @param videoId ID do vídeo
   */
  getVideoViewUrl: async (videoId: string): Promise<string> => {
    const response = await api.get(`/videos/${videoId}/view`);
    return response.data.url;
  },
};

export default videoService;
