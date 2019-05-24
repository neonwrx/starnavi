import React, { Component } from 'react';
import { Table } from 'reactstrap';

class DataTable extends Component {
  renderData() {
    const { winners } = this.props;
    return (
      winners.map((item) => {
        const { winner, date, id } = item;
        return(
          <tr key={id}>
            <td>{winner}</td>
            <td>{date}</td>
          </tr>
        )
      })
    )
  }

  render() {
    console.log(this.props.winners);
    return(
      <div className="dataTable">
        <h2>Leader Board</h2>
        <Table bordered>
          <tbody>
            {
              this.renderData()
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default DataTable;
