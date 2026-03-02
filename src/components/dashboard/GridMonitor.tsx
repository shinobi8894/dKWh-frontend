"use client";

import { useState } from "react";
import {
  Activity,
  Zap,
  ThermometerSun,
  Gauge,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Radio,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  X,
  ShoppingCart,
  Info,
} from "lucide-react";

export function GridMonitor() {
  const [selectedNode, setSelectedNode] = useState<string | null>("C");
  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [destNode, setDestNode] = useState<string | null>(null);

  const allNodes = [
    { id: "A", name: "Node A", loadMegawatts: 245.3, dollarsPerMegawatt: 12.5, kValue: 0.23, status: "normal", trend: "+2.4%", x: 150, y: 200, capacity: 500, utilization: 49, voltage: 13.8, amps: 245.3, temperature: 65, frequency: 60.02, powerFactor: 0.98 },
    { id: "B", name: "Node B", loadMegawatts: 423.7, dollarsPerMegawatt: 245.8, kValue: 0.67, status: "warning", trend: "+12.4%", x: 300, y: 120, capacity: 600, utilization: 71, voltage: 13.7, amps: 423.7, temperature: 72, frequency: 59.98, powerFactor: 0.95 },
    { id: "C", name: "Node C", loadMegawatts: 789.2, dollarsPerMegawatt: 1847.3, kValue: 0.89, status: "critical", trend: "+45.2%", x: 450, y: 200, capacity: 850, utilization: 93, voltage: 13.5, amps: 789.2, temperature: 81, frequency: 59.95, powerFactor: 0.92 },
    { id: "D", name: "Node D", loadMegawatts: 312.5, dollarsPerMegawatt: 78.4, kValue: 0.45, status: "normal", trend: "+5.1%", x: 600, y: 150, capacity: 550, utilization: 57, voltage: 13.9, amps: 312.5, temperature: 68, frequency: 60.01, powerFactor: 0.97 },
    { id: "E", name: "Node E", loadMegawatts: 187.9, dollarsPerMegawatt: 8.2, kValue: 0.12, status: "normal", trend: "-1.2%", x: 450, y: 320, capacity: 400, utilization: 47, voltage: 14.0, amps: 187.9, temperature: 63, frequency: 60.03, powerFactor: 0.99 },
  ];

  const meshLinks = [
    { from: "A", to: "B", utilization: 45, capacity: 500, flow: 225 },
    { from: "A", to: "C", utilization: 78, capacity: 600, flow: 468 },
    { from: "B", to: "C", utilization: 92, capacity: 450, flow: 414 },
    { from: "C", to: "D", utilization: 67, capacity: 550, flow: 369 },
    { from: "C", to: "E", utilization: 34, capacity: 400, flow: 136 },
    { from: "D", to: "E", utilization: 56, capacity: 350, flow: 196 },
  ];

  const gridHealth = { overall: 78, reliability: 94, efficiency: 88, congestion: 65 };

  const tradingOpportunities = (() => {
    const opportunities: { id: string; from: typeof allNodes[0]; to: typeof allNodes[0]; spread: number; direction: string; profitPotential: string }[] = [];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const fromNode = allNodes[i];
        const toNode = allNodes[j];
        const spread = Math.abs(toNode.dollarsPerMegawatt - fromNode.dollarsPerMegawatt);
        const direction = toNode.dollarsPerMegawatt > fromNode.dollarsPerMegawatt ? "export" : "import";
        const higherNode = toNode.dollarsPerMegawatt > fromNode.dollarsPerMegawatt ? toNode : fromNode;
        const lowerNode = toNode.dollarsPerMegawatt > fromNode.dollarsPerMegawatt ? fromNode : toNode;
        opportunities.push({
          id: `${fromNode.id}-${toNode.id}`,
          from: lowerNode,
          to: higherNode,
          spread,
          direction,
          profitPotential: spread > 500 ? "high" : spread > 100 ? "medium" : "low",
        });
      }
    }
    return opportunities.sort((a, b) => b.spread - a.spread).slice(0, 5);
  })();

  const trendData = selectedNode ? allNodes.find((n) => n.id === selectedNode) : null;

  const handleNodeClickForTrading = (nodeId: string) => {
    if (!sourceNode) {
      setSourceNode(nodeId);
      setDestNode(null);
    } else if (sourceNode === nodeId) {
      setSourceNode(null);
      setDestNode(null);
    } else {
      setDestNode(nodeId);
    }
  };

  const calculateDTRPrice = (from: string, to: string) => {
    const fromNode = allNodes.find((n) => n.id === from);
    const toNode = allNodes.find((n) => n.id === to);
    if (!fromNode || !toNode) return null;
    const priceDiff = toNode.dollarsPerMegawatt - fromNode.dollarsPerMegawatt;
    return {
      from: fromNode,
      to: toNode,
      spread: Math.abs(priceDiff),
      direction: priceDiff > 0 ? "export" : "import",
    };
  };

  const tradeData = sourceNode && destNode ? calculateDTRPrice(sourceNode, destNode) : null;

  const gridNodes = allNodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    scarcity: Math.round(node.kValue * 100),
    status: node.status,
    utilization: node.utilization,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-600 bg-red-100";
      case "warning": return "text-orange-600 bg-orange-100";
      case "normal": return "text-green-600 bg-green-100";
      default: return "text-slate-600 bg-slate-100";
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getHealthBarColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="p-8 space-y-6">
      {tradeData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
                Trade Opportunity
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSourceNode(null);
                  setDestNode(null);
                }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>From</p>
                <p className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{tradeData.from.name}</p>
                <p className="text-sm text-blue-600 font-semibold" style={{ fontFamily: "var(--font-sans)" }}>${tradeData.from.dollarsPerMegawatt.toFixed(2)}/MW</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <ArrowRight className="w-6 h-6 text-green-600 mb-1" />
                <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Spread</p>
                <p className="text-lg font-bold text-green-600" style={{ fontFamily: "var(--font-sans)" }}>${tradeData.spread.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>To</p>
                <p className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{tradeData.to.name}</p>
                <p className="text-sm text-blue-600 font-semibold" style={{ fontFamily: "var(--font-sans)" }}>${tradeData.to.dollarsPerMegawatt.toFixed(2)}/MW</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <button type="button" className="w-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/30" style={{ fontFamily: "var(--font-sans)" }}>
                <ShoppingCart className="w-5 h-5" />
                Buy DTR ({tradeData.from.id} → {tradeData.to.id})
              </button>
              <button type="button" className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30" style={{ fontFamily: "var(--font-sans)" }}>
                Sell DTR ({tradeData.from.id} → {tradeData.to.id})
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-4 text-center" style={{ fontFamily: "var(--font-sans)" }}>
              <Info className="w-3 h-3 inline mr-1" />
              {tradeData.direction === "export" ? "Export (High → Low price)" : "Import (Low → High price)"}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Grid Health</p>
          </div>
          <p className={`text-3xl font-semibold ${getHealthColor(gridHealth.overall)} mb-1`} style={{ fontFamily: "var(--font-sans)" }}>{gridHealth.overall}%</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+3% vs yesterday</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Reliability</p>
          </div>
          <p className={`text-3xl font-semibold ${getHealthColor(gridHealth.reliability)} mb-1`} style={{ fontFamily: "var(--font-sans)" }}>{gridHealth.reliability}%</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+1% vs yesterday</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Efficiency</p>
          </div>
          <p className={`text-3xl font-semibold ${getHealthColor(gridHealth.efficiency)} mb-1`} style={{ fontFamily: "var(--font-sans)" }}>{gridHealth.efficiency}%</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+2% vs yesterday</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Congestion</p>
          </div>
          <p className={`text-3xl font-semibold ${getHealthColor(100 - gridHealth.congestion)} mb-1`} style={{ fontFamily: "var(--font-sans)" }}>{gridHealth.congestion}%</p>
          <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+8% vs yesterday</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Network Topology</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Click nodes to select DTR trading path</p>
            </div>
            <div className="flex items-center gap-2">
              {(sourceNode || destNode) && (
                <button
                  type="button"
                  onClick={() => {
                    setSourceNode(null);
                    setDestNode(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-3 h-3 text-slate-600" />
                  <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>Clear Selection</span>
                </button>
              )}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50 rounded-lg">
                <Radio className="w-3 h-3 text-green-600 animate-pulse" />
                <span className="text-xs font-medium text-green-700" style={{ fontFamily: "var(--font-sans)" }}>Live</span>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8" style={{ height: "450px" }}>
            <svg className="w-full h-full" viewBox="0 0 750 400">
              {meshLinks.map((conn, index) => {
                const fromNode = gridNodes.find((n) => n.id === conn.from);
                const toNode = gridNodes.find((n) => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                const fromNodeData = allNodes.find((n) => n.id === conn.from);
                const toNodeData = allNodes.find((n) => n.id === conn.to);
                const dLMPSpread = toNodeData && fromNodeData ? Math.abs(toNodeData.dollarsPerMegawatt - fromNodeData.dollarsPerMegawatt) : 0;
                const strokeColor = conn.utilization >= 80 ? "#dc2626" : conn.utilization >= 60 ? "#ea580c" : "#3b82f6";
                const strokeWidth = conn.utilization >= 80 ? 5 : conn.utilization >= 60 ? 4 : 3;
                const isTradePathConnection = (sourceNode === conn.from && destNode === conn.to) || (sourceNode === conn.to && destNode === conn.from);
                const isSelected = selectedNode === conn.from || selectedNode === conn.to;
                const midX = (fromNode.x + toNode.x) / 2;
                const midY = (fromNode.y + toNode.y) / 2;
                return (
                  <g key={index}>
                    <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={isTradePathConnection ? "#10b981" : strokeColor} strokeWidth={isTradePathConnection ? 6 : strokeWidth} strokeDasharray={conn.utilization >= 80 ? "8,4" : "none"} opacity={isTradePathConnection ? 1 : isSelected ? 1 : 0.4} />
                    {(isTradePathConnection || isSelected) && (
                      <>
                        <text x={midX} y={midY - 8} textAnchor="middle" fill={isTradePathConnection ? "#10b981" : strokeColor} fontSize="11" fontWeight="600">{conn.flow}MW</text>
                        <text x={midX} y={midY + 6} textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">{conn.utilization}%</text>
                        {isTradePathConnection && (
                          <g>
                            <rect x={midX - 35} y={midY + 12} width="70" height="18" fill="white" opacity="0.9" rx="4" />
                            <text x={midX} y={midY + 24} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">Δ${dLMPSpread.toFixed(2)}</text>
                          </g>
                        )}
                      </>
                    )}
                  </g>
                );
              })}
              {gridNodes.map((node) => {
                const fillColor = node.utilization >= 80 ? "#dc2626" : node.utilization >= 60 ? "#ea580c" : "#3b82f6";
                const isSelected = selectedNode === node.id;
                const isSourceNode = sourceNode === node.id;
                const isDestNode = destNode === node.id;
                const isPartOfTrade = isSourceNode || isDestNode;
                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node.id);
                      handleNodeClickForTrading(node.id);
                    }}
                    className="cursor-pointer"
                  >
                    {(isSelected || isPartOfTrade) && (
                      <circle cx={node.x} cy={node.y} r="40" fill={isPartOfTrade ? "#10b981" : fillColor} opacity="0.1" className="animate-pulse" />
                    )}
                    <circle cx={node.x} cy={node.y} r="30" fill={isSelected || isPartOfTrade ? (isPartOfTrade ? "#10b981" : fillColor) : "white"} opacity={isSelected || isPartOfTrade ? "0.2" : "0.1"} />
                    <circle cx={node.x} cy={node.y} r="22" fill="white" stroke={isPartOfTrade ? "#10b981" : fillColor} strokeWidth={isSelected || isPartOfTrade ? "4" : "3"} />
                    <text x={node.x} y={node.y + 5} textAnchor="middle" fill={isPartOfTrade ? "#10b981" : fillColor} fontSize="16" fontWeight="700">{node.id}</text>
                    <text x={node.x} y={node.y + 50} textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">{node.utilization}%</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
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
            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Click on a node to view details</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>{trendData ? trendData.name : "Select a Node"}</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Real-time telemetry data</p>
          </div>

          {trendData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(trendData.status)}`}>{trendData.status}</span>
              </div>
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Load</span>
                    <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.loadMegawatts} MW</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getHealthBarColor(100 - trendData.utilization)}`} style={{ width: `${trendData.utilization}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>{trendData.utilization}% of {trendData.capacity} MW capacity</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Gauge className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Voltage</p>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.voltage} kV</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Current</p>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.amps} A</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <ThermometerSun className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Temperature</p>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.temperature}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Activity className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Frequency</p>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.frequency} Hz</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Power Factor</p>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{trendData.powerFactor}</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Current DTR Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${trendData.dollarsPerMegawatt.toFixed(2)}</span>
                  <span className="text-sm text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>/MW</span>
                </div>
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${trendData.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {trendData.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{trendData.trend} vs last hour</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Scarcity Coefficient (k)</p>
                <span className="text-2xl font-semibold text-blue-600" style={{ fontFamily: "var(--font-sans)" }}>{trendData.kValue.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-slate-100 rounded-full mb-3">
                <Activity className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Select a node on the grid to view detailed telemetry</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Top Trading Opportunities</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Highest price spreads across the network</p>
            </div>
            <span className="px-2.5 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
              {tradingOpportunities.filter((o) => o.profitPotential === "high").length} High Value
            </span>
          </div>
          <div className="space-y-2.5">
            {tradingOpportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => {
                  setSourceNode(opp.from.id);
                  setDestNode(opp.to.id);
                }}
                className={`p-3 border-l-4 rounded-lg cursor-pointer transition-all ${opp.profitPotential === "high" ? "border-green-500 bg-green-50 hover:bg-green-100" : opp.profitPotential === "medium" ? "border-blue-500 bg-blue-50 hover:bg-blue-100" : "border-slate-500 bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg ${opp.profitPotential === "high" ? "bg-green-100" : "bg-blue-100"}`}>
                    <TrendingUp className={`w-4 h-4 ${opp.profitPotential === "high" ? "text-green-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{opp.from.name} → {opp.to.name}</p>
                      <span className="text-sm font-bold text-green-600" style={{ fontFamily: "var(--font-sans)" }}>${opp.spread.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>${opp.from.dollarsPerMegawatt.toFixed(2)} → ${opp.to.dollarsPerMegawatt.toFixed(2)}/MW</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${opp.profitPotential === "high" ? "bg-green-600 text-white" : opp.profitPotential === "medium" ? "bg-blue-600 text-white" : "bg-slate-400 text-white"}`}>{opp.profitPotential}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>All Nodes Status</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quick overview of all grid nodes</p>
          </div>
          <div className="space-y-2.5">
            {allNodes.map((node) => {
              const isSourceNode = sourceNode === node.id;
              const isDestNode = destNode === node.id;
              const isPartOfTrade = isSourceNode || isDestNode;
              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClickForTrading(node.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${isPartOfTrade ? "bg-green-50 border-2 border-green-400" : selectedNode === node.id ? "bg-blue-50 border border-blue-200" : "bg-slate-50 hover:bg-slate-100"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{node.name}</span>
                      {isSourceNode && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-600 text-white">From</span>}
                      {isDestNode && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">To</span>}
                      {!isPartOfTrade && <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}>{node.status}</span>}
                    </div>
                    <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{node.utilization}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${getHealthBarColor(100 - node.utilization)}`} style={{ width: `${node.utilization}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{node.loadMegawatts} MW / {node.capacity} MW</span>
                    <span className="text-xs font-medium text-blue-600" style={{ fontFamily: "var(--font-sans)" }}>${node.dollarsPerMegawatt.toFixed(2)}/MW</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
