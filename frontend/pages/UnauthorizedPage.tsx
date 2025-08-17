import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this page. This area is restricted to administrators only.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/dashboard">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
