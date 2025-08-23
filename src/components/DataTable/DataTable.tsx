import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  };

  const toggleSelect = (id: string | number) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
    onRowSelect?.(data.filter((row) => newSelected.has(row.id)));
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredData.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(filteredData.map((row) => row.id));
      setSelected(all);
      onRowSelect?.(filteredData);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const column = columns.find((c) => c.key === sortKey);
    if (!column) return data;
    return [...data].sort((a, b) => {
      const aVal = a[column.dataIndex];
      const bVal = b[column.dataIndex];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortAsc, columns]);

  const filteredData = sortedData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!loading && data.length === 0)
    return <div className="text-center p-6">No data available</div>;

  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-5 border border-gray-300 rounded-md"
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {selectable && (
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={
                      selected.size === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={`p-3 font-medium text-gray-700 select-none ${
                    col.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                  }`}
                >
                  {col.title}
                  {sortKey === col.key && (sortAsc ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-t transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                {selectable && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      aria-label={`Select row ${row.id}`}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-3 text-gray-800">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
