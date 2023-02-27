import { react } from "plotly.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getBarCharts = () => {
  return [
    <Bar dataKey="t1" fill="#82ca9d" />,
    <Bar dataKey="t2" fill="#82ca9d" />,
    <Bar dataKey="t3" fill="#82ca9d" />,
    <Bar dataKey="t4" fill="#82ca9d" />,
    <Bar dataKey="t5" fill="#82ca9d" />
  ];
};

const Record = (props) => (
  <tr>
    <td>{props.record.fecha}</td>
    <td>{props.record.ejercicio}</td>
    <td>{props.record.t1}</td>
    <td>{props.record.t2}</td>
    <td>{props.record.t3}</td>
    <td>{props.record.t4}</td>
    <td>{props.record.t5}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);


  // This method fetches the records from the database.
  useEffect(() => {

    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  const data = records.map((d) => d);
  const t1 = records.map((d) => d);
  //console.log(data);

   console.log(data)




  // This following section will display the table with the records of individuals.
  return (
    <>
      
        <div>
          <h3>Record List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Ejercicio</th>
                <th>t1</th>
                <th>t2</th>
                <th>t3</th>
                <th>t4</th>
                <th>t5</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        </div>
     

      <ResponsiveContainer aspect={2} width="100%">
        <BarChart data={data} margin={{}}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="fecha" />
          <YAxis type="number" domain={[0, 5]} />
          <Tooltip />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          
        {getBarCharts()}
        </BarChart>
      </ResponsiveContainer>

      {/*
               <div class="row">
        <div class="col" style={{ border: "1px solid rgba(0, 0, 0, 0.50)" }}>
          <h1>GRAFICO 1</h1>
          <ResponsiveContainer height={450} width={500}>
            <BarChart data={data} margin={{}}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis />
              <YAxis type="number" domain={[0, 15]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="t1" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div class="col" style={{ border: "1px solid rgba(0, 0, 0, 0.50)" }}>
          <h1>GRAFICO 2</h1>
          <ResponsiveContainer height={450} width={500}>
            <BarChart data={data} margin={{}}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis />
              <YAxis type="number" domain={[0, 15]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="t2" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div class="col" style={{ border: "1px solid rgba(0, 0, 0, 0.50)" }}>
          <h1>GRAFICO 3</h1>
          <ResponsiveContainer height={450} width={500}>
            <BarChart data={data} margin={{}}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis />
              <YAxis type="number" domain={[0, 15]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="t3" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

  */}
    </>
           
  );
}
