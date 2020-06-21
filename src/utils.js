import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

// Table Data for Countries and US States Report
export const tableData = (type, header) => {
  return [
    {
      Header: () => (
        <span>
          {header}
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: type,
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          New Cases
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "todayCases",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
      //   Footer: "Total: ",
    },
    {
      Header: () => (
        <span>
          New Deaths
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "todayDeaths",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          New Recovered
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "todayRecovered",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          Cases
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "cases",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          Deaths
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "deaths",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          Recovered
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "recovered",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          Active
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "active",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
    {
      Header: () => (
        <span>
          Tests
          <FontAwesomeIcon icon={faSort} />
        </span>
      ),
      accessor: "tests",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
  ];
};
