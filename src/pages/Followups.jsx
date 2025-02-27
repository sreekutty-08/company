import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FaArrowAltCircleDown, FaPhone } from "react-icons/fa";
import { Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axiosConfiguration";

const FollowUp = ({ company_id }) => {
  const [activeTab, setActiveTab] = useState("call");
  const [followUps, setFollowUps] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [followUpsResponse, customersResponse] = await Promise.all([
          instance.get('api/Allfollowups'),
          instance.get('api/customers')
        ]);
        setFollowUps(followUpsResponse.data.followups);
        setCustomers(customersResponse.data.customer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [company_id]);

  const handleStatusChange = async (followupId, newStatus) => {
    try {
      await instance.put(`api/followup/${followupId}`, { followupStatus: newStatus });
      setFollowUps((prevFollowUps) =>
        prevFollowUps.map((followUp) =>
          followUp.followupId === followupId ? { ...followUp, followupStatus: newStatus } : followUp
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredFollowUps = followUps.filter((item) => 
    (statusFilter === "all" || item.followupStatus === statusFilter) && item.followupMethod === activeTab
  );

  const renderTabContent = () => {
    if (loading) return <div className="text-center py-8 text-gray-600">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    if (filteredFollowUps.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No follow-ups for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}.
        </div>
      );
    }

    return (
      <table className="min-w-full mt-6 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Customer ID</th>
            <th className="px-6 py-4 text-left">Company Name</th>
            <th className="px-6 py-4 text-left">Follow-Up Category</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Change Status</th>
          </tr>
        </thead>
        <tbody>
  {filteredFollowUps.map((followUp, index) => {
    const customer = customers.find(c => c.id === parseInt(followUp.customerId)) || {};
    return (
      <tr
        key={followUp.followupId}
        className={`${
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        } hover:bg-gray-200 transition-colors duration-200 cursor-pointer`}
      >
        <td className="px-6 py-4 border-t">{customer.customerId || "N/A"}</td>
        <td className="px-6 py-4 border-t">{customer.companyName || "N/A"}</td>
        <td className="px-6 py-4 border-t capitalize">{followUp.followupCategory}</td>
        <td className="px-6 py-4 border-t">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            followUp.followupStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
            followUp.followupStatus === "process" ? "bg-blue-100 text-blue-800" :
            "bg-green-100 text-green-800"
          }`}>
            {followUp.followupStatus}
          </span>
        </td>
        <td className="px-6 py-4 border-t">
          <select
            value={followUp.followupStatus}
            onChange={(e) => handleStatusChange(followUp.followupId, e.target.value)}
            className="bg-gray-100 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="pending">Pending</option>
            <option value="process">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
    );
  };

  return (
    <div className="p-8 text-gray-900 min-h-screen bg-gray-50">
      {/* Header with Icon */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-orange-500 rounded-full p-3 flex items-center justify-center shadow-lg">
          <FaArrowAltCircleDown className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Follow Up</h1>
      </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-8">
        <button className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200">
          <span>Total Follow-Ups: {filteredFollowUps.length}</span>
        </button>

        {/* Status Filter Dropdown */}
        <div className="flex items-center space-x-4">
          <select
            className="bg-white px-4 py-2 rounded-lg border shadow-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="process">In Process</option>
            <option value="completed">Completed</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center space-x-6 mb-8">
        {[
          { tab: "call", icon: <FaPhone className="w-6 h-6 text-orange-500" />, label: "Call" },
          { tab: "email", icon: <Mail className="w-6 h-6 text-red-500" />, label: "Email" },
          { tab: "chat", icon: <MessageSquare className="w-6 h-6 text-blue-500" />, label: "Chat" },
        ].map(({ tab, icon, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-8 flex items-center justify-center space-x-3 rounded-lg shadow-lg transition-all duration-200 ${
              activeTab === tab ? "bg-gray-200 scale-105" : "bg-white hover:bg-gray-100"
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-lg font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FollowUp;