import React from "react";
import ProcessingResults from "../components/ProcessingResults";
import Layout from "@/layouts/SignedInLayout";

const ResultsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Layout>
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between border-l-4 border-l-[rgb(211,15,89)] mb-6">
            <h1 className="text-[rgb(211,15,89)] text-2xl font-bold ml-1 p-1">
              Meus Vídeos
            </h1>
          </div>
          <ProcessingResults />
        </main>
      </Layout>
    </div>
  );
};

export default ResultsPage;
