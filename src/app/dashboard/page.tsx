"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

const allNodes = [
  { id: "A", name: "Node A", loadMegawatts: 245.3, dollarsPerMegawatt: 12.5, kValue: 0.23, status: "normal", trend: "+2.4%", x: 150, y: 200 },
  { id: "B", name: "Node B", loadMegawatts: 423.7, dollarsPerMegawatt: 245.8, kValue: 0.67, status: "warning", trend: "+12.4%", x: 300, y: 120 },
  { id: "C", name: "Node C", loadMegawatts: 789.2, dollarsPerMegawatt: 1847.3, kValue: 0.89, status: "critical", trend: "+45.2%", x: 450, y: 200 },
  { id: "D", name: "Node D", loadMegawatts: 312.5, dollarsPerMegawatt: 78.4, kValue: 0.45, status: "normal", trend: "+5.1%", x: 600, y: 150 },
  { id: "E", name: "Node E", loadMegawatts: 187.9, dollarsPerMegawatt: 8.2, kValue: 0.12, status: "normal", trend: "-1.2%", x: 450, y: 320 },
];

const meshLinks = [
  { from: "A", to: "B", utilization: 45, capacity: 500 },
  { from: "A", to: "C", utilization: 78, capacity: 600 },
  { from: "B", to: "C", utilization: 92, capacity: 450 },
  { from: "C", to: "D", utilization: 67, capacity: 550 },
  { from: "C", to: "E", utilization: 34, capacity: 400 },
  { from: "D", to: "E", utilization: 56, capacity: 350 },
];

function getAdjacentNodes(nodeId: string) {
  const adjacentIds = new Set<string>();
  meshLinks.forEach((link) => {
    if (link.from === nodeId) adjacentIds.add(link.to);
    if (link.to === nodeId) adjacentIds.add(link.from);
  });
  return Array.from(adjacentIds);
}

const highestNode = allNodes.reduce((max, node) => (node.kValue > max.kValue ? node : max));
const adjacentIds = getAdjacentNodes(highestNode.id);
const pinnedNodes = [highestNode, ...allNodes.filter((n) => adjacentIds.includes(n.id))].slice(0, 4);

const gridNodes = allNodes.map((node) => ({
  id: node.id,
  x: node.x,
  y: node.y,
  scarcity: Math.round(node.kValue * 100),
  status: node.status,
}));

const scarcitySignals = [
  { node: "Node A", scarcity: 23, price: 12.5, direction: "Import", change: -2.3 },
  { node: "Node B", scarcity: 67, price: 245.8, direction: "Export", change: 12.4 },
  { node: "Node C", scarcity: 89, price: 1847.3, direction: "Import", change: 45.2 },
  { node: "Node D", scarcity: 45, price: 78.4, direction: "Export", change: 5.1 },
  { node: "Node E", scarcity: 12, price: 8.2, direction: "Import", change: -1.2 },
];

const positions = [
  { pair: "A→B", quantity: 100, avgPrice: 12.5, currentPrice: 13.2, pnl: 70, pnlPercent: 5.6 },
  { pair: "C→D", quantity: 50, avgPrice: 1750.0, currentPrice: 1847.3, pnl: 4865, pnlPercent: 5.5 },
  { pair: "E→A", quantity: 200, avgPrice: 8.0, currentPrice: 8.2, pnl: 40, pnlPercent: 2.5 },
  { pair: "B→C", quantity: 75, avgPrice: 250.0, currentPrice: 245.8, pnl: -315, pnlPercent: -1.7 },
];

const recentTrades = [
  { id: "1", from: "Node A", to: "Node B", amount: 100, price: 12.5, status: "completed", time: "10:30 AM" },
  { id: "2", from: "Node C", to: "Node D", amount: 200, price: 1847.3, status: "pending", time: "11:15 AM" },
  { id: "3", from: "Node E", to: "Node A", amount: 50, price: 8.2, status: "completed", time: "12:00 PM" },
  { id: "4", from: "Node B", to: "Node C", amount: 150, price: 245.8, status: "completed", time: "1:45 PM" },
  { id: "5", from: "Node D", to: "Node E", amount: 75, price: 78.4, status: "pending", time: "2:30 PM" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "critical":
      return "text-red-600 bg-red-100";
    case "warning":
      return "text-orange-600 bg-orange-100";
    case "normal":
      return "text-green-600 bg-green-100";
    default:
      return "text-slate-600 bg-slate-100";
  }
}

