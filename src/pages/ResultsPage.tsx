import React from 'react'
import Sidebar from '../components/Sidebar'
import ProcessingResults from '../components/ProcessingResults'

const ResultsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Processing Results</h1>
        <ProcessingResults />
      </main>
    </div>
  )
}

export default ResultsPage
