
import { Check, X, Eye, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const mockApplications = [
  {
    id: 1,
    applicantName: 'Emily Davis',
    email: 'emily@example.com',
    phone: '(555) 123-4567',
    property: 'Modern Downtown Apartment',
    appliedDate: '2024-01-15',
    status: 'pending',
    income: 85000,
    creditScore: 750
  },
  {
    id: 2,
    applicantName: 'Michael Chen',
    email: 'michael@example.com',
    phone: '(555) 987-6543',
    property: 'Suburban Family Home',
    appliedDate: '2024-01-14',
    status: 'approved',
    income: 120000,
    creditScore: 780
  },
  {
    id: 3,
    applicantName: 'Lisa Rodriguez',
    email: 'lisa@example.com',
    phone: '(555) 456-7890',
    property: 'Luxury Condo',
    appliedDate: '2024-01-12',
    status: 'rejected',
    income: 65000,
    creditScore: 680
  }
];

const RentalApplications = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rental Applications</CardTitle>
          <CardDescription>
            Review and manage tenant applications for your properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Credit Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.applicantName}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{application.email}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{application.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.property}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>${application.income.toLocaleString()}</TableCell>
                  <TableCell>{application.creditScore}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {application.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
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

export default RentalApplications;
