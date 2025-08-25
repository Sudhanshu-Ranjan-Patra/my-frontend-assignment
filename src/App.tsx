import { useState } from "react";
import { DataTable } from "./components/DataTable/DataTable";
import type { Column } from "./components/DataTable/DataTable";
import { InputField } from "./components/InputField/InputField";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Sudhanshu ", email: " sudhanshu@example.com", age: 20 },
  { id: 2, name: "Chiku ", email: "chiku@example.com", age: 19 },
  { id: 3, name: "Radhika ", email: "radhika@example.com", age: 18 },
];

function App() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [name, setName] = useState("");

  return (
    <>
      <div className="input-demo-container">
        <div className="input-card">
          <h1>Modern Input Demo</h1>

          <InputField
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="Please provide your full name"
            variant="outlined"
            size="md"
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value=""
            onChange={() => {}}
            type="email"
            variant="filled"
            size="lg"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value=""
            onChange={() => {}}
            type="password"
            variant="outlined"
            size="md"
          />
        </div>
      </div>

      <div className="datatable-container">
        <h1 className="datatable-title">DataTable Demo</h1>
        <div className="datatable-wrapper flex gap-5">
          <DataTable<User>
            data={sampleData}
            columns={columns}
            selectable
            onRowSelect={(rows) => setSelectedRows(rows)}
          />
        </div>

        {selectedRows.length > 0 && (
          <div className="selected-rows">
            <h2 className="selected-rows-title">Selected Rows:</h2>
            <ul className="selected-rows-list">
              {selectedRows.map((row) => (
                <li key={row.id} className="selected-row-item">
                  {row.name} ({row.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
