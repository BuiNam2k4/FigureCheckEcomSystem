import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { myOrders } from '../../data/mockData';

const OrdersPage = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'completed': return 'bg-green-500 hover:bg-green-600';
            case 'shipping': return 'bg-blue-500 hover:bg-blue-600';
            case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'cancelled': return 'bg-red-500 hover:bg-red-600';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'completed': return <CheckCircle className="h-4 w-4 mr-1" />;
            case 'shipping': return <Truck className="h-4 w-4 mr-1" />;
            case 'pending': return <Clock className="h-4 w-4 mr-1" />;
            case 'cancelled': return <XCircle className="h-4 w-4 mr-1" />;
            default: return <Package className="h-4 w-4 mr-1" />;
        }
    };

    const filteredOrders = activeTab === "all" 
        ? myOrders 
        : myOrders.filter(order => order.status.toLowerCase() === activeTab.toLowerCase());

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="overflow-x-auto pb-2">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value={activeTab} className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                            <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p>No orders found in this category.</p>
                        </div>
                    ) : (
                        filteredOrders.map(order => (
                            <div key={order.id} className="border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-muted/30 px-6 py-4 flex flex-wrap gap-4 items-center justify-between border-b">
                                    <div className="flex gap-4 text-sm">
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Order Placed</span>
                                            <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Total</span>
                                            <span className="font-medium">${order.total.toFixed(2)}</span>
                                        </div>
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase tracking-wider">Order #</span>
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                         <Badge className={`${getStatusColor(order.status)} border-0`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </Badge>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="h-16 w-16 bg-muted rounded overflow-hidden flex-shrink-0 border">
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right font-medium">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </TabsContent>
            </Tabs>

            {/* Order Detail Dialog */}
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DialogContent className="max-w-md md:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Order Details <span className="text-muted-foreground ml-2">#{selectedOrder?.id}</span></DialogTitle>
                        <DialogDescription>
                            Placed on {selectedOrder && new Date(selectedOrder.date).toLocaleDateString()}
                        </DialogDescription>
                    </DialogHeader>
                    
                    {selectedOrder && (
                        <div className="space-y-6">
                             {/* Items List (Simplified for modal) */}
                             <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2">
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                             <div className="h-10 w-10 bg-muted rounded overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt="" className="h-full w-full object-cover" />
                                             </div>
                                            <div>
                                                <p className="font-medium line-clamp-1 w-40 md:w-60">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                                            </div>
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="font-semibold mb-1">Shipping Address</h4>
                                    <p className="text-muted-foreground">{selectedOrder.shippingAddress}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Payment Method</h4>
                                    <p className="text-muted-foreground">{selectedOrder.paymentMethod}</p>
                                </div>
                            </div>

                            <div className="bg-muted/40 p-4 rounded-lg space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${(selectedOrder.total - 5).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>$5.00</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
                        <Button>Download Invoice</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OrdersPage;
