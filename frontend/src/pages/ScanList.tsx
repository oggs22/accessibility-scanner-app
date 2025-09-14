import { useScans, useDeleteScan } from "../hooks/useScan";
import { ScanCard } from "../components/Scan/ScanCard";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import getFormatDate from "../utils/getFormatDate";
import { useState } from "react";
import ConfirmationModal from "../components/UI/ConfirmationModal";

export const ScanList = () => {
  const { data: scans, isLoading, error } = useScans();
  const [showConfirm, setShowConfirm] = useState(false);
  const [scanToDelete, setScanToDelete] = useState<string | null>(null);
  const deleteScan = useDeleteScan();

  const handleDelete = async (id: string) => {
    setScanToDelete(id);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setScanToDelete(null);
    setShowConfirm(false);
  };

  const confirmDelete = async () => {
    if (scanToDelete) {
      await deleteScan.mutateAsync(scanToDelete);
      setScanToDelete(null);
      setShowConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading scans: {(error as Error).message}
      </div>
    );
  }

  const handleExportToExcel = () => {
    if (!scans || scans.length === 0) {
      return;
    }

    const headers = [
      "ID",
      "URL",
      "Status",
      "Datetime UTC",
      "Impact",
      "Vulnerability",
      "Description",
      "Affected Elements",
    ];

    console.log(scans);
    const csvRows = scans.flatMap((scan) => {
      return scan.results.flatMap((result) => {
        if (result.violations && result.violations.length > 0) {
          return result.violations.map((violation) => {
            const affectedElements = violation.nodes
              .map((node) => node.target.join(" "))
              .join(" | ");
            return [
              `"${scan._id}"`,
              `"${result.url}"`,
              `"${scan.status}"`,
              `"${getFormatDate(result.timestamp)}"`,
              `"${violation.impact}"`,
              `"${violation.id}"`,
              `"${violation.description}"`,
              `"${affectedElements}"`,
            ].join(",");
          });
        }
        return [];
      });
    });

    const csvString = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `historial_scans_${new Date().toISOString().slice(0, 10)}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scan History</h1>
        {scans && scans.length > 0 && (
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            Export to CSV
          </button>
        )}
      </div>

      {scans?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No scans yet</p>
          <p className="text-gray-500">
            Start your first scan to see results here
          </p>
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

      {showConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this scan?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ScanList;
