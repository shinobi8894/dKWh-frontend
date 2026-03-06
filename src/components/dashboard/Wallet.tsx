"use client";

import { useState } from "react";
import {
  Wallet as WalletIcon,
  TrendingUp,
  Copy,
  ExternalLink,
  Plus,
  Minus,
  Coins,
  Lock,
  Unlock,
  RefreshCw,
  CheckCircle,
  Scale,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export function Wallet() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"overview" | "credits" | "collateral" | "history">("overview");
  const [expandedCreditId, setExpandedCreditId] = useState<number | null>(null);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const walletBalance = {
    dKWh: 2847.5,
    usd: 45230.0,
    collateral: 15000.0,
    available: 30230.0,
  };

  const creditHistory = [
    { id: 1, type: "mint", amount: 150.5, pair: "A→B", reason: "Delivery Success", txHash: "0x1a2b3c4d5e6f7g8h9i0j", timestamp: "2026-02-02 14:30:00", status: "confirmed", utilization: 0.93, headroom: 0.4, vH: 0.031 },
    { id: 2, type: "mint", amount: 320.0, pair: "C→D", reason: "Delivery Success", txHash: "0x9i8h7g6f5e4d3c2b1a0j", timestamp: "2026-02-02 12:15:00", status: "confirmed", utilization: 0.89, headroom: 1.2, vH: 0.124 },
    { id: 3, type: "burn", amount: 75.0, pair: "B→C", reason: "Constraint-Limited", txHash: "0x5e4d3c2b1a0j9i8h7g6f", timestamp: "2026-02-02 10:45:00", status: "confirmed", utilization: 0.98, headroom: 0.05, vH: 0.187 },
    { id: 4, type: "mint", amount: 200.0, pair: "E→A", reason: "Delivery Success", txHash: "0xa1b2c3d4e5f6g7h8i9j0", timestamp: "2026-02-01 16:20:00", status: "confirmed", utilization: 0.54, headroom: 3.8, vH: 0.008 },
    { id: 5, type: "burn", amount: 50.0, pair: "D→E", reason: "Constraint-Limited", txHash: "0xf6g7h8i9j0a1b2c3d4e5", timestamp: "2026-02-01 14:10:00", status: "confirmed", utilization: 0.91, headroom: 0.7, vH: 0.052 },
  ];

  const collateralPositions = [
    { id: 1, pair: "A→B", locked: 2500.0, required: 2000.0, status: "healthy", dtr: 100, releaseDate: "2026-02-10" },
    { id: 2, pair: "C→D", locked: 8500.0, required: 8000.0, status: "healthy", dtr: 50, releaseDate: "2026-02-12" },
    { id: 3, pair: "B→C", locked: 3200.0, required: 3500.0, status: "warning", dtr: 75, releaseDate: "2026-02-08" },
    { id: 4, pair: "E→A", locked: 800.0, required: 600.0, status: "healthy", dtr: 200, releaseDate: "2026-02-15" },
  ];

  const settlements = [
    { id: 1, pair: "A→B", type: "settlement", amount: 585.0, dKWhMinted: 150.5, scarcityA: 23, scarcityB: 15, timestamp: "2026-02-02 14:30:00", status: "paid" },
    { id: 2, pair: "C→D", type: "settlement", amount: 1247.5, dKWhMinted: 320.0, scarcityA: 89, scarcityB: 45, timestamp: "2026-02-02 12:15:00", status: "paid" },
    { id: 3, pair: "B→C", type: "loss", amount: -315.0, dKWhBurned: 75.0, scarcityA: 50, scarcityB: 67, timestamp: "2026-02-02 10:45:00", status: "settled" },
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-orange-100 text-orange-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
            Wallet & Credits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>
            Manage your dKWh credits and collateral
          </p>
        </div>
        {!walletConnected ? (
          <button
            type="button"
            onClick={() => setWalletConnected(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <WalletIcon className="w-5 h-5" />
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700" style={{ fontFamily: "var(--font-sans)" }}>Connected</span>
            </div>
            <button type="button" className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              <RefreshCw className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        )}
      </div>

      {walletConnected ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>dKWh Credits</p>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                {walletBalance.dKWh.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </p>
              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5% this week</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <WalletIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Total Value</p>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                ${walletBalance.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-600">Available + Locked</p>
            </div>

            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Locked Collateral</p>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-orange-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                ${walletBalance.collateral.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-slate-600">4 active positions</p>
            </div>

            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Unlock className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Available</p>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                ${walletBalance.available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex gap-2 mt-2">
                <button type="button" className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Deposit
                </button>
                <button type="button" className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors flex items-center gap-1">
                  <Minus className="w-3 h-3" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-sans)" }}>Wallet Address</p>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <code className="text-sm sm:text-base font-mono font-medium text-slate-900 bg-slate-50 px-3 sm:px-4 py-2 rounded-lg break-all">{walletAddress}</code>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={copyAddress} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Copy address">
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                    <button type="button" className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View on explorer">
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Network</p>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg w-fit">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-blue-700" style={{ fontFamily: "var(--font-sans)" }}>Ethereum Mainnet</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
            {(["overview", "credits", "collateral", "history"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${selectedTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {tab === "overview" ? "Overview" : tab === "credits" ? "dKWh Credits" : tab === "collateral" ? "Collateral" : "Settlement History"}
              </button>
            ))}
          </div>

          {selectedTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-3xl p-5">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Recent dKWh Activity</h2>
                <div className="space-y-2.5">
                  {creditHistory.slice(0, 5).map((record) => (
                    <div key={record.id} className="p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {record.type === "mint" ? (
                            <div className="p-1.5 bg-green-100 rounded-lg">
                              <Plus className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-1.5 bg-red-100 rounded-lg">
                              <Minus className="w-4 h-4 text-red-600" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
                              {record.type === "mint" ? "Delivery Verified:" : "Delivery Failed:"} {record.type === "mint" ? "+" : "−"}{record.amount} dKWh
                            </p>
                            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{record.pair} • {record.reason}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold ${record.type === "mint" ? "text-green-600" : "text-red-600"}`}>
                          {record.type === "mint" ? "+" : "−"}{record.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{record.timestamp}</span>
                        <button type="button" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <span className="font-mono">{shortenAddress(record.txHash)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Collateral Positions</h2>
                <div className="space-y-2.5">
                  {collateralPositions.map((position) => (
                    <div key={position.id} className="p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{position.pair}</p>
                          <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{position.dtr} DTR</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(position.status)}`}>{position.status}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Locked:</span>
                          <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.locked.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Required:</span>
                          <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.required.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                          <div className={`h-1.5 rounded-full ${position.status === "warning" ? "bg-orange-500" : "bg-green-500"}`} style={{ width: `${(position.locked / position.required) * 100}%` }} />
                        </div>
                        <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>Release: {position.releaseDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "credits" && (
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>dKWh Credit History</h2>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>
                    Mint and burn events are recorded after ex-post settlement using realized grid state.
                  </p>
                </div>
              </div>

              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>How dKWh Is Earned</p>
                  <p className="text-sm text-blue-800" style={{ fontFamily: "var(--font-sans)" }}>
                    dKWh is minted when a DTR position results in successful physical delivery and burned when delivery fails due to network constraints. Each credit represents verified delivery capacity, not energy.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {creditHistory.map((record) => (
                  <div key={record.id} className={`rounded-xl border ${record.type === "mint" ? "bg-green-50 border-green-200" : "bg-slate-50 border-red-300"}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${record.type === "mint" ? "bg-green-100" : "bg-slate-200"}`}>
                            {record.type === "mint" ? <Plus className="w-5 h-5 text-green-600" /> : <Scale className="w-5 h-5 text-red-600" />}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                              {record.type === "mint" ? "Minted" : "Burned"} {record.amount} dKWh
                            </p>
                            <p className="text-sm text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>{record.pair} • {record.reason}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-600">
                              <span>{record.timestamp}</span>
                              <button type="button" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                <span className="font-mono">{shortenAddress(record.txHash)}</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            title="Settled quantity based on realized headroom and v(H) at interval close"
                            className={`text-2xl font-semibold ${record.type === "mint" ? "text-green-600" : "text-red-600"} cursor-help`}
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {record.type === "mint" ? "+" : "-"}{record.amount}
                          </span>
                          <div className="flex items-center gap-1 mt-1 justify-end">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs text-green-600 font-medium">Confirmed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedCreditId(expandedCreditId === record.id ? null : record.id)}
                        className={`w-full px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${record.type === "mint" ? "text-green-700 hover:bg-green-100/50" : "text-red-700 hover:bg-slate-100"}`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {expandedCreditId === record.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        Settlement Details
                      </button>
                      {expandedCreditId === record.id && (
                        <div className={`px-4 pb-4 pt-2 border-t ${record.type === "mint" ? "border-green-200" : "border-slate-300"}`}>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Utilization (U):</span>
                              <span className="font-mono font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{record.utilization.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Headroom (H):</span>
                              <span className="font-mono font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{record.headroom.toFixed(1)} MW</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>v(H):</span>
                              <span className="font-mono font-semibold text-blue-600" style={{ fontFamily: "var(--font-sans)" }}>${record.vH.toFixed(3)} / kW</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "collateral" && (
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Collateral Management</h2>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Monitor locked collateral for your DTR positions</p>
                </div>
              </div>

              <div className="space-y-3">
                {collateralPositions.map((position) => (
                  <div key={position.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{position.pair}</p>
                        <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{position.dtr} DTR Position</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(position.status)}`}>{position.status}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Locked</p>
                        <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.locked.toLocaleString()}</p>
                      </div>
                      <div title="Based on realized headroom scarcity for this delivery path">
                        <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                          Required <span className="text-[10px] text-slate-400">(current v(H))</span>
                        </p>
                        <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${position.required.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Margin</p>
                        <p className={`text-lg font-semibold ${position.locked >= position.required ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                          {((position.locked / position.required - 1) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                        <span>Collateral Ratio</span>
                        <span>{((position.locked / position.required) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${position.status === "warning" ? "bg-orange-500" : "bg-green-500"}`} style={{ width: `${Math.min((position.locked / position.required) * 100, 100)}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div title="Released after ex-post settlement for the delivery interval" className="text-xs text-slate-600 cursor-help">
                        <span>Collateral Release (Post-Settlement): </span>
                        <span className="font-medium text-slate-900">{position.releaseDate}</span>
                      </div>
                      {position.status === "warning" && (
                        <button type="button" className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors">
                          Add Collateral
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "history" && (
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Settlement History</h2>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Track settlements and payouts from your DTR positions</p>
                </div>
              </div>

              <div className="space-y-3">
                {settlements.map((settlement) => (
                  <div key={settlement.id} className={`p-4 rounded-xl border ${settlement.type === "settlement" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{settlement.pair} Settlement</p>
                        <div className="mb-2">
                          <div className="text-xs text-slate-600 mb-1">Utilization (Delivery Stress)</div>
                          <div className="text-xs text-slate-600">
                            <span className="font-medium text-slate-900">Source: {settlement.scarcityA}%</span>
                            <span className="mx-1">·</span>
                            <span className="font-medium text-slate-900">Sink: {settlement.scarcityB}%</span>
                          </div>
                        </div>
                        <p title="dKWh represents verified delivery capacity, not energy volume" className={`text-sm cursor-help ${settlement.type === "settlement" ? "text-green-700" : "text-red-700"}`} style={{ fontFamily: "var(--font-sans)" }}>
                          {settlement.type === "settlement" ? `Delivery Verified: +${settlement.dKWhMinted} dKWh` : `Delivery Failed: −${settlement.dKWhBurned} dKWh`}
                        </p>
                        <p className="text-xs text-slate-500 mt-2" style={{ fontFamily: "var(--font-sans)" }}>{settlement.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-semibold ${settlement.amount >= 0 ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>
                          {settlement.amount >= 0 ? "+" : ""}${Math.abs(settlement.amount).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">{settlement.amount >= 0 ? "Settlement Payout" : "Settlement Charge"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full inline-flex mb-6">
              <WalletIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-sans)" }}>Connect Your Wallet</h2>
            <p className="text-slate-600 mb-6" style={{ fontFamily: "var(--font-sans)" }}>
              Connect your Web3 wallet to manage dKWh credits, view settlements, and monitor collateral positions.
            </p>
            <button
              type="button"
              onClick={() => setWalletConnected(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all inline-flex items-center gap-2"
            >
              <WalletIcon className="w-5 h-5" />
              Connect Wallet
            </button>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-12 h-12 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-700">MetaMask</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-700">WalletConnect</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium text-slate-700">Coinbase</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
