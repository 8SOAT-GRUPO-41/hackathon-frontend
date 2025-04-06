import React from 'react'
import VideoUpload from '../components/VideoUpload'
import Layout from '@/layouts/SignedInLayout'

const UploadPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Layout>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <VideoUpload />
        </main>
      </Layout>
    </div>
  )
}

export default UploadPage
