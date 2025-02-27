import React, { useState, useRef, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { AiFillInteraction } from "react-icons/ai";
import { FaClipboardList, FaEnvelope, FaTags, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFollowUp } from "../redux/view/viewThunk";

const FollowUpTab = ({ company_id }) => {
  const [followups, setFollowups] = useState([]);
  const [newFollowUp, setNewFollowUp] = useState({
    customerId: company_id,
    companyId: '',
    followupDescription: '',
    followupMethod: "call",
    followupStatus: "pending",
    followupCategory: "leads",
    followupTime: '',
    followupDate: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const followUpRef = useRef(null);
  const dispatch = useDispatch();
  const { followUps } = useSelector((state) => state.view);
console.log(followUps);

  useEffect(() => {
    setFollowups(followUps);
  }, [followUps]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFollowUp((newFollowUp) => ({
      ...newFollowUp,
      [name]: value,
    }));
  };

  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    dispatch(addFollowUp({ company_id, data: newFollowUp }));
    setFollowups((prevFollowups) => [...prevFollowups, newFollowUp]);
    setIsFormVisible(false);
    setNewFollowUp({
      customerId: company_id,
      companyId: '',
      followupDescription: '',
      followupTime: '',
      followupDate: ''
    })
  };

  const handleClockButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Image Section */}
      <div className="w-1/2 p-6 flex items-center justify-center">
        <img
          src="/images/adminlLeadFollowUp.jpg"
          alt="Follow-up Illustration"
          className="w-full h-auto"
        />
      </div>

      {/* Follow-Up Section */}
      <div className="w-1/2 bg-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-500 flex items-center">
            <LuCircleDollarSign className="text-orange-300 mr-2 text-5xl" />
            {/* {customerData?.companyName} */}
          </h2>
          <button
            onClick={handleClockButtonClick}
            className="text-blue-500 p-3 rounded-lg flex items-center justify-center"
          >
            <SlCalender className="mr-2 text-4xl" />
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden flex-grow flex flex-col-reverse mb-8 shadow-sm">
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            {followups.length > 0 ? (
              followups.map((followup) => (
                <div key={followup._id} className="flex items-center justify-between">
                  <div className="flex-grow bg-indigo-100 p-5 rounded-lg">
                    <p className="font-medium text-gray-800">{followup.followupDescription}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span>{new Date(followup?.followupDate).toLocaleDateString()}   </span>
                      <span>    {followup?.followupTime}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No notes available</div>
            )}
            <div ref={followUpRef}></div>
          </div>
        </div>

        {isFormVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <AiFillInteraction className="text-blue-500 mr-3 text-5xl" />
                Follow-Up Information
              </h3>
              <form className="space-y-4" onSubmit={handleAddFollowUp}>
                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaClipboardList className="mr-2 text-lg" />
                      Follow-Up Description
                    </label>
                    <input
                      name="followupDescription"
                      type="text"
                      className="p-3 border rounded-lg w-full"
                      placeholder="Enter description"
                      value={newFollowUp.followupDescription}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaEnvelope className="mr-2 text-lg" />
                      Follow-Up Method
                    </label>
                    <select
                      name="followupMethod"
                      className="p-3 border rounded-lg w-full"
                      value={newFollowUp.followupMethod}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Method</option>
                      <option value="email">Email</option>
                      <option value="call">Call</option>
                      <option value="chat">Chat</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaTags className="mr-2 text-lg" />
                      Follow-Up Category
                    </label>
                    <select
                      name="followupCategory"
                      className="p-3 border rounded-lg w-full"
                      value={newFollowUp.followupCategory}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Lead">Lead</option>
                      <option value="Sales">Sales</option>
                      <option value="Carrier">Carrier</option>
                      <option value="Account">Account</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaRegCalendarAlt className="mr-2 text-lg" />
                      Date
                    </label>
                    <input
                      name="followupDate"
                      type="date"
                      className="p-3 border rounded-lg w-full"
                      value={newFollowUp.followupDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaClock className="mr-2 text-lg" />
                      Time
                    </label>
                    <input
                      name="followupTime"
                      type="time"
                      className="p-3 border rounded-lg w-full"
                      value={newFollowUp.followupTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-2 px-5 rounded-lg"
                  >
                    Add Follow-Up
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-5 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 mt-6">
          <textarea
            onChange={(e) =>
              setNewFollowUp((prev) => ({ ...prev, followupDescription: e.target.value }))
            }
            placeholder="Type your note..."
            className="flex-grow h-12 p-4 bg-white rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleAddFollowUp}
            className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full shadow-md hover:from-green-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-110 flex items-center justify-center"
          >
            <IoMdSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTab;