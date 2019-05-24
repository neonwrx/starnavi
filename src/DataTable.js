import React, { PureComponent } from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";

class DataTable extends PureComponent {
  renderData() {
    const { winners } = this.props;
    return winners.map(item => {
      const { winner, date, id } = item;
      return (
        <tr key={id}>
          <td>{winner}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="dataTable">
        <h2>Leader Board</h2>
        <Table bordered>
          <tbody>{this.renderData()}</tbody>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = {
  winners: PropTypes.array,
};

export default DataTable;
