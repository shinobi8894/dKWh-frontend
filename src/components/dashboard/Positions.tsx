"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  Activity,
  Clock,
  ArrowUpRight,
  Zap,
  AlertTriangle,
  X,
  Info,
} from "lucide-react";

type Position = {
  id: number;
  pair: string;
  type: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  openDate: string;
  scarcity: number;
  status: string;
  utilization: number;
  headroom: number;
  vH: number;
  settlementClosesSec: number;
};

type ClosedPosition = {
  id: number;
  pair: string;
  type: string;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  closedDate: string;
  duration: string;
};

export function Positions() {
  const [filterTab, setFilterTab] = useState<"all" | "long" | "short">("all");
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const portfolioSummary = {
    totalValue: 127850.4,
    totalPnL: 12750.8,
    totalPnLPercent: 11.07,
    dayPnL: 2340.5,
    dayPnLPercent: 1.87,
    openPositions: 8,
    closedToday: 3,
    availableBalance: 45230.0,
    marginUsed: 82620.4,
    marginAvailable: 45229.6,
  };

  const positions: Position[] = [
    { id: 1, pair: "A→B", type: "long", quantity: 450, entryPrice: 11.2, currentPrice: 12.5, value: 5625, pnl: 585, pnlPercent: 11.61, openDate: "2026-01-28", scarcity: 23, status: "active", utilization: 0.78, headroom: 220, vH: 0.019, settlementClosesSec: 150 },
    { id: 2, pair: "C→D", type: "long", quantity: 120, entryPrice: 1650, currentPrice: 1847.3, value: 221676, pnl: 23676, pnlPercent: 11.96, openDate: "2026-01-25", scarcity: 89, status: "active", utilization: 0.92, headroom: 85, vH: 0.124, settlementClosesSec: 150 },
    { id: 3, pair: "B→C", type: "long", quantity: 280, entryPrice: 220.5, currentPrice: 245.8, value: 68824, pnl: 7084, pnlPercent: 11.48, openDate: "2026-01-26", scarcity: 67, status: "active", utilization: 0.85, headroom: 145, vH: 0.067, settlementClosesSec: 150 },
    { id: 4, pair: "E→A", type: "short", quantity: 350, entryPrice: 9.5, currentPrice: 8.2, value: 2870, pnl: 455, pnlPercent: 13.69, openDate: "2026-01-29", scarcity: 12, status: "active", utilization: 0.54, headroom: 380, vH: 0.008, settlementClosesSec: 150 },
    { id: 5, pair: "D→E", type: "long", quantity: 200, entryPrice: 72.3, currentPrice: 78.4, value: 15680, pnl: 1220, pnlPercent: 8.44, openDate: "2026-01-27", scarcity: 45, status: "active", utilization: 0.71, headroom: 265, vH: 0.032, settlementClosesSec: 150 },
    { id: 6, pair: "A→C", type: "long", quantity: 180, entryPrice: 145.8, currentPrice: 156.4, value: 28152, pnl: 1908, pnlPercent: 7.27, openDate: "2026-01-30", scarcity: 56, status: "active", utilization: 0.79, headroom: 195, vH: 0.045, settlementClosesSec: 150 },
    { id: 7, pair: "A→B", type: "short", quantity: 150, entryPrice: 13.1, currentPrice: 12.5, value: 1875, pnl: 90, pnlPercent: 4.58, openDate: "2026-02-01", scarcity: 23, status: "active", utilization: 0.78, headroom: 220, vH: 0.019, settlementClosesSec: 150 },
    { id: 8, pair: "B→C", type: "long", quantity: 95, entryPrice: 252.3, currentPrice: 245.8, value: 23351, pnl: -617.5, pnlPercent: -2.58, openDate: "2026-02-01", scarcity: 67, status: "active", utilization: 0.85, headroom: 145, vH: 0.067, settlementClosesSec: 150 },
  ];

  const closedPositions: ClosedPosition[] = [
    { id: 101, pair: "C→D", type: "long", quantity: 50, entryPrice: 1820, exitPrice: 1847.3, pnl: 1365, pnlPercent: 1.5, closedDate: "2026-02-02", duration: "3 days" },
    { id: 102, pair: "A→B", type: "short", quantity: 200, entryPrice: 12.8, exitPrice: 12.5, pnl: 60, pnlPercent: 2.34, closedDate: "2026-02-02", duration: "1 day" },
    { id: 103, pair: "E→A", type: "long", quantity: 400, entryPrice: 8.5, exitPrice: 8.2, pnl: -120, pnlPercent: -3.53, closedDate: "2026-02-01", duration: "2 days" },
  ];

  const allocation = [
    { pair: "C→D", percentage: 41.2, value: 221676, color: "bg-blue-500" },
    { pair: "B→C", percentage: 24.8, value: 92175, color: "bg-purple-500" },
    { pair: "A→C", percentage: 15.3, value: 28152, color: "bg-indigo-500" },
    { pair: "D→E", percentage: 8.5, value: 15680, color: "bg-green-500" },
    { pair: "A→B", percentage: 4.1, value: 7500, color: "bg-orange-500" },
    { pair: "E→A", percentage: 1.6, value: 2870, color: "bg-pink-500" },
    { pair: "Others", percentage: 4.5, value: 8297.4, color: "bg-slate-400" },
  ];

  const filteredPositions = positions.filter((pos) => (filterTab === "all" ? true : pos.type === filterTab));
  const selectedPosData = selectedPosition ? positions.find((p) => p.id.toString() === selectedPosition) : null;

  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Portfolio Value</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
            ${portfolioSummary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+${portfolioSummary.totalPnL.toLocaleString()} ({portfolioSummary.totalPnLPercent}%)</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Day P&L</p>
          </div>
          <p className="text-3xl font-semibold text-green-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
            +${portfolioSummary.dayPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{portfolioSummary.dayPnLPercent}%</span>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Open Positions</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{portfolioSummary.openPositions}</p>
          <p className="text-xs text-slate-600">{portfolioSummary.closedToday} closed today</p>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Available Delivery Margin</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
            ${portfolioSummary.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-600">Backed by dKWh credits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900" style={{ fontFamily: "var(--font-sans)" }}>
              <span className="font-semibold">Positions settle on realized delivery headroom at interval close.</span> Prices shown are indicative.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Active Positions</h2>
                <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Manage your DTR holdings</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setFilterTab("all")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterTab === "all" ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} style={{ fontFamily: "var(--font-sans)" }}>All</button>
                <button type="button" onClick={() => setFilterTab("long")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterTab === "long" ? "bg-green-100 text-green-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} style={{ fontFamily: "var(--font-sans)" }}>Long</button>
                <button type="button" onClick={() => setFilterTab("short")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterTab === "short" ? "bg-red-100 text-red-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} style={{ fontFamily: "var(--font-sans)" }}>Short</button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 pb-3 mb-3 border-b border-slate-200">
              <div className="col-span-2">
                <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Pair</span>
              </div>
              <div className="col-span-1">
                <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Type</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
              </div>
              <div className="col-span-2 text-right group relative">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Entry Basis (Indicative)</span>
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
                <div className="absolute right-0 top-6 w-64 p-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                  Quoted delivery basis; final settlement uses realized headroom at interval close
                </div>
              </div>
              <div className="col-span-2 text-right group relative">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Indicative Settlement Basis</span>
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
                <div className="absolute right-0 top-6 w-64 p-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                  Quoted delivery basis; final settlement uses realized headroom at interval close
                </div>
              </div>
              <div className="col-span-2 text-right group relative">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Indicative P&L</span>
                  <Info className="w-3 h-3 text-slate-400" />
                </div>
                <div className="absolute right-0 top-6 w-64 p-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                  Final P&L determined at ex-post settlement
                </div>
              </div>
              <div className="col-span-1" />
            </div>

            <div className="space-y-2">
              {filteredPositions.map((position) => (
                <div
                  key={position.id}
                  onClick={() => setSelectedPosition(position.id.toString())}
                  className={`grid grid-cols-12 gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedPosition === position.id.toString() ? "bg-blue-50 border border-blue-200" : "bg-slate-50 hover:bg-slate-100"}`}
                >
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{position.pair}</span>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${position.type === "long" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{position.type.toUpperCase()}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{position.quantity}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>${position.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                        {position.pnl >= 0 ? "+" : ""}{position.pnl >= 0 ? "$" : "-$"}{Math.abs(position.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {position.pnl >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <button type="button" onClick={(e) => e.stopPropagation()} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors" aria-label="Close">
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPositions.length === 0 && (
              <div className="py-12 text-center">
                <div className="p-4 bg-slate-100 rounded-full inline-flex mb-3">
                  <Activity className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>No {filterTab === "all" ? "" : filterTab} positions</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {selectedPosData ? (
            <div className="bg-white rounded-3xl p-5">
              <div className="mb-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Delivery State</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{selectedPosData.pair}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${selectedPosData.type === "long" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{selectedPosData.type.toUpperCase()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Total P&L</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-semibold ${selectedPosData.pnl >= 0 ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                      {selectedPosData.pnl >= 0 ? "+" : ""}{selectedPosData.pnl >= 0 ? "$" : "-$"}{Math.abs(selectedPosData.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm font-medium ${selectedPosData.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>({selectedPosData.pnl >= 0 ? "+" : ""}{selectedPosData.pnlPercent.toFixed(2)}%)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Quantity", value: `${selectedPosData.quantity} DTR` },
                    { label: "Entry Price", value: `$${selectedPosData.entryPrice.toFixed(2)}` },
                    { label: "Current Price", value: `$${selectedPosData.currentPrice.toFixed(2)}` },
                    { label: "Position Value", value: `$${selectedPosData.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                    { label: "Open Date", value: new Date(selectedPosData.openDate).toLocaleDateString() },
                    { label: "Scarcity", value: `${selectedPosData.scarcity}%`, badge: true, scarcity: selectedPosData.scarcity },
                  ].map((item) => (
                    <div key={item.label} className={item.label === "Position Value" ? "flex items-center justify-between pt-2 border-t border-slate-200" : "flex items-center justify-between"}>
                      <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{item.label}</span>
                      {item.badge && item.scarcity != null ? (
                        <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${item.scarcity >= 80 ? "bg-red-100 text-red-600" : item.scarcity >= 60 ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}>{item.value}</span>
                      ) : (
                        <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{item.value}</span>
                      )}
                    </div>
                  ))}

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Grid Physics</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Utilization (Import)</span>
                        <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{selectedPosData.utilization.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Headroom</span>
                        <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{selectedPosData.headroom} kW</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>v(H)</span>
                        <span className="text-sm font-semibold text-blue-600" style={{ fontFamily: "var(--font-sans)" }}>${selectedPosData.vH.toFixed(3)} / kW</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Settlement Window</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-700" style={{ fontFamily: "var(--font-sans)" }}>Closes in:</span>
                    <span className="text-lg font-bold text-amber-900 tabular-nums" style={{ fontFamily: "var(--font-sans)" }}>
                      {Math.floor(selectedPosData.settlementClosesSec / 60)}:{(selectedPosData.settlementClosesSec % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <button type="button" className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium text-sm transition-all">
                    Add to Position
                  </button>
                  <button type="button" className="w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium text-sm transition-all">
                    Close Position
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-5">
              <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Position Details</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-slate-100 rounded-full mb-3">
                  <Activity className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Select a position to view details</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Portfolio Allocation</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Distribution by trading pair</p>
            </div>
            <div className="space-y-3">
              {allocation.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs font-medium text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{item.pair}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>
                    ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Recent Closed Positions</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Trading history</p>
          </div>
          <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">View All</button>
        </div>

        <div className="grid grid-cols-12 gap-3 pb-3 mb-3 border-b border-slate-200">
          <div className="col-span-2">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Pair</span>
          </div>
          <div className="col-span-1">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Type</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Entry</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Exit</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>P&L</span>
          </div>
          <div className="col-span-1 text-right">
            <span className="text-xs font-semibold text-slate-600 uppercase" style={{ fontFamily: "var(--font-sans)" }}>Duration</span>
          </div>
        </div>

        <div className="space-y-2">
          {closedPositions.map((position) => (
            <div key={position.id} className="grid grid-cols-12 gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="col-span-2 flex items-center">
                <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{position.pair}</span>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-0.5">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-center ${position.type === "long" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{position.type.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-500 text-center leading-tight" style={{ fontFamily: "var(--font-sans)" }}>{position.type === "long" ? "Long delivery value" : "Short delivery value"}</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{position.quantity}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>${position.entryPrice.toFixed(2)}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>${position.exitPrice.toFixed(2)}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <div className="text-right">
                  <div className={`text-sm font-semibold ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                    {position.pnl >= 0 ? "+" : ""}{position.pnl >= 0 ? "$" : "-$"}{Math.abs(position.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-xs ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>{position.pnl >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%</div>
                </div>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{position.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
