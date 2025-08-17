import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import backend from '~backend/client';

export function UserProfile() {
  const { user, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await backend.auth.getProfile({
            authorization: `Bearer ${token}`
          });
          setUserProfile(response.user);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const profile = userProfile || user;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            User Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Name</span>
                <span className="text-sm text-gray-900">{profile?.name}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-sm text-gray-900">{profile?.email}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Role</span>
                <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                  {profile?.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                  {profile?.role}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Email Verified</span>
                <Badge variant={profile?.emailVerified ? 'default' : 'destructive'}>
                  {profile?.emailVerified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Member Since</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-sm text-gray-900">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full">
                Update Profile
              </Button>
              
              {profile?.role === 'admin' && (
                <Button variant="outline" className="w-full">
                  Admin Panel
                </Button>
              )}
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={logout}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
