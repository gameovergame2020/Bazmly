import React, { useState } from 'react';
import { User } from '../App';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Palette,
  Database,
  Zap,
  Mail,
  Phone,
  MapPin,
  Save,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface SettingsProps {
  user: User;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Banquet Hall Pro',
      timezone: 'Asia/Tashkent',
      language: 'en',
      currency: 'UZS'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      bookingAlerts: true,
      paymentReminders: true,
      systemUpdates: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordPolicy: 'strong',
      loginAttempts: '5'
    },
    integrations: {
      eimzoEnabled: true,
      clickEnabled: true,
      paymeEnabled: true,
      uzcardEnabled: true,
      telegramBot: false
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      sidebarCollapsed: false,
      compactMode: false
    }
  });

  const sections = [
    { id: 'general', label: 'General', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <Zap className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> }
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.companyName}
                      onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Asia/Tashkent">Asia/Tashkent (GMT+5)</option>
                      <option value="Asia/Almaty">Asia/Almaty (GMT+6)</option>
                      <option value="Asia/Bishkek">Asia/Bishkek (GMT+6)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Language
                    </label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="uz">O'zbek</option>
                      <option value="ru">Русский</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Currency
                    </label>
                    <select
                      value={settings.general.currency}
                      onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="UZS">UZS - Uzbek Som</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="RUB">RUB - Russian Ruble</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Company Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="info@banquethall.uz"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+998 71 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="123 Wedding Street, Tashkent, Uzbekistan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                  <p className="text-gray-600">Choose how you want to be notified about important events.</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' && 'Receive notifications via email'}
                          {key === 'smsNotifications' && 'Receive SMS alerts for urgent matters'}
                          {key === 'bookingAlerts' && 'Get notified about new bookings'}
                          {key === 'paymentReminders' && 'Receive payment due reminders'}
                          {key === 'systemUpdates' && 'Get notified about system updates'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('notifications', key, !value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <p className="text-gray-600">Manage your account security and access controls.</p>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) => handleSettingChange('security', 'loginAttempts', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Policy
                    </label>
                    <select
                      value={settings.security.passwordPolicy}
                      onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="basic">Basic (8+ characters)</option>
                      <option value="strong">Strong (12+ chars, mixed case, numbers)</option>
                      <option value="very_strong">Very Strong (16+ chars, symbols required)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Integrations</h3>
                  <p className="text-gray-600">Configure integrations with local services and payment systems.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">E-imzo Digital Signature</h4>
                          <p className="text-sm text-gray-600">Uzbekistan official digital signature system</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">Active</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'clickEnabled', name: 'Click Payment', icon: '📱', status: 'Local' },
                      { key: 'paymeEnabled', name: 'Payme Integration', icon: '💳', status: 'Local' },
                      { key: 'uzcardEnabled', name: 'Uzcard Processing', icon: '💳', status: 'Local' },
                      { key: 'telegramBot', name: 'Telegram Bot', icon: '📲', status: 'Optional' }
                    ].map((integration) => (
                      <div key={integration.key} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.status}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('integrations', integration.key, !settings.integrations[integration.key as keyof typeof settings.integrations])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.integrations[integration.key as keyof typeof settings.integrations] ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.integrations[integration.key as keyof typeof settings.integrations] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
                  <p className="text-gray-600">Customize the look and feel of your dashboard.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {['light', 'dark'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleSettingChange('appearance', 'theme', theme)}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            settings.appearance.theme === theme
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-20 rounded-lg mb-2 ${
                            theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800'
                          }`}></div>
                          <span className="text-sm font-medium capitalize">{theme} Mode</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Primary Color
                    </label>
                    <div className="grid grid-cols-6 gap-3">
                      {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map((color) => (
                        <button
                          key={color}
                          onClick={() => handleSettingChange('appearance', 'primaryColor', color)}
                          className={`w-12 h-12 rounded-lg border-4 transition-all ${
                            settings.appearance.primaryColor === color
                              ? 'border-gray-400 scale-110'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Compact Mode</h4>
                        <p className="text-sm text-gray-600">Reduce spacing for more content density</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('appearance', 'compactMode', !settings.appearance.compactMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.appearance.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Collapsed Sidebar</h4>
                        <p className="text-sm text-gray-600">Default sidebar state when loading the app</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('appearance', 'sidebarCollapsed', !settings.appearance.sidebarCollapsed)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.appearance.sidebarCollapsed ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Regional Expansion Settings</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Multi-tenant configuration is ready for expansion across Central Asia. Each region can have 
          customized settings while maintaining centralized management capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>🇺🇿 Uzbekistan (Active)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>🇰🇿 Kazakhstan (Ready)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>🇰🇬 Kyrgyzstan (Planned)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>🇹🇯 Tajikistan (Future)</span>
          </div>
        </div>
      </div>
    </div>
  );
};