"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./StatusBadge"

const qualityData = {
  totalOrders: 100,
  qualifiedOrders: 85,
  unqualifiedOrders: 15,
}

const highFrequencyIssues = [
  { 
    issue: "床单清洁不达标", 
    space: "客房", 
    equipment: "床具",
    count: 12,
    employee: "张三"
  },
  { 
    issue: "空调温度异常", 
    space: "会议室", 
    equipment: "空调设备",
    count: 8,
    employee: "李四"
  },
  { 
    issue: "地毯污渍残留", 
    space: "大堂", 
    equipment: "清洁设备",
    count: 6,
    employee: "王五"
  },
  { 
    issue: "热水供应不稳定", 
    space: "客房", 
    equipment: "热水系统",
    count: 5,
    employee: "赵六"
  }
]

export function QualityControl() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>质量总控中心</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-lg font-semibold mb-2">当日质检统计</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>质检工单总数：</span>
              <span className="font-medium">{qualityData.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <StatusBadge status="qualified" />
              <span className="font-medium text-green-600">{qualityData.qualifiedOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <StatusBadge status="unqualified" />
              <span className="font-medium text-red-600">{qualityData.unqualifiedOrders}</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">高频问题追踪墙（近30天）</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>不合格项</TableHead>
                <TableHead>空间</TableHead>
                <TableHead>设施设备</TableHead>
                <TableHead>发生次数</TableHead>
                <TableHead>责任人</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highFrequencyIssues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>{issue.issue}</TableCell>
                  <TableCell>{issue.space}</TableCell>
                  <TableCell>{issue.equipment}</TableCell>
                  <TableCell className="font-medium">{issue.count}</TableCell>
                  <TableCell>{issue.employee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-sm text-gray-500">
            <p>• 展示近30天内频繁出现的质量问题</p>
            <p>• 帮助识别重点改进区域和设备</p>
            <p>• 追踪问题处理责任人</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

