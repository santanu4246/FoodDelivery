import React, { useState, useEffect } from "react";
import { useAdminAuthentication } from "../../../store/Authentication.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, MapPin, Phone, Clock, Globe, Loader2, Save } from "lucide-react";

function RestrurantDetail() {
  const { admin, updateRestrurantDetails } = useAdminAuthentication();
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin?.restrurant) {
      setRestaurantName(admin.restrurant.name || "");
      setLocation(admin.restrurant.location || "");
      setPhone(admin.restrurant.phone || "");
      setDescription(admin.restrurant.description || "");
      setWebsite(admin.restrurant.website || "");
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", restaurantName);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("website", website);

      await updateRestrurantDetails(formData);
    } catch (error) {
      console.error("Error updating restaurant details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-white border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Restaurant Details</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Manage your restaurant information and contact details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Store className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName" className="text-base font-semibold text-gray-700">
                      Restaurant Name
                    </Label>
                    <Input
                      id="restaurantName"
                      type="text"
                      placeholder="Enter restaurant name"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      required
                      className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold text-gray-700 flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-semibold text-gray-700 flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Location Address</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter full address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-semibold text-gray-700 flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>Website (Optional)</span>
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourrestaurant.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-11 text-base border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4 border-t border-gray-100 pt-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Restaurant Description</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold text-gray-700">
                    About Your Restaurant
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your restaurant, cuisine, ambiance, and what makes it special..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] text-base border-2 focus:border-blue-500 resize-none transition-colors"
                    rows={5}
                  />
                  <p className="text-sm text-gray-500">
                    This description will be visible to customers browsing your restaurant
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto h-12 px-8 text-base font-semibold bg-[#272E3F] hover:bg-gray-800 text-white shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Updating Details...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Save Restaurant Details
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-600 rounded-full mt-1">
                  <Store className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Profile Visibility</h3>
                  <p className="text-sm text-green-800">
                    Your restaurant details are visible to customers browsing the platform. Keep information up-to-date.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-600 rounded-full mt-1">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Location Services</h3>
                  <p className="text-sm text-blue-800">
                    Accurate location helps customers find you easily and improves delivery accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RestrurantDetail;