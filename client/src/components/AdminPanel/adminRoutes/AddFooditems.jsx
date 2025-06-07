import { useState, useEffect } from "react";
import { useMenu } from "../../../store/Menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Utensils, Upload, X, ImageIcon, Loader2 } from "lucide-react";


function AddFoodItems() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [starterType, setStarterType] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getmenulist, menuDropDownList, addFoodToDatabase } = useMenu();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const restuid = localStorage.getItem("restrurantID");
      const formData = new FormData();
      formData.append("foodName", foodName);
      formData.append("foodPrice", foodPrice);
      formData.append("starterType", starterType);
      formData.append("isVegetarian", isVegetarian);
      formData.append("restuid", restuid);
      if (foodDescription) {
        formData.append("description", foodDescription);
      }
      if (image) {
        formData.append("image", image);
      }

      await addFoodToDatabase(formData);
      
      // Reset form
      setFoodName("");
      setFoodPrice("");
      setFoodDescription("");
      setStarterType("");
      setIsVegetarian(false);
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding food:", error);
      // Error is already handled in the store function with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getmenulist();
  }, []);

  return (
    <div className="bg-gray-50 p-3">
      <div className="w-full max-w-xl mx-auto">
        <Card className="shadow-lg border">
          <CardHeader className="bg-white border-b py-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-gray-100 rounded-full">
                <Utensils className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">Add Food Item</CardTitle>
                <CardDescription className="text-gray-600">
                  Create a new dish for your menu
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label className="text-base font-semibold text-gray-700">Food Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Food preview"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <Label
                          htmlFor="image"
                          className="cursor-pointer inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Label>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="foodName" className="text-base font-semibold text-gray-700">
                    Food Name *
                  </Label>
                  <Input
                    id="foodName"
                    placeholder="Butter Chicken"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                    className="h-9 text-base border-2 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="foodPrice" className="text-base font-semibold text-gray-700">
                    Price *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-2.5 text-gray-500 text-base">₹</span>
                    <Input
                      id="foodPrice"
                      type="number"
                      placeholder="299"
                      value={foodPrice}
                      onChange={(e) => setFoodPrice(e.target.value)}
                      required
                      className="pl-6 h-9 text-base border-2 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="foodDescription" className="text-base font-semibold text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="foodDescription"
                  placeholder="Describe your dish..."
                  value={foodDescription}
                  onChange={(e) => setFoodDescription(e.target.value)}
                  className="min-h-[60px] border-2 focus:border-blue-500 resize-none text-base"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="menuType" className="text-base font-semibold text-gray-700">
                  Menu Category *
                </Label>
                <Select value={starterType} onValueChange={setStarterType} required>
                  <SelectTrigger className="h-9 border-2 focus:border-blue-500 text-base">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuDropDownList.map((item) => (
                      <SelectItem key={item._id} value={item._id} className="text-base">
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <Label htmlFor="isVegetarian" className="text-base font-semibold text-gray-700">
                    Vegetarian
                  </Label>
                  <p className="text-sm text-gray-500">Mark as veg-friendly</p>
                </div>
                <Switch
                  id="isVegetarian"
                  checked={isVegetarian}
                  onCheckedChange={setIsVegetarian}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-10 text-base font-semibold bg-[#272E3F]  text-white shadow-lg transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Utensils className="h-4 w-4 mr-2" />
                    Add to Menu
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddFoodItems;