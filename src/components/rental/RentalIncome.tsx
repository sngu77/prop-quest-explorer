
import { TrendingUp, DollarSign, Calendar, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockIncomeData = [
  {
    id: 1,
    property: 'Modern Downtown Apartment',
    tenant: 'John Smith',
    amount: 2800,
    dueDate: '2024-01-01',
    paidDate: '2024-01-01',
    status: 'paid'
  },
  {
    id: 2,
    property: 'Luxury Condo',
    tenant: 'Sarah Johnson',
    amount: 4200,
    dueDate: '2024-01-01',
    paidDate: '2024-01-03',
    status: 'paid'
  },
  {
    id: 3,
    property: 'Suburban Family Home',
    tenant: 'Michael Chen',
    amount: 3500,
    dueDate: '2024-01-01',
    paidDate: null,
    status: 'overdue'
  }
];

const monthlyStats = {
  totalIncome: 24600,
  paidIncome: 21400,
  pendingIncome: 3200,
  occupancyRate: 83
};

const RentalIncome = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Income Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyStats.totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${monthlyStats.paidIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">87% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${monthlyStats.pendingIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">13% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">8 of 12 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Income Details */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Income Details</CardTitle>
          <CardDescription>
            Monthly rental payments and collection status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIncomeData.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.property}</TableCell>
                  <TableCell>{income.tenant}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    ${income.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(income.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {income.paidDate 
                      ? new Date(income.paidDate).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(income.status)}>
                      {income.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalIncome;
