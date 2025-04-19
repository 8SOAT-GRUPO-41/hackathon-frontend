/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [frames, setFrames] = useState<number>(10); // default number of frames
  const [uploading, setUploading] = useState(false);

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

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <Input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
      <div>
        <Input
          type="number"
          value={frames}
          onChange={(e) => setFrames(Number(e.target.value))}
          placeholder="Number of frames"
          min="1"
        />
      </div>
      <Button
        type="submit"
        disabled={uploading}
        className="cursor-pointer bg-[rgb(211,15,89)] hover:bg-[rgb(211,15,89)]/80 text-white"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </Button>
    </form>
  );
};

export default VideoUpload;
