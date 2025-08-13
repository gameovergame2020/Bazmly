import React, { useState } from 'react';
import { User } from '../App';
import { 
  UtensilsCrossed, 
  Plus, 
  Search, 
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  Trash,
  ShoppingCart
} from 'lucide-react';

interface MenuInventoryProps {
  user: User;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  description: string;
  dietary: string[];
  image: string;
  available: boolean;
  popularity: number;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export const MenuInventory: React.FC<MenuInventoryProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'inventory' | 'suppliers'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Plov (Traditional Uzbek Pilaf)',
      category: 'Main Course',
      price: 25,
      cost: 8,
      description: 'Traditional Uzbek rice dish with lamb, carrots, and spices',
      dietary: ['Halal'],
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      popularity: 95
    },
    {
      id: '2',
      name: 'Manti (Steamed Dumplings)',
      category: 'Appetizer',
      price: 18,
      cost: 6,
      description: 'Steamed dumplings filled with seasoned lamb and onions',
      dietary: ['Halal'],
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      popularity: 87
    },
    {
      id: '3',
      name: 'Shashlik (Grilled Kebabs)',
      category: 'Main Course',
      price: 22,
      cost: 7,
      description: 'Grilled lamb kebabs with vegetables and flatbread',
      dietary: ['Halal', 'Gluten-Free'],
      image: 'https://images.pexels.com/photos/3659862/pexels-photo-3659862.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: false,
      popularity: 92
    },
    {
      id: '4',
      name: 'Lagman (Hand-pulled Noodles)',
      category: 'Soup',
      price: 16,
      cost: 5,
      description: 'Hand-pulled noodles in rich meat broth with vegetables',
      dietary: ['Halal'],
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      popularity: 78
    },
    {
      id: '5',
      name: 'Vegetarian Platter',
      category: 'Main Course',
      price: 20,
      cost: 6,
      description: 'Mixed vegetarian dishes with rice and fresh bread',
      dietary: ['Vegetarian', 'Vegan'],
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      popularity: 65
    },
    {
      id: '6',
      name: 'Wedding Cake (3-tier)',
      category: 'Dessert',
      price: 150,
      cost: 45,
      description: 'Traditional wedding cake with custom decoration',
      dietary: ['Vegetarian'],
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=300',
      available: true,
      popularity: 98
    }
  ];

  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Basmati Rice',
      category: 'Grains',
      currentStock: 250,
      minStock: 100,
      unit: 'kg',
      costPerUnit: 2.5,
      supplier: 'Uzbek Premium Foods',
      lastRestocked: '2025-01-15',
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'Lamb Meat',
      category: 'Meat',
      currentStock: 45,
      minStock: 50,
      unit: 'kg',
      costPerUnit: 12,
      supplier: 'Halal Meat Supply',
      lastRestocked: '2025-01-17',
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'Carrots',
      category: 'Vegetables',
      currentStock: 80,
      minStock: 30,
      unit: 'kg',
      costPerUnit: 1.2,
      supplier: 'Fresh Valley Farms',
      lastRestocked: '2025-01-16',
      status: 'in_stock'
    },
    {
      id: '4',
      name: 'Onions',
      category: 'Vegetables',
      currentStock: 15,
      minStock: 25,
      unit: 'kg',
      costPerUnit: 0.8,
      supplier: 'Local Farmers Market',
      lastRestocked: '2025-01-14',
      status: 'low_stock'
    },
    {
      id: '5',
      name: 'Flour',
      category: 'Grains',
      currentStock: 0,
      minStock: 50,
      unit: 'kg',
      costPerUnit: 1.5,
      supplier: 'Golden Grain Mills',
      lastRestocked: '2025-01-10',
      status: 'out_of_stock'
    }
  ];

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const getStatusColor = (status: string) => {
    const colors = {
      in_stock: 'bg-green-100 text-green-800',
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      in_stock: <Package className="w-4 h-4" />,
      low_stock: <AlertTriangle className="w-4 h-4" />,
      out_of_stock: <AlertTriangle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || <Package className="w-4 h-4" />;
  };

  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const lowStockItems = inventoryItems.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock');
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu & Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage menu items, track inventory, and supplier relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'menu' ? 'Menu Item' : 'Inventory'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {['menu', 'inventory', 'suppliers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <UtensilsCrossed className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+5%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{menuItems.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Menu Items</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-blue-500 text-sm font-medium">Active</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{inventoryItems.filter(i => i.status === 'in_stock').length}</h3>
            <p className="text-gray-600 text-sm mt-1">Items in Stock</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-red-500 text-sm font-medium">Alert</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{lowStockItems.length}</h3>
            <p className="text-gray-600 text-sm mt-1">Low Stock Alerts</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">${totalInventoryValue.toFixed(0)}</h3>
            <p className="text-gray-600 text-sm mt-1">Inventory Value</p>
          </div>
        </div>
      </div>

      {activeTab === 'menu' && (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
                {category !== 'all' && ` (${menuItems.filter(item => item.category === category).length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
                      {item.popularity}% popular
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-lg font-bold text-blue-600">${item.price}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      Cost: ${item.cost}
                    </span>
                  </div>
                  
                  {item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.dietary.map(diet => (
                        <span key={diet} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'inventory' && (
        <>
          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-red-800 font-medium">Low Stock Alert</h3>
              </div>
              <p className="text-red-700 text-sm mb-3">
                {lowStockItems.length} items need restocking
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockItems.map(item => (
                  <span key={item.id} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search inventory items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost per Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Restocked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.currentStock} {item.unit}
                        </div>
                        <div className="text-sm text-gray-600">
                          Min: {item.minStock} {item.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span>{item.status.replace('_', ' ').toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${item.costPerUnit.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.supplier}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(inventoryItems.map(item => item.supplier))).map(supplier => {
                const supplierItems = inventoryItems.filter(item => item.supplier === supplier);
                const totalValue = supplierItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
                
                return (
                  <div key={supplier} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 mb-2">{supplier}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Items Supplied:</span>
                        <span className="font-medium">{supplierItems.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Value:</span>
                        <span className="font-medium">${totalValue.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Categories:</span>
                        <span className="font-medium">
                          {Array.from(new Set(supplierItems.map(item => item.category))).length}
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Contact Supplier
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};