function getScarcityColor(scarcity: number) {
  if (scarcity >= 80) return "text-red-600";
  if (scarcity >= 60) return "text-orange-600";
  return "text-green-600";
}

export default function DashboardOverviewPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pinnedNodes.map((node, index) => (
          <div key={index} className="bg-white rounded-3xl p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                {node.name}
              </p>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}>{node.status}</div>
            </div>
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Load</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{node.loadMegawatts}</span>
                <span className="text-sm text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>MW</span>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Delivery-Adjusted Price (dLMP)</p>
                <div className="group relative">
                  <Info className="w-3 h-3 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-10">
                    Energy price scaled by deliverability (DDM)
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${node.dollarsPerMegawatt.toFixed(2)}</span>
                <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>/MW</span>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>k value</p>
              <span className="text-base font-semibold text-blue-600" style={{ fontFamily: "var(--font-sans)" }}>{node.kValue.toFixed(2)}</span>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${node.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {node.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span>{node.trend}</span>
              <span className="text-slate-500 ml-1">vs last hour</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Grid Network</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Real-time node scarcity and utilization</p>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50 rounded-lg">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700" style={{ fontFamily: "var(--font-sans)" }}>Live</span>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8" style={{ height: "350px" }}>
            <svg className="w-full h-full" viewBox="0 0 750 400">
              {meshLinks.map((conn, index) => {
                const fromNode = gridNodes.find((n) => n.id === conn.from);
                const toNode = gridNodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                const strokeColor = conn.utilization >= 80 ? "#dc2626" : conn.utilization >= 60 ? "#ea580c" : "#3b82f6";
                const strokeWidth = conn.utilization >= 80 ? 4 : 3;
                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={conn.utilization >= 80 ? "5,5" : "none"}
                  />
                );
              })}
              {gridNodes.map((node) => {
                const fillColor = node.scarcity >= 80 ? "#dc2626" : node.scarcity >= 60 ? "#ea580c" : "#3b82f6";
                return (
                  <g key={node.id}>
                    <circle cx={node.x} cy={node.y} r="30" fill={fillColor} opacity="0.2" className="animate-pulse" />
                    <circle cx={node.x} cy={node.y} r="20" fill="white" stroke={fillColor} strokeWidth="3" />
                    <text x={node.x} y={node.y + 5} textAnchor="middle" fill={fillColor} fontSize="14" fontWeight="600">
                      {node.id}
                    </text>
                    <text x={node.x} y={node.y + 45} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="500">
                      {node.scarcity}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Normal (&lt;60%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
              <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Warning (60-80%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Critical (&gt;80%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Scarcity Signals</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Node-specific pricing</p>
          </div>
          <div className="space-y-3">
            {scarcitySignals.map((signal, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{signal.node}</p>
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{signal.direction}</p>
                  </div>
                  <span className={`text-base font-semibold ${getScarcityColor(signal.scarcity)}`} style={{ fontFamily: "var(--font-sans)" }}>{signal.scarcity}%</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${signal.price.toFixed(2)}</span>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${signal.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {signal.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{Math.abs(signal.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Active Positions</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Your DTR holdings</p>
            </div>
            <Link href="/dashboard/trading" className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
              New Trade
            </Link>
          </div>
          <div className="space-y-2.5">
            {positions.map((position, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900 text-base" style={{ fontFamily: "var(--font-sans)" }}>{position.pair}</p>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{position.quantity} DTR @ ${position.avgPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-semibold ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                      {position.pnl >= 0 ? "+" : ""}${position.pnl.toLocaleString()}
                    </p>
                    <p className={`text-xs font-medium ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {position.pnl >= 0 ? "+" : ""}{position.pnlPercent}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Current Price:</span>
                  <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.currentPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Recent Trades</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Latest DTR transactions</p>
          </div>
          <div className="space-y-2.5">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trade.from} → {trade.to}</p>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{trade.amount} DTR @ ${trade.price}</p>
                  </div>
                  <div className="text-right">
                    {trade.status === "completed" ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{trade.time}</p>
              </div>
            ))}
          </div>
          <Link href="/dashboard/trading" className="block w-full mt-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors text-center" style={{ fontFamily: "var(--font-sans)" }}>
            View All Trades →
          </Link>
        </div>
      </div>
    </div>
  );
}
