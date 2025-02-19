import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowUps, fetchSwitchIPDetails } from "../redux/view/viewThunk";
import SwitchIPTable from "../components/SwitchIPTable";
import CompanyDetailsCard from "../components/CompanyDetailsCard";
import { fetchCustomerDetail } from "../redux/customerTable/customerTableThunk";
import Followups from "../components/Followups";
import FollowUpFormModal from "../components/FollowUpFormModal";
import { setFollowupModalOff, setFollowupModalOn, setSwitchIPModalOff, setSwitchIPModalOn } from "../redux/view/viewSlice";
import SwitchIpFormModal from "../components/SwitchIpFormModal";

const ViewPage = () => {
  const { company_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSwitchIPDetails(company_id));
    dispatch(fetchCustomerDetail(company_id));
    dispatch(fetchFollowUps(company_id));
  }, [company_id]);

  const onclose = () => {
    dispatch(setSwitchIPModalOff())
  }
  return (
    <div className="flex justify-self-center">
      <div className="w-[300px]">
        <SwitchIPTable />
        <SwitchIpFormModal closeModal={onclose} company_id={company_id} />
        <button onClick={() => dispatch(setSwitchIPModalOn())}>addip</button>
      </div>
      <div>
        <CompanyDetailsCard />
      </div>
      <div>
        <Followups />
      </div>
      <FollowUpFormModal />
      <button onClick={() => dispatch(setFollowupModalOn())}>Add Follow up</button>
    </div>
  );
};

export default ViewPage;
