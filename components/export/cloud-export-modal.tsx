'use client';

import { useState } from 'react';
import { Expense } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cloud,
  Mail,
  Share2,
  History,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  QrCode,
  Zap,
  BarChart3,
  FileText,
} from 'lucide-react';

export interface CloudExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenses: Expense[];
}

type Tab = 'share' | 'schedule' | 'templates' | 'integrations' | 'history';

export function CloudExportModal({ open, onOpenChange, expenses }: CloudExportModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('share');
  const [shareLink, setShareLink] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('summary');

  const generateShareLink = () => {
    const link = `https://expensetracker.app/share/${Math.random().toString(36).substring(7)}`;
    setShareLink(link);
  };

  const mockExports = [
    {
      id: 1,
      name: 'Monthly Summary - January',
      template: 'Monthly Summary',
      format: 'PDF',
      date: '2026-01-31',
      time: '11:30 PM',
      records: 47,
      size: '2.3 MB',
    },
    {
      id: 2,
      name: 'Tax Report 2025',
      template: 'Tax Report',
      format: 'Excel',
      date: '2026-01-28',
      time: '3:45 PM',
      records: 156,
      size: '5.1 MB',
    },
    {
      id: 3,
      name: 'Category Analysis',
      template: 'Category Analysis',
      format: 'JSON',
      date: '2026-01-25',
      time: '9:15 AM',
      records: 156,
      size: '1.8 MB',
    },
  ];

  const integrations = [
    {
      name: 'Google Sheets',
      status: 'connected',
      lastSync: '2 hours ago',
      icon: '📊',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Dropbox',
      status: 'disconnected',
      lastSync: null,
      icon: '☁️',
      color: 'bg-gray-100 text-gray-700',
    },
    {
      name: 'OneDrive',
      status: 'disconnected',
      lastSync: null,
      icon: '📁',
      color: 'bg-gray-100 text-gray-700',
    },
    {
      name: 'Email',
      status: 'connected',
      lastSync: '5 minutes ago',
      icon: '📧',
      color: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-600" />
            Cloud Export Hub
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200 pb-4 overflow-x-auto">
            {[
              { id: 'share' as Tab, label: 'Share', icon: Share2 },
              { id: 'schedule' as Tab, label: 'Schedule', icon: Calendar },
              { id: 'templates' as Tab, label: 'Templates', icon: FileText },
              { id: 'integrations' as Tab, label: 'Integrations', icon: Zap },
              { id: 'history' as Tab, label: 'History', icon: History },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* SHARE TAB */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Generate Shareable Link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Create a secure, time-limited link to share your expense report with others.
                  </p>

                  {!shareLink ? (
                    <Button
                      onClick={generateShareLink}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Generate Share Link
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Share Link</p>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-blue-600">{shareLink}</code>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Copy
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowQR(!showQR)}
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50"
                        >
                          <QrCode className="h-4 w-4 inline mr-2" />
                          Show QR Code
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Email Link
                        </button>
                      </div>

                      {showQR && (
                        <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                          <p className="text-xs text-gray-500 mb-3">Scan to view report</p>
                          <div className="bg-gray-200 w-32 h-32 mx-auto rounded flex items-center justify-center text-gray-500 text-xs">
                            [QR Code]
                          </div>
                        </div>
                      )}

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Link expires in 7 days or 10 views
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Automatic Backups</span>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={scheduleEnabled}
                        onChange={(e) => setScheduleEnabled(e.target.checked)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm font-normal">Enable</span>
                    </label>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scheduleEnabled && (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">
                          Backups scheduled for every Sunday at 2:00 AM
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Backup Frequency
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Daily</option>
                            <option selected>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Backup Time
                          </label>
                          <input
                            type="time"
                            defaultValue="02:00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Backup Destination
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Google Drive</option>
                            <option>Dropbox</option>
                            <option>Email</option>
                          </select>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600">
                            <Clock className="h-3 w-3 inline mr-1" />
                            Last backup: Today at 2:15 AM
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {!scheduleEnabled && (
                    <p className="text-sm text-gray-600">Enable automatic backups to protect your data</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TEMPLATES TAB */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: 'summary',
                    name: 'Monthly Summary',
                    desc: 'Overview with charts and trends',
                    icon: BarChart3,
                  },
                  {
                    id: 'tax',
                    name: 'Tax Report',
                    desc: 'Categorized by expense type',
                    icon: FileText,
                  },
                  {
                    id: 'analysis',
                    name: 'Category Analysis',
                    desc: 'Deep dive into spending patterns',
                    icon: BarChart3,
                  },
                ].map(({ id, name, desc, icon: Icon }) => (
                  <Card
                    key={id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm text-gray-900">{name}</p>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                      </div>
                      {selectedTemplate === id && <CheckCircle className="h-5 w-5 text-blue-600" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Export with "{selectedTemplate === 'summary' ? 'Monthly Summary' : selectedTemplate === 'tax' ? 'Tax Report' : 'Category Analysis'}"
              </Button>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {integrations.map((integration) => (
                  <Card key={integration.name}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{integration.icon}</span>
                        <Badge
                          className={`text-xs ${
                            integration.status === 'connected'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {integration.status === 'connected' ? 'Connected' : 'Connect'}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm text-gray-900">{integration.name}</p>
                      {integration.lastSync && (
                        <p className="text-xs text-gray-500 mt-2">Synced {integration.lastSync}</p>
                      )}
                      {integration.status === 'disconnected' && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium">
                          Connect Now
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {mockExports.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{exp.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="text-xs">
                            {exp.template}
                          </Badge>
                          <span className="text-xs text-gray-500">{exp.format}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{exp.records} records</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {exp.date} at {exp.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-700">{exp.size}</p>
                        <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
                          Download
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {activeTab === 'share' && shareLink && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
