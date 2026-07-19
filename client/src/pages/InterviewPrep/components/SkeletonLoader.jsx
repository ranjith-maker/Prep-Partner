
import React from "react";

export default function SkeletonLoader() {
  return (
    <div role="status" className="max-w-3xl animate-pulse space-y-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-4">
          {/* Section Title */}
          <div className="h-6 w-2/5 rounded-md bg-gray-200 dark:bg-gray-400"></div>

          {/* Paragraph */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-500"></div>
            <div className="h-3 w-11/12 rounded bg-gray-200 dark:bg-gray-500"></div>
            <div className="h-3 w-10/12 rounded bg-gray-200 dark:bg-gray-500"></div>
            <div className="h-3 w-9/12 rounded bg-gray-200 dark:bg-gray-500"></div>
            <div className="h-3 w-8/12 rounded bg-gray-200 dark:bg-gray-500"></div>
          </div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}


