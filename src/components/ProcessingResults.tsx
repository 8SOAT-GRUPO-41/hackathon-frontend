import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/useAuthStore'
import { useNavigate } from 'react-router-dom'

interface VideoResult {
  id: string
  fileName: string
  status: string
  downloadUrl?: string
}

const ProcessingResults: React.FC = () => {
  const [results, setResults] = useState<VideoResult[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchResults = async () => {
      try {
        // You might want to include authentication headers here
        const res = await fetch('/api/videos', {
          headers: {
            // Example of how you might include auth info in requests
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })

        if (res.ok) {
          const data = await res.json()
          setResults(data)
        }
      } catch (err) {
        console.error('Error fetching results:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [isAuthenticated, navigate])

  if (loading) {
    return <p className="p-4">Loading processing results...</p>
  }

  return (
    <div className="p-4 space-y-4">
      {user && <p className="mb-4">Logged in as: {user.email}</p>}
      {results.map((video) => (
        <Card key={video.id} className="p-4">
          <h3 className="text-xl font-bold">{video.fileName}</h3>
          <p>Status: {video.status}</p>
          {video.downloadUrl && <Button>Download ZIP</Button>}
        </Card>
      ))}
    </div>
  )
}

export default ProcessingResults
