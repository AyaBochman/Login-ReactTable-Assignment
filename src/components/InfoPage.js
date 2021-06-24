/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import userDetailsService from "../services/userDetailsService";
import { onUserDetailsSuccess } from "../redux/actions/onUserDetailsSuccess";
import Table from "./Tables/Table";

const InfoPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => ({
    userToken: state.userToken,
  }));

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const userDetailsData = await userDetailsService(userToken.token);
        if (userDetailsData.length && !userDetailsData.err) {
          dispatch(onUserDetailsSuccess(userDetailsData));
          if (isMounted) {
            setProjectsData(userDetailsData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
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

  const calcAverage = (arr) => {
    if (arr.length) {
      const avg =
        arr.reduce((a, b) => ({ score: a.score + b.score })).score / arr.length;
      return avg;
    }
    return null;
  };

  return (
    <StyledInfo>
      <h1>User Info</h1>
      <Table columns={userColumns} data={[userToken]} />
      <div>
        {projectsData ? (
          <h3>User Avg. Score: {calcAverage(projectsData)}</h3>
        ) : null}
      </div>
      <Table
        columns={projectColumns}
        data={projectsData}
        getCellProps={(cellInfo) => generateCellProps(cellInfo)}
      />
    </StyledInfo>
  );
};

export default InfoPage;

const StyledInfo = styled.div`
  text-align: center;
`;
