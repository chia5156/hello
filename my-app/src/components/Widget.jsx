import React, { useState, useMemo } from 'react';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./widget.css"
import "primereact/resources/themes/lara-light-blue/theme.css";
function Widget(props) {

    const list = [
	{ name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    function addData() {

	props.setData(
	    function (prev) {
		return (
		    [
		      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
		      { make: "Ford", model: "F-Series", price: 33850, electric: true },
		      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
		      { make: "Ford", model: "Test", price: 100, electric: false}
		    ]
		)
	    }
	)
    };


    return(
	<div className="card">
	<Panel> 
	  <Dropdown
	     value='txt'
	     onChange={(e) => console.log('txt')}
	     options={list}
	     optionLabel='name'
	     placeholder='txt'
	   />
	   <Dropdown
	     value='txt'
	     onChange={(e) => console.log('txt')}
	     options={list}
	     optionLabel='name'
	     placeholder='txt'
	   />
	   <Dropdown
	     value='txt'
	     onChange={(e) => console.log('txt')}
	     options={list}
	     optionLabel='name'
	     placeholder='txt'
	   />
	   <Dropdown
	     value='txt'
	     onChange={(e) => console.log('txt')}
	     options={list}
	     optionLabel='name'
	     placeholder='txt'
	   />
	   <Dropdown
	     value='txt'
	     onChange={(e) => console.log('txt')}
	     options={list}
	     optionLabel='name'
	     placeholder='txt'
	   />
	   <Button
	     label="Submit"
	     onClick={(e) => {addData()}} 
	   />
        </Panel>
	<div>
	  {props.children}
	</div>
	</div>
    );
};

export default Widget;
