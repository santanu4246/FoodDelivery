import React, { useEffect, useState } from "react";
import { useMenu } from "../../../store/Menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Search, 
  Trash2, 
  Loader2, 
  UtensilsCrossed, 
  Save,
  X,
  Leaf,
  Flame
} from "lucide-react";

function EditFood() {
  const { MenuWithFoodList, getMenuWithFoodList, editFood, deleteFood } = useMenu();
  const [selectedFood, setSelectedFood] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    description: "",
    veg: false
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const restuid = localStorage.getItem("restrurantID");
    if (restuid) {
      getMenuWithFoodList(restuid);
    }
  }, []);

  const allFoodItems = MenuWithFoodList.flatMap(menu => 
    menu.foods.map(food => ({ ...food, menuTitle: menu.title }))
  );

  const filteredFoodItems = allFoodItems.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.menuTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (food) => {
    setSelectedFood(food);
    setEditData({
      name: food.name,
      price: food.price,
      description: food.description || "",
      veg: food.veg
    });
  };

  const handleSaveEdit = async () => {
    if (!selectedFood) return;
    
    setIsEditing(true);
    try {
      await editFood(selectedFood._id, editData);
      setSelectedFood(null);
      // Refresh the food list
      const restuid = localStorage.getItem("restrurantID");
      if (restuid) {
        getMenuWithFoodList(restuid);
      }
    } catch (error) {
      console.error("Error editing food:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteFood = async (foodId) => {
    setIsDeleting(true);
    try {
      await deleteFood(foodId);
      // Refresh the food list
      const restuid = localStorage.getItem("restrurantID");
      if (restuid) {
        getMenuWithFoodList(restuid);
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const FoodItemCard = ({ food }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border hover:border-blue-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
              <div className={`p-1 rounded-full ${food.veg ? 'bg-green-500' : 'bg-red-500'}`}>
                <Leaf className="h-3 w-3 text-white" />
              </div>
              {food.veg && (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                  Pure Veg
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">{food.description || "No description available"}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-blue-600">₹{food.price}</span>
                <Badge variant="outline" className="text-gray-600">{food.menuTitle}</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Button
              onClick={() => handleEditClick(food)}
              size="sm"
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteFood(food._id)}
              size="sm"
              variant="outline"
              disabled={isDeleting}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <Card className="shadow-lg border-0 bg-white mb-6">
          <CardHeader className="bg-white border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Edit Food Items</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Manage and update your menu items
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search food items or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 text-base border-2 focus:border-blue-500 transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Food Items List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-blue-600" />
                    Food Items ({filteredFoodItems.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {filteredFoodItems.length > 0 ? (
                    filteredFoodItems.map((food) => (
                      <FoodItemCard key={food._id} food={food} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No food items found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white sticky top-6">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                  {selectedFood ? "Edit Item" : "Select an Item"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedFood ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="editName" className="text-base font-semibold text-gray-700">
                        Food Name
                      </Label>
                      <Input
                        id="editName"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="h-10 border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editPrice" className="text-base font-semibold text-gray-700">
                        Price (₹)
                      </Label>
                      <Input
                        id="editPrice"
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        className="h-10 border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="editDescription" className="text-base font-semibold text-gray-700">
                        Description
                      </Label>
                      <textarea
                        id="editDescription"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full h-20 px-3 py-2 border-2 border-gray-200 rounded-md focus:border-blue-500 transition-colors resize-none"
                        placeholder="Enter description..."
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="editVeg" className="text-base font-semibold text-gray-700">
                          Vegetarian
                        </Label>
                        <p className="text-sm text-gray-500">Mark as vegetarian dish</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          id="editVeg"
                          type="checkbox"
                          checked={editData.veg}
                          onChange={(e) => setEditData({ ...editData, veg: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <Button
                        onClick={handleSaveEdit}
                        disabled={isEditing}
                        className="flex-1 bg-[#272E3F] hover:bg-gray-800 text-white"
                      >
                        {isEditing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setSelectedFood(null)}
                        variant="outline"
                        className="border-gray-300"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Edit3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Select a food item to edit</p>
                    <p className="text-sm text-gray-400">Click the edit button on any food item to start editing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFood;
