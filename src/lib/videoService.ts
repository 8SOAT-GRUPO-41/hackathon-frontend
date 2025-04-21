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
    const response = await api.get(`/videos/download/${videoId}`);
    return response.data;
  },

  uploadToS3: async (presignedUrl: string, file: File): Promise<void> => {
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
