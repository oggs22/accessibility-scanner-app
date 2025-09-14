import type { Scan, Violation } from "../../types/scan";

interface ScanDetailsProps {
  scan: Scan;
}

export const ScanDetails = ({ scan }: ScanDetailsProps) => {
  const impactLevels = ["critical", "serious", "moderate", "minor"] as const;

  const groupByImpact = (violations: Violation[]) => {
    return impactLevels
      .map((impact) => ({
        impact,
        violations: violations.filter((v) => v.impact === impact),
      }))
      .filter((group) => group.violations.length > 0);
  };

  const getDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Scan Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Status:</label>
            <p className="capitalize">{scan.status}</p>
          </div>
          <div>
            <label className="font-semibold">Created:</label>
            <p>{getDate(scan.createdAt)}</p>
          </div>
          <div>
            <label className="font-semibold">URLs:</label>
            <p>{scan.urls.length}</p>
          </div>
        </div>
      </div>

      {scan.results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            {result.url}
          </h2>

          {result.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">Error:</h3>
              <p className="text-red-600">{result.error}</p>
            </div>
          ) : result.violations.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">✅ No accessibility issues found</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {result.violations.length} violation(s) found
              </h3>

              {groupByImpact(result.violations).map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="border rounded-lg overflow-hidden"
                >
                  <div
                    className={`bg-${
                      group.impact === "critical"
                        ? "red"
                        : group.impact === "serious"
                        ? "orange"
                        : "yellow"
                    }-100 px-4 py-2 font-semibold capitalize`}
                  >
                    {group.impact} ({group.violations.length})
                  </div>

                  <div className="p-4 space-y-4">
                    {group.violations.map((violation, violationIndex) => (
                      <div
                        key={violationIndex}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <h4 className="font-semibold text-gray-800">
                          {violation.id}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {violation.description}
                        </p>

                        {violation.nodes.length > 0 && (
                          <div className="mt-2">
                            <h5 className="font-medium text-sm text-gray-700">
                              Affected elements:
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1 mt-1">
                              {violation.nodes
                                .slice(0, 3)
                                .map((node, nodeIndex) => (
                                  <li
                                    key={nodeIndex}
                                    className="bg-gray-50 p-2 rounded"
                                  >
                                    <code className="text-xs">
                                      {node.target.join(" ")}
                                    </code>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {scan.error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">Scan Error:</h3>
              <p className="text-red-600">{scan.error}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
