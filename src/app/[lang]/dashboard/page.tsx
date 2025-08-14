"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, Eye, Package, TrendingUp, DollarSign, Truck, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  date_added: string;
  brand: string;
  rating: number;
  stock: number;
  isSale: boolean;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    productId: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'dispatched' | 'delivered' | 'received' | 'returned' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  customerPhone: string;
  billingAddress: string;
  subtotal: number;
  shipping: number;
  tax: number;
  codFee: number;
  cancellationReason?: string;
  cancelledAt?: string;
  returnReason?: string;
  returnedAt?: string;
  deliveredAt?: string;
  receivedAt?: string;
}

const DashboardPage = () => {
  const t = useTranslations('dashboard');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("products");
  const [isDispatchDialogOpen, setIsDispatchDialogOpen] = useState(false);
  const [orderToDispatch, setOrderToDispatch] = useState<Order | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    brand: "",
    rating: "",
    stock: "",
    isSale: false,
  });

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('Products loaded from API:', result.products);
            // Sort products by date_added in reverse order (newest first)
            const sortedProducts = result.products.sort((a: Product, b: Product) => 
              new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
            );
            setProducts(sortedProducts);
            setFilteredProducts(sortedProducts);
          } else {
            console.error('Failed to load products from API');
            setProducts([]);
            setFilteredProducts([]);
            toast.error('Failed to load products from API. Please try again later.');
          }
        } else {
          console.error('Failed to load products from API');
          setProducts([]);
          setFilteredProducts([]);
          toast.error('Failed to load products from API. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching products from API:', error);
        setProducts([]);
        setFilteredProducts([]);
        toast.error('Failed to load products from API. Please try again later.');
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Load orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setOrders(data.orders)
            setFilteredOrders(data.orders)
          } else {
            // No orders yet, start with empty array
            setOrders([])
            setFilteredOrders([])
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        // Start with empty array if API fails
        setOrders([])
        setFilteredOrders([])
      }
    };

    fetchOrders();
  }, []);

  // Filter and paginate products
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    switch (selectedFilter) {
      case "onsale":
        filtered = filtered.filter(product => product.isSale);
        break;
      case "lowstock":
        filtered = filtered.filter(product => product.stock < 10);
        break;
      case "highrating":
        filtered = filtered.filter(product => product.rating >= 4.5);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, selectedFilter]);

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (orderSearchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(orderSearchTerm.toLowerCase())
      );
    }

    if (selectedOrderStatus && selectedOrderStatus !== "all") {
      filtered = filtered.filter(order => order.status === selectedOrderStatus);
    }

    setFilteredOrders(filtered);
    setCurrentOrdersPage(1);
  }, [orders, orderSearchTerm, selectedOrderStatus]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(files);
    
    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target?.result as string);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAddingProduct(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        subcategory: formData.subcategory,
        image: imagePreviews[0] || "/productImages/default.jpg",
        images: imagePreviews.length > 0 ? imagePreviews : ["/productImages/default.jpg"],
        brand: formData.brand,
        rating: parseFloat(formData.rating),
        stock: parseInt(formData.stock),
        isSale: formData.isSale,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Add to local state
          setProducts([result.product, ...products]); // Add to beginning for reverse order
          resetForm();
          setIsAddDialogOpen(false);
          toast.success(t('toasts.productAdded'));
        } else {
          toast.error(t('toasts.failedToAddProduct'));
        }
      } else {
        toast.error(t('toasts.failedToAddProduct'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(t('toasts.failedToAddProduct'));
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleEdit = (product: Product) => {
    // Reset form first to clear any previous data
    resetForm();
    
    // Debug: Log the product data being loaded
    console.log('Editing product:', product);
    console.log('Product category:', product.category);
    console.log('Product subcategory:', product.subcategory);
    console.log('Available categories:', categories);
    console.log('Available subcategories for category:', subcategories[product.category as keyof typeof subcategories]);
    
    // Set editing product and form data
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      rating: product.rating.toString(),
      stock: product.stock.toString(),
      isSale: product.isSale,
    });
    setImagePreviews(product.images);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdatingProduct(true);
    try {
      const updateData = {
        id: editingProduct.id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        subcategory: formData.subcategory,
        image: imagePreviews[0] || editingProduct.image,
        images: imagePreviews.length > 0 ? imagePreviews : editingProduct.images,
        brand: formData.brand,
        rating: parseFloat(formData.rating),
        stock: parseInt(formData.stock),
        isSale: formData.isSale,
      };

      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state
          setProducts(products.map(p => p.id === editingProduct.id ? result.product : p));
          resetForm();
          setIsEditDialogOpen(false);
          setEditingProduct(null);
          toast.success(t('toasts.productUpdated'));
        } else {
          toast.error(t('toasts.failedToUpdateProduct'));
        }
      } else {
        toast.error(t('toasts.failedToUpdateProduct'));
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(t('toasts.failedToUpdateProduct'));
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Remove from local state
          setProducts(products.filter(p => p.id !== productId));
          setFilteredProducts(filteredProducts.filter(p => p.id !== productId));
          toast.success(t('toasts.productDeleted'));
        } else {
          toast.error(t('toasts.failedToDeleteProduct'));
        }
      } else {
        toast.error(t('toasts.failedToDeleteProduct'));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(t('toasts.failedToDeleteProduct'));
    }
  };

  const handleDispatchOrder = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrderToDispatch(order);
      setIsDispatchDialogOpen(true);
    }
  };

  const markOrderAsDelivered = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: 'delivered',
          deliveredAt: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        // Update local state
        const updatedOrders = orders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'delivered' as const, deliveredAt: new Date().toISOString() }
            : order
        );
        
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        toast.success(t('toasts.orderMarkedDelivered', { orderId: orderId.slice(-8) }));
      } else {
        toast.error(t('toasts.failedToUpdateOrder'));
      }
    } catch (error) {
      console.error('Error marking order as delivered:', error);
        toast.error(t('toasts.failedToUpdateOrder'));
    }
  };

  const confirmDispatchOrder = async () => {
    if (!orderToDispatch) return;
    
    setIsDispatching(true);
    try {
      // Update local state immediately for better UX
      const updatedOrders = orders.map(order => 
        order.id === orderToDispatch.id 
          ? { ...order, status: 'dispatched' as const }
          : order
      );
      
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      
      // Update the order status in the backend
      const response = await fetch(`/api/orders/${orderToDispatch.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'dispatched' }),
      });
      
      if (!response.ok) {
        console.error('Failed to update order status in backend');
        toast.error(t('toasts.failedToDispatchOrder'));
        // Revert local state if backend update failed
        setOrders(orders);
        setFilteredOrders(orders);
      } else {
        toast.success(t('toasts.orderDispatched'));
        // Update the order in the dialog as well
        setOrderToDispatch({ ...orderToDispatch, status: 'dispatched' });
      }
    } catch (error) {
      console.error('Error dispatching order:', error);
      toast.error(t('toasts.failedToDispatchOrder'));
      // Revert local state if there was an error
      setOrders(orders);
      setFilteredOrders(orders);
    } finally {
      setIsDispatching(false);
    }
  };

  const refreshOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setOrders(data.orders)
          setFilteredOrders(data.orders)
          toast.success(t('toasts.ordersRefreshedWithCount', { count: data.orders.length }));
        } else {
          toast.error(t('toasts.failedToRefreshOrders'))
        }
      } else {
        toast.error(t('toasts.failedToRefreshOrders'))
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error(t('toasts.failedToRefreshOrders'))
    }
  };

  const refreshProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Sort products by date_added in reverse order (newest first)
          const sortedProducts = result.products.sort((a: Product, b: Product) => 
            new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
          );
          setProducts(sortedProducts);
          setFilteredProducts(sortedProducts);
          toast.success(t('toasts.productsRefreshed'));
        } else {
          toast.error(t('toasts.failedToRefreshProducts'));
        }
      } else {
        toast.error(t('toasts.failedToRefreshProducts'));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error(t('toasts.failedToRefreshProducts'));
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const exportOrders = () => {
    if (orders.length === 0) {
      toast.error(t('toasts.noOrdersToExport'))
      return
    }

    const csvContent = [
      ['Order ID', 'Customer Name', 'Customer Email', 'Customer Phone', 'Status', 'Order Date', 'Total Amount', 'Payment Method', 'Shipping Address'],
      ...orders.map(order => [
        order.id,
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.status,
        order.orderDate,
        `$${order.totalAmount.toFixed(2)}`,
        order.paymentMethod,
        order.shippingAddress
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success(t('toasts.ordersExported'))
  };

  // Note: Admin cannot return orders - this functionality has been removed

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      subcategory: "",
      brand: "",
      rating: "",
      stock: "",
      isSale: false,
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setEditingProduct(null);
  };

  const categories = [
    t('categories.womanFashion'),
    t('categories.menFashion'), 
    t('categories.sportsOutdoor'),
    t('categories.groceriesPets'),
    t('categories.medicine'),
    t('categories.homeLifestyle'),
    t('categories.electronics'),
    t('categories.beauty'),
    t('categories.books'),
    t('categories.toys'),
    t('categories.automotive')
  ];
  
  const subcategories = {
    [t('categories.womanFashion')]: [
      t('subcategories.watches'),
      t('subcategories.dresses'),
      t('subcategories.shoes'),
      t('subcategories.accessories'),
      t('subcategories.bags')
    ],
    [t('categories.menFashion')]: [
      t('subcategories.tShirts'),
      t('subcategories.jeans'),
      t('subcategories.shirts'),
      t('subcategories.shoes'),
      t('subcategories.accessories')
    ],
    [t('categories.sportsOutdoor')]: [
      t('subcategories.football'),
      t('subcategories.baseball'),
      t('subcategories.tennis'),
      t('subcategories.basketball'),
      t('subcategories.fitness'),
      t('subcategories.outdoor')
    ],
    [t('categories.groceriesPets')]: [
      t('subcategories.petFood'),
      t('subcategories.petToys'),
      t('subcategories.petCare'),
      t('subcategories.humanFood'),
      t('subcategories.beverages')
    ],
    [t('categories.medicine')]: [
      t('subcategories.vitamins'),
      t('subcategories.supplements'),
      t('subcategories.firstAid'),
      t('subcategories.personalCare')
    ],
    [t('categories.homeLifestyle')]: [
      t('subcategories.furniture'),
      t('subcategories.decor'),
      t('subcategories.kitchen'),
      t('subcategories.garden'),
      t('subcategories.bedding')
    ],
    [t('categories.electronics')]: [
      t('subcategories.mobile'),
      t('subcategories.audio'),
      t('subcategories.wearables'),
      t('subcategories.computers'),
      t('subcategories.gaming')
    ],
    [t('categories.beauty')]: [
      t('subcategories.skincare'),
      t('subcategories.makeup'),
      t('subcategories.haircare'),
      t('subcategories.fragrances')
    ],
    [t('categories.books')]: [
      t('subcategories.fiction'),
      t('subcategories.nonFiction'),
      t('subcategories.educational'),
      t('subcategories.children')
    ],
    [t('categories.toys')]: [
      t('subcategories.educational'),
      t('subcategories.actionFigures'),
      t('subcategories.boardGames'),
      t('subcategories.puzzles')
    ],
    [t('categories.automotive')]: [
      t('subcategories.cars'),
      t('subcategories.motorcycles'),
      t('subcategories.parts'),
      t('subcategories.accessories')
    ]
  };

  const getOrderSummary = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const dispatchedOrders = orders.filter(o => o.status === 'dispatched').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const returnedOrders = orders.filter(o => o.status === 'returned').length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    
    return { totalOrders, pendingOrders, dispatchedOrders, deliveredOrders, returnedOrders, cancelledOrders };
  };

  const stats = [
    { title: t('stats.totalProducts'), value: products.length || 0, icon: Package, color: "text-blue-600" },
    { title: t('stats.totalOrders'), value: getOrderSummary().totalOrders, icon: TrendingUp, color: "text-green-600" },
    { title: t('stats.pendingOrders'), value: getOrderSummary().pendingOrders, icon: RefreshCw, color: "text-orange-600" },
    { title: t('stats.dispatchedOrders'), value: getOrderSummary().dispatchedOrders, icon: Truck, color: "text-purple-600" },
  ];

  // Pagination for products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination for orders
  const totalOrdersPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startOrdersIndex = (currentOrdersPage - 1) * itemsPerPage;
  const endOrdersIndex = startOrdersIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startOrdersIndex, endOrdersIndex);

  const goToPage = (page: number) => setCurrentPage(page);
  const goToOrdersPage = (page: number) => setCurrentOrdersPage(page);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{t('orders.statusBadges.pending')}</Badge>;
      case 'dispatched':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t('orders.statusBadges.dispatched')}</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{t('orders.statusBadges.delivered')}</Badge>;
      case 'received':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{t('orders.statusBadges.received')}</Badge>;
      case 'returned':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">{t('orders.statusBadges.returned')}</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">{t('orders.statusBadges.cancelled')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (open) {
              // Reset form when opening add dialog
              resetForm();
            } else {
              // Reset form when closing dialog
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                {t('addProduct')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('forms.addProduct.title')}</DialogTitle>
                <DialogDescription>{t('forms.addProduct.subtitle')}</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-1">{t('forms.addProduct.fields.name')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand" className="mb-1">{t('forms.addProduct.fields.brand')}</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="mb-1">{t('forms.addProduct.fields.category')}</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('forms.addProduct.placeholders.selectCategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subcategory" className="mb-1">{t('forms.addProduct.fields.subcategory')}</Label>
                    <Select 
                      value={formData.subcategory} 
                      onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                      disabled={!formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.category ? t('forms.addProduct.placeholders.selectSubcategory') : t('forms.addProduct.placeholders.selectCategoryFirst')} />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="mb-1">{t('forms.addProduct.fields.description')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price" className="mb-1">{t('forms.addProduct.fields.price')}</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating" className="mb-1">{t('forms.addProduct.fields.rating')}</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="mb-1">{t('forms.addProduct.fields.stock')}</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isSale"
                      checked={formData.isSale}
                      onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isSale" className="mb-1">{t('forms.addProduct.fields.isSale')}</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="image" className="mb-1">{t('forms.addProduct.fields.images')}</Label>
                  <div className="mt-2 flex items-center space-x-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="file:mr-4 file:py-2 file:h-fit file:px-4 h-fit py-1 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {imagePreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {imagePreviews.map((preview, index) => (
                          <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded border" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t('forms.addProduct.buttons.cancel')}
                  </Button>
                  <Button type="submit" disabled={isAddingProduct}>
                    {isAddingProduct ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('forms.addProduct.buttons.adding')}
                      </>
                    ) : (
                      t('forms.addProduct.buttons.add')
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-fit">
            <TabsTrigger value="products" className="py-2">{t('tabs.productsManagement')}</TabsTrigger>
            <TabsTrigger value="orders" className="py-2">{t('tabs.ordersManagement')}</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('products.title')}</CardTitle>
                <CardDescription>{t('products.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder={t('products.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={refreshProducts}
                      className="w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t('products.refresh')}
                    </Button>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder={t('products.allCategories')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder={t('products.allProducts')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('products.allProducts')}</SelectItem>
                        <SelectItem value="onsale">{t('products.onSale')}</SelectItem>
                        <SelectItem value="lowstock">{t('products.lowStock')}</SelectItem>
                        <SelectItem value="highrating">{t('products.highRating')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products Table */}
                <div className="rounded-md border">
                  {isLoadingProducts ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-500 text-lg">{t('products.loadingProducts')}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-9 gap-4 p-4 bg-gray-50">
                        <div className="font-medium">{t('products.tableHeaders.image')}</div>
                        <div className="font-medium">{t('products.tableHeaders.product')}</div>
                        <div className="font-medium">{t('products.tableHeaders.brand')}</div>
                        <div className="font-medium">{t('products.tableHeaders.category')}</div>
                        <div className="font-medium">{t('products.tableHeaders.price')}</div>
                        <div className="font-medium">{t('products.tableHeaders.rating')}</div>
                        <div className="font-medium">{t('products.tableHeaders.stock')}</div>
                        <div className="font-medium">{t('products.tableHeaders.status')}</div>
                        <div className="font-medium">{t('products.tableHeaders.actions')}</div>
                      </div>
                      <div className="divide-y">
                        {currentProducts.length === 0 ? (
                          <div className="p-8 text-center">
                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500 text-lg">{t('products.noProductsFound')}</p>
                            <p className="text-gray-400 text-sm mt-2">
                              {filteredProducts.length === 0 && products.length === 0 
                                ? t('products.noProductsAdded')
                                : t('products.noProductsMatchFilters')}
                            </p>
                          </div>
                        ) : (
                          currentProducts.map((product) => (
                            <div key={product.id} className="grid grid-cols-9 gap-4 p-4 items-center">
                              <div>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded border"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-48">
                                  {product.description}
                                </div>
                              </div>
                              <div>{product.brand}</div>
                              <div>
                                <div className="text-sm">
                                  <div>{product.category}</div>
                                  <div className="text-gray-500">{product.subcategory}</div>
                                </div>
                              </div>
                              <div>${product.price}</div>
                              <div>
                                <div className="flex items-center space-x-1">
                                  <span>{product.rating}</span>
                                  <span className="text-yellow-500">⭐</span>
                                </div>
                              </div>
                              <div>
                                <span className={product.stock < 10 ? "text-red-600 font-semibold" : ""}>
                                  {product.stock}
                                </span>
                              </div>
                              <div>
                                {product.isSale && <Badge variant="destructive">{t('products.onSaleBadge')}</Badge>}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(product)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Products Pagination */}
                {!isLoadingProducts && totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-700">
                      {t('products.pagination.showing')} {startIndex + 1} {t('products.pagination.to')} {Math.min(endIndex, filteredProducts.length)} {t('products.pagination.of')} {filteredProducts.length} {t('products.pagination.results')}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('orders.title')}</CardTitle>
                <CardDescription>{t('orders.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder={t('orders.searchPlaceholder')}
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={selectedOrderStatus} onValueChange={setSelectedOrderStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder={t('orders.allStatuses')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('orders.allStatuses')}</SelectItem>
                        <SelectItem value="pending">{t('orders.pending')}</SelectItem>
                        <SelectItem value="dispatched">{t('orders.dispatched')}</SelectItem>
                        <SelectItem value="delivered">{t('orders.delivered')}</SelectItem>
                        <SelectItem value="returned">{t('orders.returned')}</SelectItem>
                        <SelectItem value="cancelled">{t('orders.cancelled')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={refreshOrders}
                      className="w-full sm:w-auto"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t('orders.refresh')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={exportOrders}
                      className="w-full sm:w-auto"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      {t('orders.export')}
                    </Button>
                  </div>
                </div>

                {/* Order Summary Cards */}
                {orders.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{getOrderSummary().totalOrders}</div>
                      <div className="text-xs md:text-sm text-blue-600">{t('orders.summaryCards.totalOrders')}</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-yellow-600">{getOrderSummary().pendingOrders}</div>
                      <div className="text-xs md:text-sm text-yellow-600">{t('orders.summaryCards.pending')}</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-blue-600">{getOrderSummary().dispatchedOrders}</div>
                      <div className="text-xs md:text-sm text-blue-600">{t('orders.summaryCards.dispatched')}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-green-600">{getOrderSummary().deliveredOrders}</div>
                      <div className="text-xs md:text-sm text-green-600">{t('orders.summaryCards.delivered')}</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-red-600">{getOrderSummary().returnedOrders}</div>
                      <div className="text-xs md:text-sm text-red-600">{t('orders.summaryCards.returned')}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xl md:text-2xl font-bold text-gray-600">{getOrderSummary().cancelledOrders}</div>
                      <div className="text-xs md:text-sm text-gray-600">{t('orders.summaryCards.cancelled')}</div>
                    </div>
                  </div>
                )}

                {/* Orders Table */}
                <div className="rounded-md border overflow-hidden">
                  {/* Desktop Table View */}
                  <div className="hidden lg:block">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50">
                      <div className="font-medium">{t('orders.tableHeaders.customer')}</div>
                      <div className="font-medium">{t('orders.tableHeaders.products')}</div>
                      <div className="font-medium">{t('orders.tableHeaders.total')}</div>
                      <div className="font-medium">{t('orders.tableHeaders.status')}</div>
                      <div className="font-medium">{t('orders.tableHeaders.payment')}</div>
                      <div className="font-medium">{t('orders.tableHeaders.actions')}</div>
                    </div>
                    
                    {currentOrders.length === 0 ? (
                      <div className="p-8 text-center">
                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 text-lg">{t('orders.noOrdersFound')}</p>
                        <p className="text-gray-400 text-sm mt-2">
                          {filteredOrders.length === 0 && orders.length === 0 
                            ? t('orders.noOrdersYet') 
                            : t('orders.noOrdersMatchFilters')}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {currentOrders.map((order) => (
                          <div key={order.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50">
                            <div>
                              <div className="font-medium">{order.customerName}</div>
                              <div className="text-sm text-gray-500">{order.customerEmail}</div>
                              <div className="text-xs text-gray-400">{order.customerPhone}</div>
                            </div>
                            <div>
                              {order.products.map((product, index) => (
                                <div key={index} className="text-sm mb-1">
                                  <span className="font-medium">{product.name}</span>
                                  <span className="text-gray-500"> x{product.quantity}</span>
                                  <div className="text-xs text-gray-400">${product.price} {t('orderDetails.fields.each')}</div>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="font-medium text-lg">${order.totalAmount.toFixed(2)}</div>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>{t('orderDetails.fields.subtotal')}: ${order.subtotal.toFixed(2)}</div>
                                <div>{t('orderDetails.fields.tax')}: ${order.tax.toFixed(2)}</div>
                                <div>{t('orderDetails.fields.shipping')}: ${order.shipping.toFixed(2)}</div>
                                {order.codFee > 0 && <div>{t('orderDetails.fields.codFee')}: ${order.codFee.toFixed(2)}</div>}
                              </div>
                            </div>
                            <div>{getStatusBadge(order.status)}</div>
                            <div className="text-sm">
                              <div className="font-medium capitalize">{order.paymentMethod === 'cod' ? t('orders.paymentMethods.cod') : order.paymentMethod}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {order.status === 'pending' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDispatchOrder(order.id)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Truck className="w-4 h-4 mr-1" />
                                  {t('orders.actions.dispatch')}
                                </Button>
                              )}
                              {order.status === 'dispatched' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markOrderAsDelivered(order.id)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {t('orders.actions.markDelivered')}
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setOrderToDispatch(order);
                                  setIsDispatchDialogOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-700"
                                title={t('orders.actions.viewDetails')}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile/Tablet Card View */}
                  <div className="lg:hidden">
                    {currentOrders.length === 0 ? (
                      <div className="p-8 text-center">
                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 text-lg">{t('orders.noOrdersFound')}</p>
                        <p className="text-gray-400 text-sm mt-2">
                          {filteredOrders.length === 0 && orders.length === 0 
                            ? t('orders.noOrdersYet') 
                            : t('orders.noOrdersMatchFilters')}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 p-4">
                        {currentOrders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4 space-y-3 hover:bg-gray-50">
                            {/* Order Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-mono">
                                  {order.id.slice(-8)}
                                </Badge>
                                {getStatusBadge(order.status)}
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                                <div>{new Date(order.orderDate).toLocaleTimeString()}</div>
                              </div>
                            </div>

                            {/* Customer Info */}
                            <div className="space-y-1">
                              <div className="font-medium text-gray-900">{order.customerName}</div>
                              <div className="text-sm text-gray-600">{order.customerEmail}</div>
                              <div className="text-sm text-gray-600">{order.customerPhone}</div>
                            </div>

                            {/* Products */}
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-700">{t('mobile.products')}:</div>
                              {order.products.map((product, index) => (
                                <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{product.name}</span>
                                    <span className="text-gray-600">x{product.quantity}</span>
                                  </div>
                                  <div className="text-gray-500">${product.price} {t('orderDetails.fields.each')}</div>
                                </div>
                              ))}
                            </div>

                            {/* Order Summary */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">{t('mobile.subtotal')}:</div>
                                <div className="font-medium">${order.subtotal.toFixed(2)}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">{t('orderDetails.fields.total')}:</div>
                                <div className="font-medium text-lg">${order.totalAmount.toFixed(2)}</div>
                              </div>
                            </div>

                            {/* Payment & Shipping */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">{t('orderDetails.fields.paymentMethod')}:</div>
                                <div className="font-medium capitalize">
                                  {order.paymentMethod === 'cod' ? t('orders.paymentMethods.cod') : order.paymentMethod}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600">{t('mobile.shipping')}:</div>
                                <div className="font-medium">${order.shipping.toFixed(2)}</div>
                              </div>
                            </div>

                            {/* Address */}
                            <div className="text-sm">
                              <div className="text-gray-600">{t('orderDetails.fields.shippingAddress')}:</div>
                              <div className="text-gray-900">{order.shippingAddress}</div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-2 border-t">
                              {order.status === 'pending' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDispatchOrder(order.id)}
                                  className="text-green-600 hover:text-green-700 flex-1"
                                >
                                  <Truck className="w-4 h-4 mr-2" />
                                  {t('mobile.dispatchOrder')}
                                </Button>
                              )}
                              {order.status === 'dispatched' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markOrderAsDelivered(order.id)}
                                  className="text-blue-600 hover:text-blue-700 flex-1"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  {t('mobile.markDelivered')}
                                </Button>
                              )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                setOrderToDispatch(order);
                                setIsDispatchDialogOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 flex-1"
                                title={t('orders.actions.viewDetails')}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                {t('orders.actions.viewDetails')}
                            </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Orders Pagination */}
                {totalOrdersPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                    <div className="text-sm text-gray-700 text-center sm:text-left">
                      {t('orders.pagination.showing')} {startOrdersIndex + 1} {t('orders.pagination.to')} {Math.min(endOrdersIndex, filteredOrders.length)} {t('orders.pagination.of')} {filteredOrders.length} {t('orders.pagination.results')}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToOrdersPage(currentOrdersPage - 1)}
                        disabled={currentOrdersPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalOrdersPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentOrdersPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToOrdersPage(page)}
                            className="hidden sm:inline-flex"
                          >
                            {page}
                          </Button>
                        ))}
                        {/* Mobile pagination - show current page and total */}
                        <div className="sm:hidden text-sm text-gray-600">
                          {currentOrdersPage} / {totalOrdersPages}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToOrdersPage(currentOrdersPage + 1)}
                        disabled={currentOrdersPage === totalOrdersPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) {
          resetForm();
          setEditingProduct(null);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('forms.editProduct.title')}</DialogTitle>
            <DialogDescription>{t('forms.editProduct.subtitle')}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">{t('forms.editProduct.fields.name')}</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-brand">{t('forms.editProduct.fields.brand')}</Label>
                <Input
                  id="edit-brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">{t('forms.editProduct.fields.category')}</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('forms.editProduct.placeholders.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-subcategory">{t('forms.editProduct.fields.subcategory')}</Label>
                <Select 
                  value={formData.subcategory} 
                  onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.category ? t('forms.editProduct.placeholders.selectSubcategory') : t('forms.editProduct.placeholders.selectCategoryFirst')} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((subcategory) => (
                      <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">{t('forms.editProduct.fields.description')}</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-price">{t('forms.editProduct.fields.price')}</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-rating">{t('forms.editProduct.fields.rating')}</Label>
                    <Input
                      id="edit-rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-stock">{t('forms.editProduct.fields.stock')}</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-isSale"
                  checked={formData.isSale}
                  onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="edit-isSale">{t('forms.editProduct.fields.isSale')}</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image">{t('forms.editProduct.fields.images')}</Label>
              <div className="mt-2 flex items-center space-x-4">
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="file:mr-4 file:py-2 file:h-fit file:px-4 h-fit py-1 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded border" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                {t('forms.editProduct.buttons.cancel')}
              </Button>
              <Button type="submit" disabled={isUpdatingProduct}>
                {isUpdatingProduct ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('forms.editProduct.buttons.updating')}
                  </>
                ) : (
                  t('forms.editProduct.buttons.update')
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dispatch Confirmation Dialog */}
      <Dialog open={isDispatchDialogOpen} onOpenChange={setIsDispatchDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('orderDetails.title')} - #{orderToDispatch?.id}</DialogTitle>
            <DialogDescription>{t('orderDetails.subtitle')}</DialogDescription>
          </DialogHeader>
          
          {orderToDispatch && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.sections.customerInfo')}</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">{t('orderDetails.fields.name')}:</span> {orderToDispatch.customerName}</p>
                    <p><span className="font-medium">{t('orderDetails.fields.email')}:</span> {orderToDispatch.customerEmail}</p>
                    <p><span className="font-medium">{t('orderDetails.fields.phone')}:</span> {orderToDispatch.customerPhone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('orderDetails.sections.orderInfo')}</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">{t('orderDetails.fields.orderId')}:</span> {orderToDispatch.id}</p>
                    <p><span className="font-medium">{t('orderDetails.fields.orderDate')}:</span> {new Date(orderToDispatch.orderDate).toLocaleString()}</p>
                    <p><span className="font-medium">{t('orderDetails.fields.status')}:</span> {getStatusBadge(orderToDispatch.status)}</p>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">{t('orderDetails.sections.orderProducts')}</h4>
                <div className="space-y-3">
                  {orderToDispatch.products.map((product, index) => {
                    // Find the actual product data to get the image
                    const actualProduct = products.find(p => p.id === product.productId);
                    const productImage = actualProduct ? actualProduct.image : '/productImages/default.jpg';
                    
                    // Debug information
                    console.log('Product:', product);
                    console.log('Actual Product:', actualProduct);
                    console.log('Product Image:', productImage);
                    console.log('All products:', products);
                    
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log('Image failed to load:', productImage);
                              e.currentTarget.src = '/productImages/default.jpg';
                            }}
                            onLoad={() => {
                              console.log('Image loaded successfully:', productImage);
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{product.name}</h5>
                          <p className="text-sm text-gray-600">{t('orderDetails.fields.quantity')}: {product.quantity}</p>
                          <p className="text-sm text-gray-600">{t('orderDetails.fields.price')}: ${product.price.toFixed(2)} {t('orderDetails.fields.each')}</p>
                          {actualProduct && (
                            <div className="text-xs text-gray-500 mt-1">
                              <span>{t('orderDetails.fields.brand')}: {actualProduct.brand}</span>
                              <span className="mx-2">•</span>
                              <span>{t('orderDetails.fields.category')}: {actualProduct.category}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">{t('orderDetails.sections.paymentDetails')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t('orderDetails.fields.paymentMethod')}:</span>
                      <span className="font-medium capitalize">
                        {orderToDispatch.paymentMethod === 'cod' ? t('orders.paymentMethods.cod') : orderToDispatch.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('orderDetails.fields.subtotal')}:</span>
                      <span>${orderToDispatch.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('orderDetails.fields.tax')}:</span>
                      <span>${orderToDispatch.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('orderDetails.fields.shipping')}:</span>
                      <span>${orderToDispatch.shipping.toFixed(2)}</span>
                    </div>
                    {orderToDispatch.codFee > 0 && (
                      <div className="flex justify-between">
                        <span>{t('orderDetails.fields.codFee')}:</span>
                        <span>${orderToDispatch.codFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">{t('orderDetails.fields.total')}:</span>
                      <span className="font-semibold text-lg">${orderToDispatch.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">{t('orderDetails.sections.shippingInfo')}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">{t('orderDetails.fields.shippingAddress')}:</span>
                      <p className="text-gray-600 mt-1">{orderToDispatch.shippingAddress}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t('orderDetails.fields.billingAddress')}:</span>
                      <p className="text-gray-600 mt-1">{orderToDispatch.billingAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispatch Section - Only show if order is pending */}
              {orderToDispatch.status === 'pending' && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-900">{t('orderDetails.dispatchSection.title')}</h5>
                      <p className="text-sm text-yellow-700 mt-1">
                        {t('orderDetails.dispatchSection.description')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivered Section - Only show if order is delivered */}
              {orderToDispatch.status === 'delivered' && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-900">{t('orderDetails.deliveredSection.title')}</h5>
                      <p className="text-sm text-green-700 mt-1">
                        {t('orderDetails.deliveredSection.description')}
                      </p>
                      {orderToDispatch.deliveredAt && (
                        <p className="text-xs text-green-600 mt-2">
                          {t('orderDetails.deliveredSection.deliveredOn')}: {new Date(orderToDispatch.deliveredAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDispatchDialogOpen(false)} className="w-full sm:w-auto">
              {t('orderDetails.buttons.close')}
            </Button>
            {orderToDispatch?.status === 'pending' && (
              <Button 
                variant="default" 
                onClick={confirmDispatchOrder} 
                disabled={isDispatching}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                {isDispatching ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('orderDetails.buttons.dispatching')}
                  </>
                ) : (
                  <>
                    <Truck className="w-4 h-4 mr-2" />
                    {t('orderDetails.buttons.dispatchOrder')}
                  </>
                )}
              </Button>
            )}
            {orderToDispatch?.status === 'dispatched' && (
              <Button 
                variant="default" 
                onClick={() => markOrderAsDelivered(orderToDispatch.id)} 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('orderDetails.buttons.markAsDelivered')}
              </Button>
            )}
            {orderToDispatch?.status === 'delivered' && (
              <Button 
                variant="default" 
                onClick={() => {
                  setOrderToDispatch(orderToDispatch);
                  setIsDispatchDialogOpen(true);
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                title={t('orders.actions.viewDetails')}
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('orderDetails.buttons.viewDetails')}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
