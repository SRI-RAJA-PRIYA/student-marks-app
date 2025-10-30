// src/App.js/
// src/App.js/
import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "student_marks_app_data";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ roll: "", name: "", marks: "" });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddOrUpdate(e) {
    e.preventDefault();
    const { roll, name, marks } = form;
    if (!roll || !name || marks === "") return alert("Fill all fields");
    const newStudent = { roll, name, marks: Number(marks) };

    if (editingIndex >= 0) {
      const copy = [...students];
      copy[editingIndex] = newStudent;
      setStudents(copy);
      setEditingIndex(-1);
    } else {
      setStudents(prev => [...prev, newStudent]);
    }
    setForm({ roll: "", name: "", marks: "" });
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setForm(students[index]);
  }

  function handleDelete(index) {
    if (!window.confirm("Delete this student?")) return;
    setStudents(students.filter((_, i) => i !== index));
  }

  function handleExportCSV() {
    if (!students.length) return alert("No data to export");
    const header = ["roll","name","marks"];
    const csv = [
      header.join(","),
      ...students.map(s => `${s.roll},${s.name},${s.marks}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = students.filter(s =>
    (s.name + s.roll).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Student Marks Management</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search by name or roll"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")} style={{ marginLeft: 8 }}>Clear</button>
        <button onClick={handleExportCSV} style={{ marginLeft: 12 }}>Export CSV</button>
      </div>

      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: 20 }}>
        <input
          name="roll"
          placeholder="Roll number"
          value={form.roll}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="marks"
          placeholder="Marks"
          type="number"
          value={form.marks}
          onChange={handleChange}
        />
        <button type="submit">{editingIndex >= 0 ? "Update" : "Add"}</button>
        {editingIndex >= 0 && (
          <button type="button" onClick={() => { setEditingIndex(-1); setForm({roll:"",name:"",marks:""})}}>Cancel</button>
        )}
      </form>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s, i) => (
            <tr key={i}>
              <td>{s.roll}</td>
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
          {!filtered.length && (
            <tr><td colSpan="4">No students found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
