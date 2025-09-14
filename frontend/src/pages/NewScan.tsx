import React from 'react'
import { ScanForm } from '../components/Scan/ScanForm'
import { useCreateScan } from '../hooks/useScan'
import { useNavigate } from 'react-router-dom'

export const NewScan: React.FC = () => {
  const createScan = useCreateScan()
  const navigate = useNavigate()

  const handleSubmit = async (urls: string[]) => {
    try {
      const result = await createScan.mutateAsync({ urls })
      navigate(`/scan/${result._id}`)
    } catch (error) {
      console.error('Error creating scan:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Accessibility Scan</h1>
      <ScanForm 
        onSubmit={handleSubmit} 
        loading={createScan.isLoading} 
      />
    </div>
  )
}