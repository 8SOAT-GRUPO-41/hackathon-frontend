import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/useAuthStore";
import { useNavigate } from "react-router-dom";
import videoService, { VideoData } from "@/lib/videoService";
import { Download, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ProcessingResults: React.FC = () => {
  const [results, setResults] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await videoService.getVideos(user.id);
        setResults(data);
      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [isAuthenticated, navigate, user]);

  const handleDownloadZip = async (videoId: string) => {
    try {
      const url = await videoService.getPresignedZipVideoDownloadUrl(videoId);
      if (url.downloadUrl) {
        window.open(url.downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Erro ao carregar vídeo para visualização:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(211,15,89)]" />
        <span className="ml-2">Carregando vídeos...</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {results.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          Você ainda não tem vídeos. Carregue seu primeiro vídeo na página de
          upload.
        </p>
      ) : (
        <div className="rounded-md border">
          <Table className="w-full ">
            <TableHeader className="hover:bg-transparent">
              <TableRow>
                <TableHead className="font-bold">Nome do Vídeo</TableHead>
                <TableHead className="font-bold">Descrição</TableHead>
                <TableHead className="font-bold">Carregado em</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Baixar (.zip)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((video) => (
                <TableRow key={video.id} className="align-middle">
                  <TableCell className="font-medium">{video.name}</TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={video.description || "-"}
                  >
                    {video.description || "-"}
                  </TableCell>
                  <TableCell>{formatDate(video.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={`inline-block rounded-full w-2 h-2 mr-2 ${
                          video.processingJob.currentStatus === "COMPLETED"
                            ? "bg-green-500"
                            : video.processingJob.currentStatus === "RUNNING" ||
                              video.processingJob.currentStatus === "QUEUED"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600 capitalize">
                        {video.processingJob.currentStatus === "COMPLETED"
                          ? "Concluído"
                          : video.processingJob.currentStatus === "RUNNING"
                          ? "Processando"
                          : video.processingJob.currentStatus === "QUEUED"
                          ? "Na fila"
                          : "Erro"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          video.processingJob.currentStatus !== "COMPLETED"
                        }
                        className={cn(
                          `${
                            video.processingJob.currentStatus === "COMPLETED" &&
                            "border-[rgb(211,15,89)] text-[rgb(211,15,89)] hover:bg-[rgb(211,15,89)]/10  cursor-pointer"
                          }`
                        )}
                        onClick={() => handleDownloadZip(video.id)}
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProcessingResults;
