import React from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const TableReport = ({ data, columns, title, srNo }) => {
  return (
    <section className="section-wrapper" id={title}>
      <h2 className="title">
        {srNo}. {title} Report
      </h2>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={20}
        // showPagination={false}
        // style={{
        //   height: "600px", // This will force the table body to overflow and scroll, since there is not enough room
        // }}
        className="-striped -highlight"
      />
    </section>
  );
};

export default TableReport;
