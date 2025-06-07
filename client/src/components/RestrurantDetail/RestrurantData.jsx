import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuthentication } from "../../store/Authentication";
import { MapPin, Navigation, Clock, Phone, Star, Share2, Award, Users, Heart } from "lucide-react";
import Menu from "./Menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProfessionalLoader from "@/Loder/ProfessionalLoader";

function RestaurantData() {
  const { id } = useParams();
  const { getRestrurantById, isLoading } = useAdminAuthentication();
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurantData.name,
          text: `Check out ${restaurantData.name} - ${restaurantData.cuisine?.join(', ')}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (isLoading) {
    return <ProfessionalLoader />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurantData.image}
            alt={restaurantData.name}
            className={`h-full w-full object-cover transition-all duration-700 ${
              imageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        
        {/* Floating Stats Cards */}
        <div className="absolute top-8 right-8 flex gap-3">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-800">
                {restaurantData.rating || "4.5"}
              </span>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-800">1.2k+</span>
            </CardContent>
          </Card>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-100 border-yellow-400/30">
                    Premium Partner
                  </Badge>
                </div>
                <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-lg">
                  {restaurantData.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {restaurantData.cuisine?.map((item, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm hover:bg-white/30 transition-colors"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>25-30 mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="max-w-xs truncate">{restaurantData.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                  onClick={() => window.open(restaurantData.geolocation, '_blank')}
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Enhanced Info Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Info Card */}
              <Card className="sticky top-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Restaurant Info</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <InfoItem 
                      icon={MapPin} 
                      text={restaurantData.location} 
                      iconClass="text-red-500"
                      label="Location"
                    />
                    <InfoItem 
                      icon={Clock} 
                      text="Open: 9:00 AM - 10:00 PM" 
                      iconClass="text-green-500"
                      label="Hours"
                    />
                    <InfoItem
                      icon={Phone}
                      text={restaurantData.phone || "Contact for reservations"}
                      iconClass="text-blue-500"
                      label="Contact"
                    />
                    <InfoItem
                      icon={Star}
                      text={`${restaurantData.rating || "4.5"} out of 5`}
                      iconClass="text-yellow-500"
                      label="Rating"
                    />
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>

          {/* Enhanced Menu Section */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Our Menu</h2>
                    <p className="text-orange-100">Discover our carefully crafted dishes</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Award className="h-8 w-8" />
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <Menu />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ icon: Icon, text, iconClass, label }) => (
  <div className="group">
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`p-2 rounded-full bg-gray-100 ${iconClass && 'text-white bg-gradient-to-br'} ${
        iconClass?.includes('red') ? 'from-red-400 to-red-600' :
        iconClass?.includes('green') ? 'from-green-400 to-green-600' :
        iconClass?.includes('blue') ? 'from-blue-400 to-blue-600' :
        iconClass?.includes('yellow') ? 'from-yellow-400 to-yellow-600' : ''
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800 break-words">{text}</p>
      </div>
    </div>
  </div>
);

export default RestaurantData;