import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Handle errors
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }

    // Handle success messages
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    // Fetch applications if not already loaded
    if (!applications || applications.length === 0) {
      dispatch(fetchEmployerApplications());
    }
  }, [dispatch, error, message, applications]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length === 0 ? (
        <h1>You have no applications from job seekers.</h1>
      ) : (
        <div className="account_components">
          <h3>Applications For Your Posted Jobs</h3>
          <div className="applications_container">
            {applications.map((application) => (
              <div className="card" key={application._id}>
                <p className="sub-sec">
                  <span>Job Title: </span> {application.jobInfo.jobTitle}
                </p>
                <p className="sub-sec">
                  <span>Applicant's Name: </span> {application.jobSeekerInfo.name}
                </p>
                <p className="sub-sec">
                  <span>Applicant's Email: </span> {application.jobSeekerInfo.email}
                </p>
                <p className="sub-sec">
                  <span>Applicant's Phone: </span> {application.jobSeekerInfo.phone}
                </p>
                <p className="sub-sec">
                  <span>Applicant's Address: </span> {application.jobSeekerInfo.address}
                </p>
                <p className="sub-sec">
                  <span>Applicant's Cover Letter: </span>
                  <textarea
                    value={application.jobSeekerInfo.coverLetter}
                    rows={5}
                    readOnly
                  />
                </p>
                <div className="btn-wrapper">
                  <button
                    className="outline_btn"
                    onClick={() => handleDeleteApplication(application._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={application.jobSeekerInfo?.resume.url}
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;