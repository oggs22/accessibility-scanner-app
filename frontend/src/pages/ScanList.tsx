import { useScans, useDeleteScan } from '../hooks/useScan'
import { ScanCard } from '../components/Scan/ScanCard'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'

export const ScanList = () => {
  const { data: scans, isLoading, error } = useScans()
  const deleteScan = useDeleteScan()

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this scan?')) {
      await deleteScan.mutateAsync(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading scans: {(error as Error).message}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scan History</h1>
      </div>

      {scans?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No scans yet</p>
          <p className="text-gray-500">Start your first scan to see results here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {scans?.map((scan) => (
            <ScanCard
              key={scan._id}
              scan={scan}
              onDelete={handleDelete}
              deleting={deleteScan.isLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScanList;
