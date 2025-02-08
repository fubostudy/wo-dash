"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts"

const data = [
  { x: 45, y: 92, z: 200, name: "工单A", department: "客房服务" },
  { x: 32, y: 85, z: 260, name: "工单B", department: "餐饮" },
  { x: 58, y: 95, z: 400, name: "工单C", department: "前台" },
  { x: 41, y: 88, z: 280, name: "工单D", department: "客房服务" },
  { x: 37, y: 90, z: 500, name: "工单E", department: "餐饮" },
  { x: 52, y: 93, z: 200, name: "工单F", department: "前台" },
]

const departmentColors = {
  "客房服务": colors.chart.blue,
  "餐饮": colors.chart.orange,
  "前台": colors.chart.purple
}

export function MultiDimensionalScatter() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>工单多维度分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey="x" 
                name="工单数量" 
                unit="个"
                label={{ value: '工单数量（个）', position: 'bottom' }} 
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="合格率" 
                unit="%"
                domain={[80, 100]}
                label={{ value: '工单合格率（%）', angle: -90, position: 'left' }} 
              />
              <ZAxis 
                type="number" 
                dataKey="z" 
                range={[60, 400]} 
                name="员工效率" 
                unit="分/小时" 
              />
              <Tooltip 
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border border-gray-200 shadow-sm">
                        <p className="font-bold">{data.name} ({data.department})</p>
                        <p>工单数量: {data.x}个</p>
                        <p>合格率: {data.y}%</p>
                        <p>员工效率: {data.z}分/小时</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {Object.entries(departmentColors).map(([department, color]) => (
                <Scatter 
                  key={department}
                  name={department} 
                  data={data.filter(item => item.department === department)} 
                  fill={color}
                  shape="circle"
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 横轴表示工单数量</p>
          <p>• 纵轴表示工单合格率</p>
          <p>• 气泡大小表示员工效率</p>
          <div className="flex gap-4 mt-2">
            {Object.entries(departmentColors).map(([department, color]) => (
              <div key={department} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span>{department}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 