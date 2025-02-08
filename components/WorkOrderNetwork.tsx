"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateNetworkData } from "@/utils/mockData"
import { ResponsiveNetwork } from "@nivo/network"

export function WorkOrderNetwork() {
  const data = generateNetworkData()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>工单流转网络分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveNetwork
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            linkDistance={function(e){return e.distance}}
            centeringStrength={0.3}
            repulsivity={6}
            nodeSize={function(n){return n.size}}
            activeNodeSize={function(n){return 1.5*n.size}}
            nodeColor={function(e){return e.color}}
            nodeBorderWidth={1}
            nodeBorderColor={{
              from: 'color',
              modifiers: [['darker', 0.8]]
            }}
            linkThickness={function(n){return 2+2*n.target.data.height}}
            linkBlendMode="multiply"
            motionConfig="gentle"
          />
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>• 节点大小表示工单处理量</p>
          <p>• 连线粗细表示流转频率</p>
          <p>• 颜色深浅表示处理时长</p>
        </div>
      </CardContent>
    </Card>
  )
} 