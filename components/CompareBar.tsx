"use client";

import { useRouter } from "next/navigation";
import { X, GitCompare } from "lucide-react";
import { useCompare } from "./CompareContext";
import { allInstallers } from "@/data/installers/index";

export default function CompareBar() {
  const { ids, toggle, clear } = useCompare();
  const router = useRouter();

  if (ids.length === 0) return null;

  const selected = ids.map((id) => allInstallers.find((i) => i.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-500 shrink-0">
            Comparing {ids.length}/4:
          </span>
          <div className="flex items-center gap-2">
            {selected.map((inst) =>
              inst ? (
                <div
                  key={inst.id}
                  className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1 text-xs font-medium text-green-800 shrink-0"
                >
                  <span className="max-w-[120px] truncate">{inst.name}</span>
                  <button
                    onClick={() => toggle(inst.id)}
                    className="text-green-500 hover:text-green-800"
                    aria-label={`Remove ${inst.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : null
            )}
            {ids.length < 4 && (
              <div className="flex items-center gap-1 border-2 border-dashed border-gray-300 rounded-lg px-3 py-1 text-xs text-gray-400 shrink-0">
                + Add {4 - ids.length} more
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clear}
            className="text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => router.push(`/compare?ids=${ids.join(",")}`)}
            disabled={ids.length < 2}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <GitCompare className="w-4 h-4" />
            Compare {ids.length < 2 ? "(select 2+)" : "Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
