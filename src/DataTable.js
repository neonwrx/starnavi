import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";

const DataTable = React.memo(({ winners }) => {
  const renderData = () => {
    return winners.map(item => {
      const { winner, date, id } = item;
      return (
        <tr key={id}>
          <td>{winner}</td>
          <td>{date}</td>
        </tr>
      );
    });
  };
  return (
    <div className="dataTable">
      <h2>Leader Board</h2>
      <Table bordered>
        <tbody>{renderData()}</tbody>
      </Table>
    </div>
  );
});

DataTable.propTypes = {
  winners: PropTypes.array
};

export default DataTable;
