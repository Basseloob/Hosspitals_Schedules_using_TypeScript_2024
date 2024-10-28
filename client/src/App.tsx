// import React, { useState } from "react";
// // import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
//   useNavigate,
// } from "react-router-dom";

// // Pages :
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import RegisteredUsers from "./pages/RegisteredUsers";
// // import Register from "./pages/Register";
// import Habib_Branches from "./pages/habib_Branches";
// import Manea_Branches from "./pages/manea_Branches";
// import Mouwasat_Branches from "./pages/mouwasat_Branches";

// // Images:
// import habibImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Habib_Hospital.png";
// import ManeaImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Almanea.webp";
// import mouwasatImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Mouawasat.jpeg";

// function App() {
//   // const navigate = useNavigate(); // useNavigate hook is used inside the Router context

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [text, setText] = useState("");
//   const [backButton, setBackButton] = useState("");

//   // function goBack() {
//   //   navigate(-1);
//   // }
//   const images = [
//     {
//       id: 1,
//       src: habibImage,
//       alt: "Image 1",
//       path: "/habibBranches",
//       name: "Dr. Sulaiman Al Habib",
//     },
//     {
//       id: 2,
//       src: ManeaImage,
//       alt: "Image 2",
//       path: "/maneaBranches",
//       name: "Almanea ",
//     },
//     {
//       id: 3,
//       src: mouwasatImage,
//       alt: "Image 3",
//       path: "/mouwasatBranches",
//       name: "Al Mouwasat",
//     },
//   ];

//   const handleImageClick = (id: any) => {
//     setSelectedImage(id === selectedImage ? null : id);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           {/* <p onClick={goBack}>{backButton}</p> */}
//           <p onClick={() => window.history.go(-1)}>{backButton}</p>
//           <p>{text}</p>
//         </header>

//         <div className="App-content">
//           {images.map((image) => (
//             <div key={image.id} className="image-container">
//               <Link to={image.path}>
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className={`image ${
//                     selectedImage === image.id ? "enlarge" : ""
//                   }`}
//                   onClick={() => {
//                     console.log(`Image clicked: ${image.name}`);
//                     setText(image.name);
//                     setBackButton("Go Back");
//                   }}
//                 />
//               </Link>
//               <p className="image-name">{image.name}</p>
//             </div>
//           ))}
//         </div>

//         <Routes>
//           {/* <Route path="/" exact Component={Home}></Route> */}
//           {/* <Route path="/login" exact Component={Login}></Route> */}
//           {/* <Route path="/register" exact Component={Register}></Route> */}
//           <Route path="/habibBranches" element={<Habib_Branches />} />
//           <Route path="/maneaBranches" element={<Manea_Branches />} />
//           <Route path="/mouwasatBranches" element={<Mouwasat_Branches />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Pages :
import Habib_Branches from "./pages/habib_Branches";
import Manea_Branches from "./pages/manea_Branches";
import Mouwasat_Branches from "./pages/mouwasat_Branches";

// Images:
import habibImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Habib_Hospital.png";
import ManeaImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Almanea.webp";
import mouwasatImage from "/Users/basseloob/Desktop/MERN_APIS/typescript-Hospitals-Schedules/client/src/pages/Mouawasat.jpeg";

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState("");
  const [backButton, setBackButton] = useState("");

  const images = [
    {
      id: 1,
      src: habibImage,
      alt: "Image 1",
      path: "/habibBranches",
      name: "Dr. Sulaiman Al Habib",
    },
    {
      id: 2,
      src: ManeaImage,
      alt: "Image 2",
      path: "/maneaBranches",
      name: "Almanea ",
    },
    {
      id: 3,
      src: mouwasatImage,
      alt: "Image 3",
      path: "/mouwasatBranches",
      name: "Al Mouwasat",
    },
  ];

  return (
    <div className="App-content">
      <header className="App-header">
        {/* Go Back button (if necessary) */}
        <p onClick={() => window.history.go(-1)}>{backButton}</p>
        <p>{text}</p>
      </header>

      {images.map((image) => (
        <div key={image.id} className="image-container">
          <Link to={image.path}>
            <img
              src={image.src}
              alt={image.alt}
              className={`image ${selectedImage === image.id ? "enlarge" : ""}`}
              onClick={() => {
                console.log(`Image clicked: ${image.name}`);
                setText(image.name);
                setBackButton("Go Back");
              }}
            />
          </Link>
          <p className="image-name">{image.name}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Routes for different hospital branches */}
        <Route path="/habibBranches" element={<Habib_Branches />} />
        <Route path="/maneaBranches" element={<Manea_Branches />} />
        <Route path="/mouwasatBranches" element={<Mouwasat_Branches />} />
      </Routes>
    </Router>
  );
}

export default App;
