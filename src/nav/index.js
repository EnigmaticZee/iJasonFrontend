 /*==========================================================================
 |       Component: nav/index.js
 |
 |=Authors===================================================================
 |
 |       Ian Adrian
 |       Srisaiyeegharan Kidnapillai
 |       Zaid Shakil
 |
 |=History===================================================================
 |
 |       Created: Oct 17, 2017
 |       Updated: Oct 23, 2017
 *=========================================================================*/

import {router} from '../router'
export default {

	studentUnitClicked: false,
	staffUnitClicket: false,
	unitsDetails : {unitCode: "", unitName: ""},
	 /* ---Student unit to lab navigation ---
	       1. Sets the unit details for the unit clicked
	       2. Routes to the students lab page. */
	unitToLab(context, unit, title)
	{
		console.log("Inside UnitTOLAB Function");
		this.studentUnitClicked = true;
		this.unitsDetails.unitCode = unit;
		this.unitsDetails.unitName = title;
		console.log(this.unitsDetails.unitCode);
		console.log(this.unitsDetails.unitName);
		context.$router.push('/units/labs');
	},
	/* ---Student Lab to Unit navigation ---
	       1. Routes to the students unit page. */
	toUnit(context)
	{
		console.log("Going to unit page");
		var self = context;
		self.$router.replace('/units');
	},

	/* ---Staff unit to lab navigation ---
	       1. Sets the unit details for the unit clicked
	       2. Routes to the staff lab page. */
	staffUnitToLab(context,unit,title)
	{
		console.log("Inside StaffUnitTOLAB Function");
		this.staffUnitClicked = true;
		this.unitsDetails.unitCode = unit;
		this.unitsDetails.unitName = title;
		console.log(this.unitsDetails.unitCode);
		console.log(this.unitsDetails.unitName);
		context.$router.push('/staff-units/labs');
	},	
	/* ---Staff Lab to Unit navigation ---
	       1. Routes to the staff unit page. */
	toStaffUnit(context)
	{
		console.log("Going to unit page");
		var self = context;
		self.$router.replace('/staff-units');
	},

	/* ---Login to Contributors navigation ---
	       1. Routes to the contributions page. */
	toContributors(context)
	{
		console.log("Going to contributors page");
		var self = context;
		self.$router.replace('/contributors');
	},
}
