import React from "react";
import VideoUpload from "../components/VideoUpload";
import Layout from "@/layouts/SignedInLayout";

const UploadPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Layout>
        <div className="w-full max-w-md bg-white p-6">
          <div className="flex items-center justify-between border-l-4 border-l-[rgb(211,15,89)] mb-6">
            <h1 className="text-[rgb(211,15,89)] text-2xl font-bold ml-1 p-1">
              Carregar um Vídeo
            </h1>
          </div>
          <div className="p-2">
            <VideoUpload />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UploadPage;
