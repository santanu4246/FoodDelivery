import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { BeatLoader, ClipLoader } from "react-spinners";

const Myprofile = () => {
  const { useprofile, updateProfile } = UserAuth();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchUserDetails = async () => {
    try {
      const res = await useprofile();
      setUser(res.user);
      setFormData({
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone || "",
        address: res.user.address || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      await updateProfile(formData);
      setIsEditing(false);
      fetchUserDetails();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return (
      <div className="h-[50vh] w-full flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-400 to-red-500 p-6 text-white">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6">
              <User size={48} className="text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-red-100">
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem
              icon={<Mail className="text-gray-400" />}
              label="Email"
              value={user.email}
            />
            <ProfileItem
              icon={<Phone className="text-gray-400" />}
              label="Phone"
              value={user.phone || "Not provided"}
            />
            <ProfileItem
              icon={<MapPin className="text-gray-400" />}
              label="Address"
              value={user.address || "Not provided"}
            />
            <ProfileItem
              icon={<Calendar className="text-gray-400" />}
              label="Date Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
          onClick={handleClose} // Close form when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="w-8 mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default Myprofile;
