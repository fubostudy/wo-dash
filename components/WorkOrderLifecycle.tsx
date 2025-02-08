"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { colors } from "@/utils/colors"
import { ResponsiveBar } from "@nivo/bar"

const data = [
  {
    stage: "创建",
    "平均时长": 5,
    "平均时长Color": colors.blue.primary,
  },
  {
    stage: "分派",
    "平均时长": 15,
    "平均时长Color": colors.blue.primary,
  },
  {
    stage: "接收",
    "平均时长": 10,
    "平均时长Color": colors.blue.primary,
  },
  {
    stage: "执行",
    "平均时长": 45,
    "平均时长Color": colors.blue.primary,
  },
  {
    stage: "验收",
    "平均时长": 20,
    "平均时长Color": colors.blue.primary,
  },
  {
    stage: "完成",
    "平均时长": 5,
    "平均时长Color": colors.blue.primary,
  },
]

export function WorkOrderLifecycle() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>工单生命周期分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveBar
            data={data}
            keys={["平均时长"]}
            indexBy="stage"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={({ id, data }) => data[`${id}Color`]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "阶段",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "平均时长（分钟）",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="工单生命周期分析"
            barAriaLabel={function (e) {
              return e.id + ": " + e.formattedValue + " 分钟 (" + e.indexValue + ")"
            }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 展示工单在各个阶段的平均处理时长</p>
          <p>• 帮助识别流程瓶颈，优化工作流程</p>
        </div>
      </CardContent>
    </Card>
  )
} 