import React, { Children } from 'react';
import logo from './logo.svg';
import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css"; // PrimeReact css
import Menu from './components/Menu';                           // PrimeReact TabMenu 
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useRoutes
} from "react-router-dom";                                     // Router 


function HelloWolrd() {
  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
];
  return(
    <div className="T">
    <table>
        <tr>
            <th></th>
            <th></th>
            {
              data.map((value, key) => {
                return (<td>{key}</td>)
              })
            }
        </tr>
        {data.map((val, key) => {
            return (
                <tr>
                    <td>VBD</td>
                    <td>VBD</td>
                    <td>{val.age}</td>
                    <td>{val.gender}</td>
                </tr>
            )
        })}
    </table>
</div>
  );
}


function App() {
  let element = useRoutes([
    {
      path: '/',
      element:<Menu />,
      children:[
        {
          path: "contact",
          element: <HelloWolrd/>
        }
      ]
    }
  ])
  return element;
}

export default App;
