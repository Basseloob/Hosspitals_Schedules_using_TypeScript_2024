import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { error } from "console";

// Define the type for branch data
interface Branch {
  id: number;
  name: string;
  details: string;
}

function Habib_Branches() {
  const [branchess, setBranchess] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [text, setText] = useState("");
  const [backButton, setBackButton] = useState("");

  // Fetch branch details when a branch is selected
  useEffect(() => {
    axios
      .get(
        "https://mern-api-habibschedule-vercel-server.vercel.app/habibSchedule_FM"
      )
      .then((res) => {
        console.log(res.data);
        // setSelectedBranch(res.data);
        setBranchess(res.data);
      })
      .catch((error) => {
        console.error("Error fetching branch data:", error);
      });
  }, []);

  // Function to fetch detailed data of a selected branch
  const handleBranchClick = (branchId: number) => {
    axios
      .get<Branch>(
        `https://mern-api-habibschedule-vercel-server.vercel.app/habibSchedule_FM/${branchId}`
      )
      .then((response) => {
        console.log("Branch Details:", response.data);
        setSelectedBranch(response.data); // Set selectedBranch with fetched data
        setText(response.data.name); // Set the header text to the branch name
        setBackButton("Go Back"); // Show the Go Back button
      })
      .catch((error) => {
        console.error("Error fetching branch details:", error);
      });
  };

  // const branches = [
  //   {
  //     id: 1,
  //     name: "Khobar",
  //     // details: "Details about Khobar branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Suwaidi",
  //     // // details: "Details about Suwaidi branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Arrayan",
  //     // // details: "Details about Arrayan branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "AlNarjis",
  //     // // details: "Details about AlNarjis branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "AlGhdeer",
  //     // // details: "Details about AlGhdeer branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: "Sahafa",
  //     // // details: "Details about Sahafa branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 7,
  //     name: "Olaya",
  //     // // details: "Details about Olaya branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 8,
  //     name: "Takhassusi",
  //     // // details: "Details about Takhassusi branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  //   {
  //     id: 9,
  //     name: "Jeddah-Fayha",
  //     // // details: "Details about Jeddah-Fayha branch...",
  //     branch_Clinics: [
  //       "Internal Medicine",
  //       "Endocrinology",
  //       "Cardiology",
  //       "Neurology",
  //       "Nephro",
  //       "Family Medicine",
  //     ],
  //   },
  // ];

  const branches = [
    { id: 1, name: "Khobar", details: "Loading..." },
    { id: 2, name: "Suwaidi", details: "Loading..." },
    { id: 3, name: "Arrayan", details: "Loading..." },
    { id: 4, name: "AlNarjis", details: "Loading..." },
    { id: 5, name: "AlGhdeer", details: "Loading..." },
    { id: 6, name: "Sahafa", details: "Loading..." },
    { id: 7, name: "Olaya", details: "Loading..." },
    { id: 8, name: "Takhassusi", details: "Loading..." },
    { id: 9, name: "Jeddah-Fayha", details: "Loading..." },
  ];

  return (
    <div className="App-content">
      <header className="App-header">
        {/* Go Back button (if necessary) */}
        {selectedBranch && (
          <p
            onClick={() => {
              setSelectedBranch(null); // Reset to show all branches
              setText(""); // Clear the text
              setBackButton(""); // Hide the back button
            }}
          >
            {backButton}
          </p>
        )}
        {/* Will show the branch name in the Header if branch is clicked */}
        <p>{text}</p>
      </header>

      {/* If no branch is selected, display the list of branches */}
      {!selectedBranch ? (
        branches.map((branch) => (
          <div key={branch.id} className="branch-container">
            <p
              className="branch-name"
              onClick={() => {
                // console.log(`Branch clicked: ${branch.name}`);
                // setSelectedBranch(branch); // Set the selected branch
                // setText(branch.name); // Set the header text to the branch name
                // setBackButton("Go Back"); // Show the Go Back button
                handleBranchClick(branch.id);
              }}
            >
              {branch.name}
            </p>
          </div>
        ))
      ) : (
        // If a branch is selected, show its details
        <div className="branch-container">
          <h1>{selectedBranch.name} Branch</h1>
          <h2>Neurology Doctors</h2>
          <p>{selectedBranch.details}</p>
        </div>
      )}
    </div>
  );
}

export default Habib_Branches;
