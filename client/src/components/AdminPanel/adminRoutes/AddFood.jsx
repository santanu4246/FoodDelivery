import React, { useState } from "react";
import { useMenu } from "../../../store/Menu";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Utensils, Loader2 } from "lucide-react";

function AddFood() {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addMenu } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addMenu(title);
      toast.success("Menu category added successfully!");
      setTitle("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add menu category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-white border-b border-gray-100 pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Utensils className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Add Menu Category</CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Create a new category for organizing your food items
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-lg font-semibold text-gray-700">
                  Category Name
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Appetizers, Main Course, Desserts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                />
                <p className="text-sm text-gray-500">
                  This will be used to group your food items in the menu
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="w-full h-12 text-base font-semibold bg-[#272E3F] hover:bg-gray-800 text-white shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Adding Category...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Add Menu Category
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-600 rounded-full mt-1">
                <Utensils className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Quick Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use clear, descriptive names for categories</li>
                  <li>• Common categories: Starters, Mains, Beverages, Desserts</li>
                  <li>• You can add food items to categories after creating them</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddFood;
