import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VideoResult {
  id: string
  fileName: string
  status: string
  downloadUrl?: string
}

const ProcessingResults: React.FC = () => {
  const [results, setResults] = useState<VideoResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/videos')
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
  }, [])

  if (loading) {
    return <p className="p-4">Loading processing results...</p>
  }

  return (
    <div className="p-4 space-y-4">
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
