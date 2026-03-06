"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Palette,
  Key,
  Lock,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Eye,
  EyeOff,
  Check,
  Copy,
  RefreshCw,
  Trash2,
  Plus,
  AlertCircle,
} from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    trades: true,
    priceAlerts: true,
    news: false,
    weeklyReport: true,
  });

  const apiKeys = [
    { id: 1, name: "Production Key", key: "dtr_live_ak_1a2b3c4d5e6f7g8h", created: "2026-01-15", lastUsed: "2 hours ago", status: "active" },
    { id: 2, name: "Trading Bot", key: "dtr_live_ak_9i8h7g6f5e4d3c2b", created: "2026-01-20", lastUsed: "5 min ago", status: "active" },
  ];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "trading", label: "Trading", icon: CreditCard },
    { id: "api", label: "API Keys", icon: Key },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>
          Settings
        </h1>
        <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>
          Manage your account and platform preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === tab.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                  Profile Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-sans)" }}>JD</span>
                    </div>
                    <div>
                      <button type="button" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors mr-2">
                        Change Photo
                      </button>
                      <button type="button" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" defaultValue="john.doe@example.com" className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Country</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none" style={{ fontFamily: "var(--font-sans)" }} defaultValue="US">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                  <button type="button" className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                  Change Password
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type={showPassword ? "text" : "password"} className="w-full pl-11 pr-11 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type={showPassword ? "text" : "password"} className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type={showPassword ? "text" : "password"} className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Two-Factor Authentication</h2>
                    <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                  </label>
                </div>

                {twoFactorEnabled && (
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-green-100 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Two-factor authentication is enabled</p>
                        <p className="text-xs text-green-700" style={{ fontFamily: "var(--font-sans)" }}>Your account is protected with authenticator app verification</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Active Sessions</h2>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Current Session</p>
                        <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Chrome on macOS • San Francisco, CA</p>
                        <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: "var(--font-sans)" }}>Active now</p>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Mobile App</p>
                        <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>iOS App • Last active 2 hours ago</p>
                      </div>
                      <button type="button" className="text-xs font-medium text-red-600 hover:text-red-700">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Notification Preferences</h2>

                <div className="space-y-4">
                  {[
                    { key: "email", title: "Email Notifications", desc: "Receive notifications via email" },
                    { key: "push", title: "Push Notifications", desc: "Receive push notifications on your devices" },
                    { key: "trades", title: "Trade Confirmations", desc: "Get notified when your trades are executed" },
                    { key: "priceAlerts", title: "Price Alerts", desc: "Notifications when prices hit your targets" },
                    { key: "news", title: "Market News & Updates", desc: "Updates about grid conditions and market events" },
                    { key: "weeklyReport", title: "Weekly Performance Report", desc: "Receive a summary of your trading activity", last: true },
                  ].map((item) => (
                    <div key={item.key} className={`flex items-center justify-between py-3 ${item.last ? "" : "border-b border-slate-200"}`}>
                      <div>
                        <p className="text-sm font-medium text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>{item.title}</p>
                        <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "trading" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Trading Preferences</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Default Order Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} defaultValue="market">
                      <option value="market">Market Order</option>
                      <option value="limit">Limit Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Order Confirmation</label>
                    <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} defaultValue="always">
                      <option value="always">Always confirm</option>
                      <option value="market">Market orders only</option>
                      <option value="never">Never confirm</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Default Trade Size (DTR)</label>
                    <input type="number" defaultValue="100" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Risk Level</label>
                    <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} defaultValue="moderate">
                      <option value="conservative">Conservative</option>
                      <option value="moderate">Moderate</option>
                      <option value="aggressive">Aggressive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
                  <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>API Keys</h2>
                    <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Manage your API keys for programmatic trading</p>
                  </div>
                  <button type="button" className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Key
                  </button>
                </div>

                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>{key.name}</p>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">{key.key}</code>
                            <button type="button" className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors" title="Copy">
                              <Copy className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-600">
                            <span>Created: {key.created}</span>
                            <span>Last used: {key.lastUsed}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button type="button" className="p-2 hover:bg-slate-200 rounded-lg transition-colors" title="Regenerate">
                            <RefreshCw className="w-4 h-4 text-slate-600" />
                          </button>
                          <button type="button" className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-900 mb-1" style={{ fontFamily: "var(--font-sans)" }}>Keep your API keys secure</p>
                      <p className="text-xs text-orange-700" style={{ fontFamily: "var(--font-sans)" }}>Never share your API keys. They provide full access to your account and funds.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Appearance Settings</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button type="button" className="p-4 border-2 border-blue-500 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                        <div className="w-full h-16 bg-white border border-slate-200 rounded-lg mb-2" />
                        <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>Light</p>
                      </button>
                      <button type="button" className="p-4 border-2 border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                        <div className="w-full h-16 bg-slate-900 rounded-lg mb-2" />
                        <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>Dark</p>
                      </button>
                      <button type="button" className="p-4 border-2 border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                        <div className="w-full h-16 bg-gradient-to-r from-white to-slate-900 rounded-lg mb-2" />
                        <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>Auto</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Compact Mode</label>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>Reduce spacing for a more compact interface</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-sans)" }}>Chart Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" style={{ fontFamily: "var(--font-sans)" }} defaultValue="candlestick">
                      <option value="line">Line Chart</option>
                      <option value="candlestick">Candlestick</option>
                      <option value="area">Area Chart</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
