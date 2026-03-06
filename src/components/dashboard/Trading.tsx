"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Clock,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  AlertCircle,
} from "lucide-react";

type TradingPair = {
  pair: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  scarcity: number;
  status: string;
  direction: string;
  utilization: number;
  headroomKW: number;
  capacityMW: number;
  currentFlowMW: number;
  vH: number;
};

export function Trading() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [selectedPair, setSelectedPair] = useState("A→B");
  const [orderMode, setOrderMode] = useState<"market" | "limit">("market");
  const [quantity, setQuantity] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [activeTab, setActiveTab] = useState<"chart" | "orderbook" | "trades">("chart");

  const tradingPairs: TradingPair[] = [
    { pair: "A→B", price: 12.5, change24h: 5.6, volume24h: 12450, high24h: 13.2, low24h: 11.8, scarcity: 23, status: "active", direction: "Import", utilization: 0.45, headroomKW: 275, capacityMW: 500, currentFlowMW: 225, vH: 0.008 },
    { pair: "B→C", price: 245.8, change24h: 12.4, volume24h: 8920, high24h: 250.3, low24h: 235.1, scarcity: 67, status: "active", direction: "Export", utilization: 0.92, headroomKW: 36, capacityMW: 450, currentFlowMW: 414, vH: 0.892 },
    { pair: "C→D", price: 1847.3, change24h: 45.2, volume24h: 3450, high24h: 1850, low24h: 1720.5, scarcity: 89, status: "active", direction: "Export", utilization: 0.67, headroomKW: 181, capacityMW: 550, currentFlowMW: 369, vH: 0.156 },
    { pair: "D→E", price: 78.4, change24h: 5.1, volume24h: 6780, high24h: 82.3, low24h: 74.2, scarcity: 45, status: "active", direction: "Import", utilization: 0.56, headroomKW: 154, capacityMW: 350, currentFlowMW: 196, vH: 0.042 },
    { pair: "E→A", price: 8.2, change24h: -1.2, volume24h: 15600, high24h: 9.1, low24h: 7.8, scarcity: 12, status: "active", direction: "Export", utilization: 0.34, headroomKW: 264, capacityMW: 400, currentFlowMW: 136, vH: 0.005 },
    { pair: "A→C", price: 156.4, change24h: 8.7, volume24h: 4230, high24h: 160.5, low24h: 148.2, scarcity: 56, status: "active", direction: "Import", utilization: 0.78, headroomKW: 132, capacityMW: 600, currentFlowMW: 468, vH: 0.223 },
  ];

  const orderBook = {
    bids: [
      { price: 12.48, quantity: 150, total: 1872 },
      { price: 12.45, quantity: 320, total: 3984 },
      { price: 12.42, quantity: 200, total: 2484 },
      { price: 12.4, quantity: 450, total: 5580 },
      { price: 12.38, quantity: 180, total: 2228 },
      { price: 12.35, quantity: 290, total: 3581 },
      { price: 12.32, quantity: 160, total: 1971 },
      { price: 12.3, quantity: 380, total: 4674 },
    ],
    asks: [
      { price: 12.5, quantity: 120, total: 1500 },
      { price: 12.53, quantity: 280, total: 3508 },
      { price: 12.55, quantity: 190, total: 2384 },
      { price: 12.58, quantity: 340, total: 4277 },
      { price: 12.6, quantity: 210, total: 2646 },
      { price: 12.63, quantity: 150, total: 1894 },
      { price: 12.65, quantity: 420, total: 5313 },
      { price: 12.68, quantity: 190, total: 2409 },
    ],
  };

  const recentTrades = [
    { id: 1, price: 12.5, quantity: 45, type: "buy", time: "14:32:15" },
    { id: 2, price: 12.48, quantity: 120, type: "sell", time: "14:32:08" },
    { id: 3, price: 12.51, quantity: 80, type: "buy", time: "14:31:52" },
    { id: 4, price: 12.49, quantity: 200, type: "sell", time: "14:31:45" },
    { id: 5, price: 12.52, quantity: 65, type: "buy", time: "14:31:30" },
    { id: 6, price: 12.48, quantity: 150, type: "sell", time: "14:31:18" },
    { id: 7, price: 12.5, quantity: 95, type: "buy", time: "14:31:05" },
    { id: 8, price: 12.47, quantity: 110, type: "sell", time: "14:30:58" },
  ];

  const openOrders = [
    { id: 1, pair: "A→B", type: "buy", quantity: 100, price: 12.3, filled: 0, status: "open", time: "12:45 PM" },
    { id: 2, pair: "C→D", type: "sell", quantity: 50, price: 1850, filled: 0, status: "open", time: "11:20 AM" },
    { id: 3, pair: "E→A", type: "buy", quantity: 200, price: 8, filled: 120, status: "partial", time: "10:15 AM" },
  ];

  const selectedPairData = tradingPairs.find((p) => p.pair === selectedPair) ?? tradingPairs[0];

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    const price = orderMode === "market" ? selectedPairData.price : parseFloat(limitPrice) || 0;
    return (qty * price).toFixed(2);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>24h Volume</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>$2.4M</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+12% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Active Trades</p>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>1,247</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+8% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Avg Risk Spread</p>
              <span title="Includes scarcity and tail-risk premia. Wide spreads signal elevated delivery risk.">
                <Info className="w-3 h-3 text-slate-400 cursor-help" />
              </span>
            </div>
          </div>
          <p className="text-3xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>0.16%</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <TrendingDown className="w-3 h-3" />
            <span>-0.02% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Grid Scarcity</p>
          </div>
          <p className="text-3xl font-semibold text-orange-600 mb-1" style={{ fontFamily: "var(--font-sans)" }}>High</p>
          <p className="text-xs text-slate-600">Favorable trading conditions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Markets</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Available DTR pairs</p>
          </div>
          <div className="space-y-2">
            {tradingPairs.map((pair) => (
              <button
                key={pair.pair}
                type="button"
                onClick={() => setSelectedPair(pair.pair)}
                className={`w-full p-3 rounded-xl text-left transition-all ${selectedPair === pair.pair ? "bg-blue-50 border border-blue-200" : "bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{pair.pair}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pair.scarcity >= 80 ? "bg-red-100 text-red-600" : pair.scarcity >= 60 ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}>{pair.scarcity}%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${pair.price.toFixed(2)}</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${pair.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {pair.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(pair.change24h)}%
                  </span>
                </div>
                <div className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>Vol: {pair.volume24h.toLocaleString()} DTR</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-white rounded-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>{selectedPairData.pair}</h2>
                <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>DTR Delivery Rights</p>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700" style={{ fontFamily: "var(--font-sans)" }}>Live Market</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Current Price</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${selectedPairData.price.toFixed(2)}</p>
                  <span className={`text-sm font-medium flex items-center gap-0.5 ${selectedPairData.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {selectedPairData.change24h >= 0 ? "↑" : "↓"} {Math.abs(selectedPairData.change24h)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>24h High</p>
                <p className="text-base font-semibold text-green-600" style={{ fontFamily: "var(--font-sans)" }}>${selectedPairData.high24h.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>24h Low</p>
                <p className="text-base font-semibold text-red-600" style={{ fontFamily: "var(--font-sans)" }}>${selectedPairData.low24h.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>24h Volume</p>
                <p className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{selectedPairData.volume24h.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 flex-1 flex flex-col">
            <div className={`mb-3 px-4 py-2.5 rounded-lg border-l-4 ${selectedPairData.utilization >= 0.8 || selectedPairData.headroomKW < 100 ? "bg-red-50 border-red-500" : selectedPairData.utilization >= 0.6 || selectedPairData.headroomKW < 200 ? "bg-orange-50 border-orange-500" : "bg-green-50 border-green-500"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>Delivery State ({selectedPairData.pair})</span>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedPairData.utilization >= 0.8 || selectedPairData.headroomKW < 100 ? "bg-red-600 text-white" : selectedPairData.utilization >= 0.6 || selectedPairData.headroomKW < 200 ? "bg-orange-600 text-white" : "bg-green-600 text-white"}`}>
                  {selectedPairData.utilization >= 0.8 || selectedPairData.headroomKW < 100 ? "Critical" : selectedPairData.utilization >= 0.6 || selectedPairData.headroomKW < 200 ? "Warning" : "Normal"}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">U:</span>
                  <span className={`font-semibold ${selectedPairData.utilization >= 0.8 ? "text-red-700" : selectedPairData.utilization >= 0.6 ? "text-orange-700" : "text-green-700"}`}>{selectedPairData.utilization.toFixed(2)}</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">H:</span>
                  <span className={`font-semibold ${selectedPairData.headroomKW < 100 ? "text-red-700" : selectedPairData.headroomKW < 200 ? "text-orange-700" : "text-green-700"}`}>{selectedPairData.headroomKW} kW</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">v(H):</span>
                  <span className="font-bold text-blue-700">${selectedPairData.vH.toFixed(3)}/kW</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 border-b border-slate-200">
              {(["chart", "orderbook", "trades"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 -mb-px" : "text-slate-600 hover:text-slate-900"}`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {tab === "chart" ? "Chart" : tab === "orderbook" ? "Order Book" : "Trades"}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col">
              {activeTab === "chart" && (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Price Chart</p>
                    <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>Historical price data for {selectedPairData.pair}</p>
                  </div>
                </div>
              )}

              {activeTab === "orderbook" && (
                <div className="flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 justify-between mb-2 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Price ($/kW-delivered)</span>
                          <span title="Settlement reflects delivery headroom value, not energy volume. A DTR represents the right to 1 kW of delivery capacity for the settlement interval.">
                            <Info className="w-3 h-3 text-slate-400 cursor-help" />
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        {orderBook.bids.map((bid, index) => (
                          <div key={index} className="relative">
                            <div className="absolute inset-0 bg-green-100 opacity-30" style={{ width: `${(bid.quantity / 450) * 100}%` }} />
                            <div className="relative flex items-center justify-between py-1 px-2">
                              <span className="text-xs font-medium text-green-700" style={{ fontFamily: "var(--font-sans)" }}>{bid.price.toFixed(2)}</span>
                              <span className="text-xs text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{bid.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                        <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Price ($/kW-delivered)</span>
                        <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        {orderBook.asks.map((ask, index) => (
                          <div key={index} className="relative">
                            <div className="absolute inset-0 bg-red-100 opacity-30" style={{ width: `${(ask.quantity / 420) * 100}%` }} />
                            <div className="relative flex items-center justify-between py-1 px-2">
                              <span className="text-xs font-medium text-red-700" style={{ fontFamily: "var(--font-sans)" }}>{ask.price.toFixed(2)}</span>
                              <span className="text-xs text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{ask.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Spread</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
                        ${(orderBook.asks[0].price - orderBook.bids[0].price).toFixed(2)}
                        <span className="text-slate-500 ml-1">
                          ({(((orderBook.asks[0].price - orderBook.bids[0].price) / orderBook.bids[0].price) * 100).toFixed(2)}%)
                        </span>
                      </p>
                      <span title="The spread is the difference between the best ask and best bid. It represents the minimum price increase required to execute a trade.">
                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "trades" && (
                <div className="flex-1 flex flex-col">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Trade Price (Indicative)</span>
                        <span title="Reflects agreed basis; settlement determined ex-post">
                          <Info className="w-3 h-3 text-slate-400 cursor-help" />
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
                      <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Time</span>
                    </div>
                    {recentTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                        <span className={`text-sm font-medium ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>${trade.price.toFixed(2)}</span>
                        <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{trade.quantity}</span>
                        <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{trade.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Place Order</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Trade {selectedPairData.pair}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setOrderType("buy")} className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${orderType === "buy" ? "bg-gradient-to-r from-green-500 to-green-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} style={{ fontFamily: "var(--font-sans)" }}>Buy</button>
            <button type="button" onClick={() => setOrderType("sell")} className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${orderType === "sell" ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} style={{ fontFamily: "var(--font-sans)" }}>Sell</button>
          </div>
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setOrderMode("market")} className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${orderMode === "market" ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} style={{ fontFamily: "var(--font-sans)" }}>Market</button>
            <button type="button" onClick={() => setOrderMode("limit")} className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${orderMode === "limit" ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} style={{ fontFamily: "var(--font-sans)" }}>Limit</button>
          </div>
          <div className="space-y-4">
            {orderMode === "limit" && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Limit Price ($/kW-delivered)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900" style={{ fontFamily: "var(--font-sans)" }} />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Quantity (DTR)</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900" style={{ fontFamily: "var(--font-sans)" }} />
            </div>
            <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-orange-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>⚠ Settlement Risk</p>
                  <p className="text-xs text-orange-800 leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>Final payoff depends on realized delivery headroom at interval close.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["25%", "50%", "75%", "100%"].map((pct) => (
                <button key={pct} type="button" onClick={() => setQuantity("100")} className="py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 transition-colors" style={{ fontFamily: "var(--font-sans)" }}>{pct}</button>
              ))}
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Price:</span>
                <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${orderMode === "market" ? selectedPairData.price.toFixed(2) : limitPrice || "0.00"}/kW-delivered</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quantity:</span>
                <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{quantity || "0"} DTR</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Total:</span>
                <span className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>${calculateTotal()}</span>
              </div>
            </div>
            <button type="button" className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${orderType === "buy" ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"}`} style={{ fontFamily: "var(--font-sans)" }}>
              {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
            </button>
            <div className="pt-3 border-t border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Available Balance:</span>
                <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>$45,230.00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Available DTR:</span>
                <span className="font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>1,250 DTR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Recent Trades</h2>
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Live market activity for {selectedPairData.pair}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Price</span>
              <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Quantity</span>
              <span className="text-xs font-semibold text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Time</span>
            </div>
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                <span className={`text-sm font-medium ${trade.type === "buy" ? "text-green-600" : "text-red-600"}`} style={{ fontFamily: "var(--font-sans)" }}>${trade.price.toFixed(2)}</span>
                <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-sans)" }}>{trade.quantity}</span>
                <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{trade.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>Open Orders</h2>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Your active orders</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{openOrders.length} Active</span>
          </div>
          <div className="space-y-2.5">
            {openOrders.map((order) => (
              <div key={order.id} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{order.pair}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.type === "buy" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{order.type.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{order.quantity} DTR @ ${order.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    {order.status === "open" ? (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Open</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Partial</span>
                      </div>
                    )}
                  </div>
                </div>
                {order.filled > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Filled: {order.filled}/{order.quantity}</span>
                      <span>{((order.filled / order.quantity) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="h-1.5 bg-blue-500 rounded-full transition-all" style={{ width: `${(order.filled / order.quantity) * 100}%` }} />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>{order.time}</span>
                  <button type="button" className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors">Cancel</button>
                </div>
              </div>
            ))}
          </div>
          {openOrders.length === 0 && (
            <div className="py-12 text-center">
              <div className="p-4 bg-slate-100 rounded-full inline-flex mb-3">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>No open orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
