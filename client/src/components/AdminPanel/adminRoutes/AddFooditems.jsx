import { useState, useEffect } from "react";
import { useMenu } from "../../../store/Menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Utensils } from "lucide-react";
import { IndianRupee } from 'lucide-react';
function AddFoodItems() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [starterType, setStarterType] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { getmenulist, menuDropDownList, addFoodToDatabase } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restuid = localStorage.getItem("restrurantID");
    await addFoodToDatabase({
      foodName,
      foodPrice,
      starterType,
      isVegetarian,
      restuid
    });
    setFoodName("");
    setFoodPrice("");
    setIsVegetarian(false);
  };

  useEffect(() => {
    getmenulist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-gray-600" />
            <CardTitle className="text-2xl font-bold">Add Food Item</CardTitle>
          </div>
          <CardDescription>
            Add a new dish to your restaurant's menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                placeholder="Enter the name of the dish"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodPrice">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <Input
                  id="foodPrice"
                  type="number"
                  placeholder="0.00"
                  value={foodPrice}
                  onChange={(e) => setFoodPrice(e.target.value)}
                  required
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="menuType">Menu Category</Label>
              <Select value={starterType} onValueChange={setStarterType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {menuDropDownList.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isVegetarian" className="font-medium">
                Vegetarian Option
              </Label>
              <Switch
                id="isVegetarian"
                checked={isVegetarian}
                onCheckedChange={setIsVegetarian}
              />
            </div>

            <Button type="submit" className="w-full">
              Add to Menu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddFoodItems;