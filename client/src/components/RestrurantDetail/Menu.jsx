import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMenu } from "../../store/Menu";
import { UserAuth } from "../../store/UserAuth";
import { toast } from "react-toastify";
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
  Leaf,
  Search,
  Coffee,
  ShoppingCart,
  Loader2,
  SlidersHorizontal,
  ChevronUp,
  Flame,
  Clock,
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
  const { addToCart, isAdtocart } = UserAuth();

  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id, getMenuWithFoodList]);

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item);
      toast.success("Added to your order", {
        position: "bottom-right",
        className: "bg-green-50 text-green-800",
      });
    } catch (error) {
      toast.error("Unable to add item");
    }
  };

  const filterAndSortItems = (items) => {
    let filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeTab === "veg") {
      filteredItems = filteredItems.filter((item) => item.veg);
    } else if (activeTab === "nonveg") {
      filteredItems = filteredItems.filter((item) => !item.veg);
    }

    switch (sortBy) {
      case "price-low":
        return filteredItems.sort((a, b) => a.price - b.price);
      case "price-high":
        return filteredItems.sort((a, b) => b.price - a.price);
      case "popular":
        return filteredItems.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
      default:
        return filteredItems;
    }
  };

  const MenuCategory = ({ item, index }) => (
    <div
      onClick={() => setActiveMenu(index)}
      className={`group cursor-pointer rounded-lg border transition-all duration-200 ease-in-out ${
        activeMenu === index
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-transparent hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Coffee
            className={`h-5 w-5 ${
              activeMenu === index ? "text-primary" : "text-gray-500"
            }`}
          />
          <div className="flex-1">
            <p
              className={`font-medium ${
                activeMenu === index ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.title}
            </p>
            <p className="text-sm text-gray-500">
              {item.foods.length} items available
            </p>
          </div>
          {activeMenu === index && (
            <ChevronUp className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
    </div>
  );

  const FoodCard = ({ item, isVeg }) => (
    <Card
      className={`group relative mb-4 overflow-hidden transition-all duration-200 hover:shadow-md ${
        isVeg ? "hover:border-green-200" : "hover:border-red-200"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={item.image || "/api/placeholder/96/96"}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
            />
            {item.bestseller && (
              <Badge variant="secondary" className="absolute left-1 top-1">
                <Flame className="mr-1 h-3 w-3 text-orange-500" />
                Popular
              </Badge>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <Badge
                    variant={isVeg ? "success" : "destructive"}
                    className="h-5 w-5"
                  >
                    <Leaf className="h-3 w-3" />
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{item.price}
                </p>
                <p className="text-sm text-gray-500">
                  {item.preparation_time || "15-20"} mins
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.spicy && (
                  <Badge variant="outline" className="text-orange-500">
                    <Flame className="mr-1 h-3 w-3" />
                    Spicy
                  </Badge>
                )}
                {item.preparation_time && (
                  <Badge variant="outline" className="text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    {item.preparation_time}
                  </Badge>
                )}
              </div>
              <Button
                disabled={isAdtocart}
                onClick={() => handleAddToCart(item)}
                variant={isVeg ? "success" : "destructive"}
                className="h-9 px-4"
              >
                {isAdtocart ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Order
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Menu Categories */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Menu Categories</CardTitle>
          <CardDescription>Browse our delicious options</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[70vh]">
            <div className="space-y-2">
              {MenuWithFoodList.map((item, index) => (
                <MenuCategory key={index} item={item} index={index} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Food Items */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{MenuWithFoodList[activeMenu]?.title}</CardTitle>
              <CardDescription>
                {MenuWithFoodList[activeMenu]?.foods.length} items available
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="veg" className="text-green-700">
                  Veg
                </TabsTrigger>
                <TabsTrigger value="nonveg" className="text-red-700">
                  Non-Veg
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("recommended")}>
                  Recommended
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  Most Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {MenuWithFoodList.length > 0 && (
            <ScrollArea className="h-[65vh]">
              <div className="space-y-4">
                {filterAndSortItems(MenuWithFoodList[activeMenu].foods).map(
                  (item, index) => (
                    <FoodCard key={index} item={item} isVeg={item.veg} />
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