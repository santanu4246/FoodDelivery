import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMenu } from "../../store/Menu";
import { UserAuth } from "../../store/UserAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Coffee,
  ShoppingCart,
  Loader2,
  SlidersHorizontal,
  ChevronUp,
  Flame,
  Clock,
  Leaf,
  ImageIcon,
  Sparkles,
  Star,
  Plus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Menu = () => {
  const { id } = useParams();
  const [activeMenu, setActiveMenu] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeTab, setActiveTab] = useState("all");
  const { MenuWithFoodList, getMenuWithFoodList } = useMenu();
  const { addToCart, isAddToCart } = UserAuth();

  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id, getMenuWithFoodList]);

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item);
    } catch (error) {
      console.error("Unable to add item:", error);
    }
  };

  const filterAndSortItems = (items) => {
    let filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab !== "all") {
      filteredItems = filteredItems.filter((item) => 
        activeTab === "veg" ? item.veg : !item.veg
      );
    }

    const sortFunctions = {
      "price-low": (a, b) => a.price - b.price,
      "price-high": (b, a) => a.price - b.price,
      "popular": (a, b) => (b.popularity || 0) - (a.popularity || 0),
      "recommended": () => 0,
    };

    return filteredItems.sort(sortFunctions[sortBy] || sortFunctions.recommended);
  };

  const MenuCategory = ({ item, index }) => (
    <div
      onClick={() => setActiveMenu(index)}
      className={`group cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ease-in-out hover:scale-[1.02] ${
        activeMenu === index
          ? "border-orange-400 bg-gradient-to-br from-orange-50 via-orange-50 to-red-50 shadow-xl shadow-orange-200/50"
          : "border-gray-200 hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-50/50 hover:to-red-50/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          activeMenu === index 
            ? "bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-300/50" 
            : "bg-gray-50 text-gray-500 group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-red-100 group-hover:text-orange-600"
        }`}>
          <Coffee className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className={`font-bold text-base transition-colors ${
            activeMenu === index ? "text-orange-700" : "text-gray-800 group-hover:text-orange-600"
          }`}>
            {item.title}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <span>{item.foods.length} dishes</span>
            {activeMenu === index && <Sparkles className="h-3 w-3 text-orange-500" />}
          </p>
        </div>
      </div>
    </div>
  );

  const FoodCard = ({ item }) => {
    const isVeg = item.veg;
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    
    const getDefaultImage = () => {
      return isVeg 
        ? "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center"
        : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center";
    };

    return (
      <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 bg-white ${
        isVeg ? "hover:shadow-green-200/30 hover:border-green-300" : "hover:shadow-red-200/30 hover:border-red-300"
      }`}>
        <CardContent className="p-0">
          <div className="flex h-56">
            {/* Food Image Section */}
            <div className="relative w-56 overflow-hidden">
              {!imageError && item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <img
                  src={getDefaultImage()}
                  alt={item.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Veg/Non-veg Indicator */}
              <div className="absolute top-3 left-3">
                <div className={`p-1.5 rounded-full border-2 shadow-md ${
                  isVeg 
                    ? "bg-green-500 border-green-600" 
                    : "bg-red-500 border-red-600"
                }`}>
                  <Leaf className="h-3 w-3 text-white" />
                </div>
              </div>
              
              {/* Popular/Bestseller Badge */}
              {item.bestseller && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 px-3 py-1.5 shadow-lg">
                    <Flame className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold text-gray-900 capitalize mb-2 transition-colors line-clamp-1 ${
                      isVeg ? "group-hover:text-green-600" : "group-hover:text-red-600"
                    }`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{item.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.spicy && (
                          <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50 px-2 py-0.5 text-xs">
                            <Flame className="mr-1 h-3 w-3" />
                            Spicy
                          </Badge>
                        )}
                        {isVeg && (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-2 py-0.5 text-xs">
                            Pure Veg
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`text-xl font-bold mb-1 ${
                      isVeg ? "text-green-600" : "text-red-600"
                    }`}>
                      ₹{item.price}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.preparation_time || "15-20"} mins
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {item.description || `Delicious ${isVeg ? 'vegetarian' : 'non-vegetarian'} dish prepared with finest ingredients and authentic spices.`}
                </p>
              </div>

              <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                <Button
                  disabled={isAddToCart}
                  onClick={() => handleAddToCart(item)}
                  className={`h-11 px-6 font-semibold transition-all duration-300 hover:scale-105 text-white shadow-lg ${
                    isVeg 
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-200/50 hover:shadow-green-300/50" 
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200/50 hover:shadow-red-300/50"
                  }`}
                >
                  {isAddToCart ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Enhanced Menu Categories */}
      <Card className="lg:col-span-1 border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg p-6">
          <CardTitle className="text-lg flex items-center gap-3 font-bold">
            <Coffee className="h-5 w-5" />
            Menu Categories
          </CardTitle>
          <CardDescription className="text-orange-100 text-sm">
            Explore our culinary offerings
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[65vh]">
            <div className="space-y-3">
              {MenuWithFoodList.map((item, index) => (
                <MenuCategory key={index} item={item} index={index} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Enhanced Menu Items */}
      <Card className="lg:col-span-3 border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-orange-500" />
                {MenuWithFoodList[activeMenu]?.title}
                <span className="text-base font-normal text-gray-500">
                  ({MenuWithFoodList[activeMenu]?.foods.length} items)
                </span>
              </CardTitle>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="veg" className="text-green-700 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  <Leaf className="h-4 w-4 mr-1" />
                  Veg
                </TabsTrigger>
                <TabsTrigger value="nonveg" className="text-red-700 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Non-Veg
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search delicious dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-2.5 border-2 border-gray-200 focus:border-orange-500 rounded-xl bg-white"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 px-5 border-2 hover:border-orange-500 hover:text-orange-600">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("recommended")}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Recommended
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  <Flame className="mr-2 h-4 w-4" />
                  Most Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {MenuWithFoodList.length > 0 && (
            <ScrollArea className="h-[65vh]">
              <div className="space-y-4">
                {filterAndSortItems(MenuWithFoodList[activeMenu].foods).map(
                  (item, index) => (
                    <FoodCard key={index} item={item} />
                  )
                )}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Menu;