import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchFollowUps,
  fetchSwitchIPDetails,
} from "../redux/view/viewThunk";
import { fetchCustomerDetail } from "../redux/customerTable/customerTableThunk";
import { 
  setFollowupModalOn, 
  setSwitchIPModalOn, 
  setSwitchIPModalOff 
} from "../redux/view/viewSlice";

import SwitchIPTable from "../components/SwitchIPTable";
import SwitchIpFormModal from "../components/SwitchIpFormModal";
import CompanyDetailsCard from "../components/CompanyDetailsCard";
import Followups from "../components/Followups";
import FollowUpFormModal from "../components/FollowUpFormModal";

const ViewPage = () => {
  const { company_id } = useParams();
  const dispatch = useDispatch();
  const {reRender} = useSelector(state => state.view)

  useEffect(() => {
    dispatch(fetchSwitchIPDetails(company_id));
    dispatch(fetchCustomerDetail(company_id));
    dispatch(fetchFollowUps(company_id));
  }, [company_id, reRender]);

  return (
    <div className="container mx-auto p-6">
      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Panel - Switch IP Section */}
        <div className="flex flex-col items-center space-y-4">
          <SwitchIPTable />
          <button
            onClick={() => dispatch(setSwitchIPModalOn())}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            Add IP
          </button>
          <SwitchIpFormModal
            closeModal={() => dispatch(setSwitchIPModalOff())}
            company_id={company_id}
          />
        </div>

        {/* Center Panel - Company Details */}
        <div className="flex justify-center">
          <CompanyDetailsCard />
        </div>

        {/* Right Panel - Follow Ups */}
        <div className="flex flex-col items-center space-y-4">
          <Followups />
          <button
            onClick={() => dispatch(setFollowupModalOn())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            Add Follow-up
          </button>
          <FollowUpFormModal company_id={company_id} />
        </div>

      </div>
    </div>
  );
};

export default ViewPage;
