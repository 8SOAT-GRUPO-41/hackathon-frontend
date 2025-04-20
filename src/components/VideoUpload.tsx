/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [frames, setFrames] = useState<number>(10); // default number of frames
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return alert("Please select a video file.");
    }
    const formData = new FormData();
    formData.append("video", file);
    formData.append("frames", frames.toString());

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      alert("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <span className="text-sm text-gray-500">Vídeo</span>
        <div
          onClick={triggerFileInput}
          className="border border-input rounded-md h-10 px-3 py-2 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          {file ? (
            <span className="truncate">{file.name}</span>
          ) : (
            <>
              <Upload size={18} />
              <span>Selecionar vídeo</span>
            </>
          )}
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div>
        <span className="text-sm text-gray-500">Número de frames</span>
        <Input
          type="number"
          value={frames}
          onChange={(e) => setFrames(Number(e.target.value))}
          placeholder="Number of frames"
          className="w-30"
          min="1"
        />
      </div>
      <Button
        type="submit"
        disabled={uploading}
        className="cursor-pointer bg-[rgb(211,15,89)] hover:bg-[rgb(211,15,89)]/80 text-white mt-2"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Carregar vídeo
          </>
        )}
      </Button>
    </form>
  );
};

export default VideoUpload;
