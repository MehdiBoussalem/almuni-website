import React from "react";

type Props = {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
};

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className = "",
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3 ${className}`}>
      <div className="text-sm text-gray-600">
        {total > 0 ? (
          <span>
            Affichage <span className="font-semibold text-bleu-fonce">{start}</span>
            –<span className="font-semibold text-bleu-fonce">{end}</span> sur
            <span className="font-semibold text-bleu-fonce"> {total}</span>
          </span>
        ) : (
          <span>Aucun résultat</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <select
            className="px-2 py-1 border border-gray-300 rounded-lg bg-white text-sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} / page
              </option>
            ))}
          </select>
        )}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
            onClick={() => canPrev && onPageChange(page - 1)}
            disabled={!canPrev}
          >
            Précédent
          </button>
          <span className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> / {totalPages}
          </span>
          <button
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50"
            onClick={() => canNext && onPageChange(page + 1)}
            disabled={!canNext}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
