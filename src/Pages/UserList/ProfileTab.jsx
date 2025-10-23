import React, { useState, useEffect } from "react";
import { useUpdateUserByIdMutation } from "../../redux/features/user/userApi";

const ProfileTab = ({ user, isEditMode, setIsEditMode }) => {
    console.log("user data------------->",user)
  const [formData, setFormData] = useState({
    firstName: "N/A",
    lastName: "N/A",
    email: "N/A",
    phone: "N/A",
    dob: "N/A",
    gender: "N/A",
    address: "N/A",
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserByIdMutation();

  const normalizeUserData = (user) => {
    if (!user) return {};
    const survey = user.survey || {};
    const shipping = user.shippingAddress || {};

    const firstName = survey.readerName
      ? survey.readerName.split(" ")[0]
      : user.firstName || "N/A";
    const lastName = survey.readerName
      ? survey.readerName.split(" ").slice(1).join(" ")
      : user.lastName || "N/A";
    const dob = survey.dateOfBirth
      ? survey.dateOfBirth.slice(0, 10)
      : user.dob
      ? user.dob.slice(0, 10)
      : "N/A";
    const gender = survey.gender || user.gender || "N/A";
    const address = shipping.street
      ? `${shipping.street}, ${shipping.city || ""}, ${shipping.state || ""}, ${shipping.country || ""}, ${shipping.zipCode || ""}`
      : user.address || "N/A";

    return {
      firstName,
      lastName,
      email: user.email || "N/A",
      phone: user.phone || "N/A",
      dob,
      gender,
      address,
    };
  };

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
      setFormData(normalizeUserData(user));
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateUser({ _id: user._id, ...formData }).unwrap();
      setIsEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save user data");
    }
  };

  const handleCancel = () => {
    if (user) setFormData(normalizeUserData(user));
    setIsEditMode(false);
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="items-center justify-between hidden mb-6 ">
        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone Number" },
          { key: "dob", label: "Date of Birth", type: "date" },
          { key: "gender", label: "Gender" },
          { key: "address", label: "Address", full: true },
        ].map(({ key, label, type, full }) => (
          <div key={key} className={full ? "md:col-span-2" : ""}>
            <label className="block mb-1 font-medium text-gray-700">{label}</label>
            <input
              type={type || "text"}
              value={formData[key]}
              onChange={handleChange(key)}
              disabled={!isEditMode}
              className={`w-full p-2 rounded border ${
                isEditMode ? "border-gray-300" : "bg-gray-100"
              }`}
            />
          </div>
        ))}
      </div>

      {isEditMode && (
        <div className="justify-end hidden gap-2 mt-6 ">
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
