import React from 'react'
import ProcessingResults from '../components/ProcessingResults'
import Layout from '@/layouts/SignedInLayout'

const ResultsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Layout>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Processing Results</h1>
          <ProcessingResults />
        </main>
      </Layout>
    </div>
  )
}

export default ResultsPage
