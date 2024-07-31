import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./DescriptionDetails.scss";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthContext } from "../../Firebase/Auth/Auth";
import { doDeleteProject } from "../../Firebase/firebase";
import { leaveProject } from "../../Firebase/firebase";
import ProjectModal from "../ProjectModal/ProjectModal";
import { toast } from "react-toastify";
import DeleteConfirmation from "../DeleteConfirmationModal/DeleteConfirmation";
import { IoMdMail } from "react-icons/io";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { mainUrl } from "../../Utils/urls";
import RequirementDetails from "../RequirementDetails/RequirementDetails";

const DescriptionDetails = (props) => {
  const { fetchData, devHash } = useContext(ProjectContext);
  const { currentUser } = useContext(AuthContext);
  const [canModifyProject, setCanModifyProject] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid === props.selectedProject.leader_id) {
      setCanModifyProject(true);
    } else {
      setCanModifyProject(false);
    }
  }, [currentUser?.uid, props.selectedProject.leader_id]);

  const deleteProj = () => {
    setDisplayConfirmationModal(true);
  };

  const leaveProjectHandler = async () => {
    if (currentUser && !canModifyProject && props.selectedProject.teamMembers.includes(currentUser.email)) {
      const projectId = props.selectedProject.id;
      const userEmail = currentUser.email;
      await leaveProject(projectId, userEmail);
      toast("You have left the project successfully");
      fetchData();
      navigate("/projects");
    }
  };

  const submitDelete = (id) => {
    doDeleteProject(id, () => {
      toast("Project deleted successfully");
      fetchData();
      navigate(0);
    });
    setDisplayConfirmationModal(false);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const isCurrentUserInProject =
  currentUser &&
  props.selectedProject.teamMembers &&
  props.selectedProject.teamMembers.includes(currentUser.email);  const isCurrentUserLeader = currentUser?.uid === props.selectedProject.leader_id;

  return (
    <>
      <div className="description__container">
        <div className="description-details__headcontrols">
          {canModifyProject && (
            <RiDeleteBin7Line
              size={38}
              style={{ cursor: "pointer" }}
              onClick={deleteProj}
              alt="delete project"
            />
          )}
          {canModifyProject && (
            <FiEdit
              size={36}
              style={{ cursor: "pointer" }}
              onClick={() => setShowNewProjectModal(true)}
            />
          )}
        </div>
        <div className="description__title">PROJECT DESCRIPTION</div>
        <div className="description__content">{props.selectedProject.desc}</div>
      </div>
      <div className="description__other">
        {props.selectedProject.teamMembers?.length && (
          <div>
            <div>
              <div className="description__other-team">TEAM MEMBERS</div>
              <div className="description__other-members">
                {props.selectedProject.teamMembers.map((member, index) =>
                  devHash[member]?.id ? (
                    <div className="description__other-member" key={index}>
                      {index + 1}
                      {"."}
                      <div style={{ width: "6px" }}></div>
                      <a
                        href={`${mainUrl}/developers/${devHash[member].id}`}
                        style={{
                          color: "#263238",
                          textDecoration: "underline",
                        }}
                      >
                        {devHash[member].name}
                      </a>
                    </div>
                  ) : (
                    <div className="description__other-member" key={index}>
                      {index + 1}. {member}
                    </div>
                  )
                )}
              </div>
              <br />
              {canModifyProject && (
                <a href={`${mainUrl}/developers/`} className="invite-button">Invite Developers</a>
              )}
              {isCurrentUserInProject && !isCurrentUserLeader && (
                <div>
                  <button className="leave-button" onClick={leaveProjectHandler}>Leave Project</button>
                </div>
              )}
            </div>
          </div>
        )}
        {props.selectedProject.skills?.length && (
          <div>
            <div className="description__other-team">TECH STACKS</div>
            <div className="description__other-members">
              {props.selectedProject.skills?.map((skill, index) => (
                <div className="description__other-member" key={index}>
                  {index + 1}
                  {" . "}
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
        {props.selectedProject.links?.length ? (
          <div>
            <div className="description__other-reference">REFERENCES</div>

            <div
              className="ProjectDetail-linkdiv"
              style={{ display: "flex" }}
            ></div>
          </div>
        ) : (
          <div>

          </div>
        )}
        <div className="description__other-references">
          {props.selectedProject.links?.map((link, index) => (
            <a
              rel="noopener noreferrer"
              target="_blank"
              key={index}
              href={link.startsWith("http") ? link : "http://" + link}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="description__other-team">REQUIREMENTS</div>
        <RequirementDetails
          selectedProject={props.selectedProject}
          setVariable={props.setVariable}
          variable={props.variable}
        />

        {props.selectedProject.tags?.length ? (
          <div className="description__other-tags">
            {" "}
            <div className="description__other-tag">
              <IoPricetagsOutline size={26} />
            </div>
            <div className="description__tag">
              {props.selectedProject.tags.map((tag, index) => (
                <p key={index}>#{tag}</p>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {currentUser ? (
          <div className="description__tag_phone">
            <i className="fa fa-phone"></i>
            <span className="ml-2">{props.selectedProject.contactNo}</span>
          </div>
        ) : (
          ""
        )}

        <div className="description-container__controls">
          {currentUser ? (
            <a
              href={`tel:${props.selectedProject.contactNo}`}
            >
              <FaPhoneAlt
                color="WHITE"
                size={40}
                style={{
                  backgroundColor: "#9e0000",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              />
            </a>
          ) : (
            ""
          )}

          {currentUser ? (
            <a href={`mailto: ${props.selectedProject.leaderEmail}`}>
              <IoMdMail
                color="#9e0000"
                size={49}
                style={{ marginTop: "3px" }}
              />
            </a>
          ) : (
            ""
          )}
        </div>

        <ProjectModal
          show={showNewProjectModal}
          onHide={() => setShowNewProjectModal(false)}
          project={props.selectedProject}
          setVariable={props.setVariable}
          variable={props.variable}
        />
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={props.selectedProject.id}
        />
      </div>
    </>
  );
};

export default DescriptionDetails;
