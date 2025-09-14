import { useParams } from 'react-router-dom'
import { useScan } from '../hooks/useScan'
import { ScanDetails as ScanDetailsComponent } from '../components/Scan/ScanDetails'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'
import { Button } from '../components/UI/Button'
import { Link } from 'react-router-dom'

export const ScanDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: scan, isLoading, error } = useScan(id!)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="text-center">
        <div className="text-red-600 mb-4">Error loading scan details</div>
        <Link to="/scans">
          <Button variant="secondary">
            Back to Scan List
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/scans" className="text-blue-600 hover:text-blue-800">
          ← Back to Scan List
        </Link>
      </div>
      <ScanDetailsComponent scan={scan} />
    </div>
  )
}