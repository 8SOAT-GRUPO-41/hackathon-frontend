import React from 'react'
import Sidebar from '../components/Sidebar'
import VideoUpload from '../components/VideoUpload'

const UploadPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
        <VideoUpload />
      </main>
    </div>
  )
}

export default UploadPage
