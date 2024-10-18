import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { User, Mail, Phone, MapPin, Calendar, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MyProfile = () => {
  const { useprofile, updateProfile } = UserAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchUserDetails = async () => {
    try {
      const res = await useprofile();
      setUser(res.user);
      setFormData({
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone || "",
        address: res.user.address || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      await fetchUserDetails();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-t-lg p-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/10">
              <AvatarFallback className="bg-slate-700 text-white text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-slate-300 text-sm">
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
              <Button
                onClick={() => setIsEditing(true)}
                variant="secondary"
                className="mt-4"
                size="sm"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileItem
              icon={<Mail className="text-slate-600" />}
              label="Email Address"
              value={user.email}
            />
            <ProfileItem
              icon={<Phone className="text-slate-600" />}
              label="Phone Number"
              value={user.phone || "Not provided"}
            />
            <ProfileItem
              icon={<MapPin className="text-slate-600" />}
              label="Address"
              value={user.address || "Not provided"}
            />
            <ProfileItem
              icon={<Calendar className="text-slate-600" />}
              label="Date Joined"
              value={new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
    <div className="p-2 rounded-full bg-slate-100">{icon}</div>
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-slate-900">{value}</p>
    </div>
  </div>
);

export default MyProfile;