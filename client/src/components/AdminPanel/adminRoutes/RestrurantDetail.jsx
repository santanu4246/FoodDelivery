import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAdminAuthentication } from "../../../store/Authentication";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Store, UtensilsCrossed, IndianRupee  } from "lucide-react";

const RestaurantDetail = () => {
  const { admin, updateRestrurant, isLoading } = useAdminAuthentication();
  const [image, setImage] = useState(null);
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: [],
    location: "",
    geolocation: "",
    perThali: 100
  });

  useEffect(() => {
    if (admin?.restrurant) {
      setRestaurant({
        name: admin.restrurant.name || "",
        cuisine: admin.restrurant.cuisine || [],
        location: admin.restrurant.location || "",
        geolocation: admin.restrurant.geolocation || "",
        perThali: admin.restrurant.perThali || 300
      });
    }
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;
    setRestaurant(prev => ({
      ...prev,
      cuisine: value.split(",").map(item => item.trim())
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(restaurant).forEach(([key, value]) => {
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        formData.append(key, value);
      }
    });
    
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateRestrurant(admin.restrurant._id, formData);
      toast.success("Restaurant details updated successfully");
    } catch (error) {
      toast.error("Failed to update restaurant details");
      console.error(error);
    }
  };

  const FormField = ({ label, icon, children }) => (
    <div className="mb-6">
      <Label className="flex items-center gap-2 text-sm font-medium mb-2">
        {icon}
        {label}
      </Label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Restaurant Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Restaurant Name" icon={<Store className="w-4 h-4" />}>
              <Input
                name="name"
                value={restaurant.name}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter restaurant name"
                required
              />
            </FormField>

            <FormField label="Cuisine Types" icon={<UtensilsCrossed className="w-4 h-4" />}>
              <Input
                name="cuisine"
                value={restaurant.cuisine.join(", ")}
                onChange={handleCuisineChange}
                className="w-full"
                placeholder="Enter cuisines (comma-separated)"
              />
            </FormField>

            <FormField label="Location" icon={<MapPin className="w-4 h-4" />}>
              <Input
                name="location"
                value={restaurant.location}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter location"
                required
              />
            </FormField>

            <FormField label="Geolocation Coordinates" icon={<MapPin className="w-4 h-4" />}>
              <Input
                name="geolocation"
                value={restaurant.geolocation}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter coordinates (lat, lng)"
              />
            </FormField>

            <FormField label="Restaurant Image" icon={<Camera className="w-4 h-4" />}>
              <Input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full"
                accept="image/*"
              />
            </FormField>

            <FormField label="Price per Thali" icon={<IndianRupee  className="w-4 h-4" />}>
              <Input
                type="number"
                name="perThali"
                value={restaurant.perThali}
                onChange={handleInputChange}
                className="w-full"
                min="0"
                placeholder="Enter price per thali"
              />
            </FormField>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                </div>
              ) : (
                "Update Restaurant"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetail;