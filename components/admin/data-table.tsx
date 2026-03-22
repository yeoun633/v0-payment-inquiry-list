"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Column<T> {
  key: keyof T | string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  totalCount?: number
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  selectable?: boolean
  selectedRows?: Set<number>
  onSelectionChange?: (selectedRows: Set<number>) => void
  emptyMessage?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  totalCount = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  emptyMessage = "데이터가 없습니다.",
}: DataTableProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize)
  
  const getValue = (row: T, key: string): T[keyof T] => {
    const keys = key.split(".")
    let value: unknown = row
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    return value as T[keyof T]
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(data.map((_, index) => index))
      onSelectionChange?.(newSelected)
    } else {
      onSelectionChange?.(new Set())
    }
  }

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    onSelectionChange?.(newSelected)
  }

  const isAllSelected = data.length > 0 && selectedRows.size === data.length

  return (
    <div className="w-full">
      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      selectedRows.has(rowIndex) && "bg-primary-light/50"
                    )}
                  >
                    {selectable && (
                      <td className="w-12 px-4 py-3">
                        <Checkbox
                          checked={selectedRows.has(rowIndex)}
                          onCheckedChange={(checked) =>
                            handleSelectRow(rowIndex, checked as boolean)
                          }
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => {
                      const value = getValue(row, column.key as string)
                      return (
                        <td
                          key={colIndex}
                          className={cn(
                            "px-4 py-3 text-sm text-foreground whitespace-nowrap",
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right"
                          )}
                        >
                          {column.render ? column.render(value, row) : String(value ?? "-")}
                        </td>
                      )
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            총 <span className="font-medium text-foreground">{totalCount}</span>개
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page: number
              if (totalPages <= 5) {
                page = i + 1
              } else if (currentPage <= 3) {
                page = i + 1
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i
              } else {
                page = currentPage - 2 + i
              }
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              )
            })}
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
