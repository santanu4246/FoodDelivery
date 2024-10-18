import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";
import { MapPin, Navigation, Clock, Phone, Star, Share2 } from "lucide-react";
import Menu from "./Menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

function RestaurantData() {
  const { id } = useParams();
  const { getRestrurantById, isLoading } = useAdminAuthentication();
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRestaurant() {
      try {
        const res = await getRestrurantById(id);
        setRestaurantData(res);
      } catch (error) {
        setError("Failed to load restaurant data");
        console.error(error);
      }
    }
    if (id) getRestaurant();
  }, [id, getRestrurantById]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">
          <img
            src={restaurantData.image}
            alt={restaurantData.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-2 text-5xl font-bold">{restaurantData.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              {restaurantData.cuisine?.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Info Cards */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Quick Info</h3>
                <div className="space-y-4">
                  <InfoItem icon={MapPin} text={restaurantData.location} />
                  <InfoItem icon={Clock} text="Open: 9:00 AM - 10:00 PM" />
                  <InfoItem
                    icon={Phone}
                    text={restaurantData.phone || "Contact number not available"}
                  />
                  <InfoItem
                    icon={Star}
                    text={`${restaurantData.rating || "4.5"} / 5`}
                    iconClass="text-yellow-400"
                  />
                </div>
                <div className="mt-6 flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => window.open(restaurantData.geolocation, '_blank')}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Menu Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-2xl font-bold">Menu</h2>
                <Menu />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon: Icon, text, iconClass }) => (
  <div className="flex items-center gap-3">
    <Icon className={`h-5 w-5 ${iconClass || 'text-gray-500'}`} />
    <span className="text-sm">{text}</span>
  </div>
);

export default RestaurantData;