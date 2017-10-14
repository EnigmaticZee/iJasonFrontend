import {router} from '../router'
export default {

	studentUnitClicked: false,
	staffUnitClicket: false,
	unitsDetails : {unitCode: "", unitName: ""},
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
	toUnit(context)
	{
		console.log("Going to unit page");
		var self = context;
		self.$router.replace('/units');
	},
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
	toStaffUnit(context)
	{
		console.log("Going to unit page");
		var self = context;
		self.$router.replace('/staff-units');
	}
}
