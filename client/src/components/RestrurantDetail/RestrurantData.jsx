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
  }, [id]);

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
          <div className="mx-auto max-w-6xl">
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
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Info Cards */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span>{restaurantData.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Open: 9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span>{restaurantData.phone || "Contact number not available"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">
                        {restaurantData.rating || "4.5"} / 5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
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
            </div>
          </div>

          {/* Menu Section */}
          <div className="md:col-span-2">
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

export default RestaurantData;