"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { generateHeatMapData, generateTimeSeriesData } from "@/utils/mockData"
import { AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { HeatMap } from "./HeatMap"
import { StatusBadge } from "./StatusBadge"

export function WorkOrderOverview() {
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(30))
  const [heatMapType, setHeatMapType] = useState<'workload' | 'completion' | 'qualified'>('workload')
  const [heatMapData, setHeatMapData] = useState(generateHeatMapData('workload'))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            date: new Date().toISOString().split("T")[0],
            normalOrders: Math.floor(Math.random() * 50) + 50,
            unqualifiedOrders: Math.floor(Math.random() * 15) + 5,
            overtimeOrders: Math.floor(Math.random() * 10) + 3,
          },
        ]
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setHeatMapData(generateHeatMapData(heatMapType))
  }, [heatMapType])

  const latestData = timeSeriesData[timeSeriesData.length - 1]
  const totalOrders = latestData.normalOrders + latestData.unqualifiedOrders + latestData.overtimeOrders

  const pieData = [
    { name: "正常", value: latestData.normalOrders },
    { name: "不合格", value: latestData.unqualifiedOrders },
    { name: "超时未完成", value: latestData.overtimeOrders },
  ]

  const heatMapTypes = [
    { value: 'workload', label: '工单数量分布' },
    { value: 'completion', label: '完成率分布' },
    { value: 'qualified', label: '合格率分布' },
  ] as const

  return (
    <Card className="w-full col-span-2 bg-white shadow-sm">
      <CardHeader className="border-b border-gray-200">
        <CardTitle>工单执行总览</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span>高优先级预警 (3)</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>A区域连续3天出现清洁质量问题，建议重点关注</span>
              <span className="text-red-600">›</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg cursor-pointer hover:bg-red-50 transition-colors">
              <span>张三今日已有5个工单超时，可能需要工作量调整</span>
              <span className="text-red-600">›</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">今日工单总量</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">150</span>
              <span className="text-sm text-green-600">↑ 12%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">较昨日 +18单</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">准时完成率</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">86.5%</span>
              <span className="text-sm text-red-600">↓ 2.1%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">目标 90%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">质检合格率</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">92.3%</span>
              <span className="text-sm text-green-600">↑ 1.4%</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">目标 95%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">平均处理时长</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">32分</span>
              <span className="text-sm text-green-600">↑ 效率提升</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">标准 45分钟</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">工单健康度</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={colors.chart.blue} />
                  <Cell fill={colors.chart.red} />
                  <Cell fill={colors.chart.orange} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">当日工单统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">总指令</span>
                <span className="font-medium text-gray-900">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="normal" />
                <span className="font-medium text-blue-600">{latestData.normalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="unqualified" />
                <span className="font-medium text-red-600">{latestData.unqualifiedOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <StatusBadge status="overtime" />
                <span className="font-medium text-orange-600">{latestData.overtimeOrders}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">工单趋势（近30天）</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeSeriesData}>
              <XAxis dataKey="date" stroke={colors.neutral[600]} />
              <YAxis stroke={colors.neutral[600]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="normalOrders" 
                name="正常" 
                stroke={colors.chart.blue} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="unqualifiedOrders" 
                name="不合格" 
                stroke={colors.chart.red} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="overtimeOrders" 
                name="超时未完成" 
                stroke={colors.chart.orange} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {heatMapData && heatMapData.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">作业指令分析热力图</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">工单数量分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('workload')} type="workload" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">完成率分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('completion')} type="completion" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-center text-gray-700">合格率分布</h4>
                <div className="h-[300px] w-full">
                  <HeatMap data={generateHeatMapData('qualified')} type="qualified" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>• 横轴表示工作日，纵轴表示时段</p>
              <p>• 颜色深浅表示数值大小</p>
              <p>• 可用于发现工作规律和异常模式</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

