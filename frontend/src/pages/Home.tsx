import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

export const Home = () => {
    return(
    <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Accessibility Scanner
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Scan your websites for accessibility issues
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link to="/new-scan">
              <Button size="lg" className="w-full sm:w-auto">
                Start New Scan
              </Button>
            </Link>
            <Link to="/scans">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Previous Scans
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;