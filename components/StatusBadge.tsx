interface StatusBadgeProps {
  status: "normal" | "unqualified" | "overtime" | "qualified"
}

const statusConfig = {
  normal: {
    label: "正常",
    className: "bg-blue-50 text-blue-800",
  },
  unqualified: {
    label: "不合格",
    className: "bg-red-50 text-red-800",
  },
  overtime: {
    label: "超时未完成",
    className: "bg-orange-50 text-orange-800",
  },
  qualified: {
    label: "合格",
    className: "bg-green-50 text-green-800",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}

