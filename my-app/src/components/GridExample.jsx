import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
//import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./style.css"


const GridExample = (props) => {
     // Row Data: The data to be displayed.
     //const [rowData, setRowData] = useState(null);
     
     // Column Definitions: Defines the columns to be displayed.
     const [colDefs, setColDefs] = useState([
       { field: "make" },
       { field: "model" },
       { field: "price" },
       { field: "electric" }
     ]);

   
    const rowClassRules = useMemo( () => {
	return {
	    // apply red to Ford cars
	    "rag-red": (params) => params.data.make === "Tesla",
	    "rag-green": (params) => params.data.make === "Ford",
        };
     }, []);



    return (
     // wrapping container with theme & size
     <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
     >
       <AgGridReact
	   rowData={props.data}
	   columnDefs={colDefs}
	   rowClassRules={rowClassRules}
       />
     </div>
    )
}
export default GridExample;


