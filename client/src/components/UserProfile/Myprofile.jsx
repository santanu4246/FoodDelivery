import React, { useEffect, useState } from "react";
import { UserAuth } from "../../store/UserAuth";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { BeatLoader } from "react-spinners";
const Myprofile = () => {
  const { useprofile } = UserAuth();
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const res = await useprofile();
      setUser(res.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user) {
    return (
      <div className="h-[50vh] w-full flex items-center justify-center">
        <BeatLoader color="red" size={10} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Changed gradient background to red */}
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
