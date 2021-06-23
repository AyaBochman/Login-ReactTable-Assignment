/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import userDetailsService from "../services/userDetailsService";
import { onUserDetailsSuccess } from "../redux/actions/onUserDetailsSuccess";
import Table from "./Tables/Table";

// eslint-disable-next-line arrow-body-style
const Info = () => {
  const [projectsData, setProjectsData] = useState([]);
  // const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { userToken } = useSelector((state) => ({
    userToken: state.userToken,
    userDetails: state.userDetails,
  }));

  useEffect(() => {
    async function loadData() {
      try {
        const userDetails = await userDetailsService(userToken.token);
        if (userDetails.length) {
          dispatch(onUserDetailsSuccess(userDetails));
          setProjectsData(userDetails);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [dispatch, userToken.token]);

  const userColumns = useMemo(
    () => [
      {
        Header: "User Details",
        columns: [
          {
            Header: "Name",
            accessor: "personalDetails.name",
          },
          {
            Header: "Team",
            accessor: "personalDetails.Team",
          },
          {
            Header: "Joined Date",
            accessor: "personalDetails.joinedAt",
          },
          {
            Header: "Avatar",
            accessor: "personalDetails.avatar",
            Cell: ({ cell: { value } }) => (
              <div className="blog-comments__avatar mr-3">
                <img src={value} alt={value} height={34} />
              </div>
            ),
          },
        ],
      },
    ],
    []
  );

  const projectColumns = useMemo(
    () => [
      {
        Header: "Project Details",
        columns: [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Score",
            accessor: "score",
            className: "score",
          },
          {
            Header: "Duration In Days",
            accessor: "durationInDays",
          },
          {
            Header: "Bugs Count",
            accessor: "bugsCount",
          },
        ],
      },
    ],
    []
  );

  const generateCellProps = (cellInfo) => {
    console.log("what is thissss", cellInfo);
    if (cellInfo.column.Header === "Score") {
      let cellColor;
      if (cellInfo.value > 90) {
        cellColor = "green";
      } else if (cellInfo.value < 70) {
        cellColor = "red";
      } else {
        cellColor = "none";
      }
      return {
        style: { background: `${cellColor}` },
      };
    }
    return { style: { background: "none" } };
  };

  return (
    <StyledInfo>
      <h1>User Info</h1>
      <Table
        columns={userColumns}
        data={[userToken]}
        // getCellProps={(cellInfo) => generateCellProps(cellInfo)}
      />
      <Table
        columns={projectColumns}
        data={projectsData}
        getCellProps={(cellInfo) => generateCellProps(cellInfo)}
      />
    </StyledInfo>
  );
};

export default Info;

const StyledInfo = styled.div`
  text-align: center;
`;
