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
  const { addToCart, isAddToCart } = UserAuth();

  useEffect(() => {
    if (id) getMenuWithFoodList(id);
  }, [id, getMenuWithFoodList]);

  const handleAddToCart = async (item) => {
    try {
      await addToCart(item);
    } catch (error) {
      toast.error("Unable to add item");
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
      className={`group cursor-pointer rounded-lg border p-4 transition-all duration-200 ease-in-out ${
        activeMenu === index
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-transparent hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
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
            {item.foods.length} items
          </p>
        </div>
        {activeMenu === index && (
          <ChevronUp className="h-4 w-4 text-primary" />
        )}
      </div>
    </div>
  );

  const FoodCard = ({ item }) => {
    const isVeg = item.veg;
    return (
      <Card className={`group relative mb-4 overflow-hidden transition-all duration-200 hover:shadow-md ${
        isVeg ? "hover:border-green-200" : "hover:border-red-200"
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">
                      {item.name}
                    </h3>
                    {/* <Badge
                      variant={isVeg ? "success" : "destructive"}
                      className="h-5 w-5"
                    >
                      <Leaf className="h-3 w-3" />
                    </Badge> */}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
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
                  {item.bestseller && (
                    <Badge variant="secondary">
                      <Flame className="mr-1 h-3 w-3 text-orange-500" />
                      Popular
                    </Badge>
                  )}
                </div>
                <Button
                  disabled={isAddToCart}
                  onClick={() => handleAddToCart(item)}
                  variant={isVeg ? "success" : "destructive"}
                  className="h-10 px-6"
                >
                  {isAddToCart ? (
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
  };

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <Card className="lg:col-span-1">
        <CardHeader className="bg-white text-black">
          <CardTitle className="text-xl ">Menu Categories</CardTitle>
          <CardDescription className="text-primary-foreground/80">Explore our culinary offerings</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[70vh]">
            <div className="space-y-3">
              {MenuWithFoodList.map((item, index) => (
                <MenuCategory key={index} item={item} index={index} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {MenuWithFoodList[activeMenu]?.title} <span className="text-lg font-normal text-gray-500">({MenuWithFoodList[activeMenu]?.foods.length} items)</span>
              </CardTitle>
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

          <div className="mt-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 text-lg"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-lg">
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
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

        <CardContent className="p-6">
          {MenuWithFoodList.length > 0 && (
            <ScrollArea className="h-[65vh]">
              <div className="space-y-6">
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