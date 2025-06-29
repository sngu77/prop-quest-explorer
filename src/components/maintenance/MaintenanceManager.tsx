import { useState } from 'react';
import { Plus, Wrench, Clock, CheckCircle, AlertTriangle, Calendar, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface MaintenanceRequest {
  id: string;
  property: string;
  tenant: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  category: string;
  createdDate: string;
  scheduledDate?: string;
  completedDate?: string;
  assignedTo?: string;
  cost?: number;
  photos?: string[];
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    property: 'Modern Downtown Apartment',
    tenant: 'John Smith',
    title: 'Kitchen Faucet Leak',
    description: 'The kitchen faucet has been dripping constantly for the past week.',
    priority: 'medium',
    status: 'in-progress',
    category: 'Plumbing',
    createdDate: '2024-01-25',
    scheduledDate: '2024-01-30',
    assignedTo: 'Mike\'s Plumbing Service'
  },
  {
    id: '2',
    property: 'Luxury Condo',
    tenant: 'Sarah Johnson',
    title: 'Air Conditioning Not Working',
    description: 'AC unit stopped working yesterday. No cold air coming out.',
    priority: 'high',
    status: 'pending',
    category: 'HVAC',
    createdDate: '2024-01-28'
  },
  {
    id: '3',
    property: 'Suburban Family Home',
    tenant: 'Michael Chen',
    title: 'Broken Window Lock',
    description: 'Window lock in the bedroom is broken and won\'t secure properly.',
    priority: 'low',
    status: 'completed',
    category: 'Security',
    createdDate: '2024-01-20',
    completedDate: '2024-01-24',
    cost: 85
  }
];

const MaintenanceManager = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const [newRequest, setNewRequest] = useState({
    property: '',
    tenant: '',
    title: '',
    description: '',
    priority: 'medium' as const,
    category: '',
    scheduledDate: ''
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = filterStatus === 'all' || request.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || request.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const handleAddRequest = () => {
    const request: MaintenanceRequest = {
      id: Date.now().toString(),
      ...newRequest,
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => [request, ...prev]);
    setNewRequest({
      property: '',
      tenant: '',
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      scheduledDate: ''
    });
    setIsAddRequestOpen(false);

    toast({
      title: "Maintenance Request Added",
      description: "New maintenance request has been created successfully."
    });
  };

  const updateRequestStatus = (id: string, status: MaintenanceRequest['status']) => {
    setRequests(prev => prev.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status,
            completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : undefined
          }
        : request
    ));

    toast({
      title: "Status Updated",
      description: `Maintenance request status updated to ${status}.`
    });
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setIsAddRequestOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(request.status)}
                        <span>{request.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {request.property}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {request.tenant}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Created: {new Date(request.createdDate).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{request.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {request.category}</span>
                      {request.assignedTo && <span>Assigned to: {request.assignedTo}</span>}
                      {request.cost && <span>Cost: ${request.cost}</span>}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View Details
                      </Button>
                      
                      {request.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'in-progress')}
                        >
                          Start Work
                        </Button>
                      )}
                      
                      {request.status === 'in-progress' && (
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'completed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Request Dialog */}
      <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Maintenance Request</DialogTitle>
            <DialogDescription>
              Create a new maintenance request for your property.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="property">Property</Label>
                <Select value={newRequest.property} onValueChange={(value) => setNewRequest(prev => ({ ...prev, property: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Modern Downtown Apartment">Modern Downtown Apartment</SelectItem>
                    <SelectItem value="Luxury Condo">Luxury Condo</SelectItem>
                    <SelectItem value="Suburban Family Home">Suburban Family Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tenant">Tenant</Label>
                <Input
                  value={newRequest.tenant}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, tenant: e.target.value }))}
                  placeholder="Tenant name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="title">Issue Title</Label>
              <Input
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the maintenance issue"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newRequest.priority} onValueChange={(value: any) => setNewRequest(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newRequest.category} onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Appliances">Appliances</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                <Input
                  type="date"
                  value={newRequest.scheduledDate}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, scheduledDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddRequestOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRequest}>
                Add Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedRequest.title}</DialogTitle>
              <DialogDescription>
                Maintenance request details and history
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.property}</p>
                </div>
                <div>
                  <Label>Tenant</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.tenant}</p>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedRequest.priority)}>
                    {selectedRequest.priority}
                  </Badge>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Created Date</Label>
                  <p className="text-sm text-gray-600">{new Date(selectedRequest.createdDate).toLocaleDateString()}</p>
                </div>
                {selectedRequest.completedDate && (
                  <div>
                    <Label>Completed Date</Label>
                    <p className="text-sm text-gray-600">{new Date(selectedRequest.completedDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {selectedRequest.assignedTo && (
                <div>
                  <Label>Assigned To</Label>
                  <p className="text-sm text-gray-600">{selectedRequest.assignedTo}</p>
                </div>
              )}

              {selectedRequest.cost && (
                <div>
                  <Label>Cost</Label>
                  <p className="text-sm text-gray-600">${selectedRequest.cost}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MaintenanceManager;