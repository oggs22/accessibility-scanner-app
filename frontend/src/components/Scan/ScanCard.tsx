import { Link } from 'react-router-dom';
import type { Scan } from '../../types/scan';
import { Button } from '../UI/Button';
import getFormatDate from '../../utils/getFormatDate';

interface ScanCardProps {
  scan: Scan;
  onDelete: (id: string) => void;
  deleting?: boolean;
}

export const ScanCard = ({ scan, onDelete, deleting }: ScanCardProps) => {
  const getStatusColor = (status: Scan['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Scan #{scan._id.slice(-6)}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scan.status)}`}>
              {scan.status}
            </span>
            <span className="text-sm text-gray-500">
              {getFormatDate(scan.createdAt)}
            </span>
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => onDelete(scan._id)}
          loading={deleting}
          size="sm"
        >
          Delete
        </Button>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2">URLs:</h4>
        <div className="space-y-1">
          {scan.urls.map((url, index) => (
            <div key={index} className="text-sm text-gray-600 truncate">
              {url}
            </div>
          ))}
        </div>
      </div>

      <Link
        to={`/scan/${scan._id}`}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        View Details →
      </Link>
    </div>
  );
};