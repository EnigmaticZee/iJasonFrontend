import {router} from '../router'



export default {
	unitClicked: false,
	unitsDetails : {unitCode: "", unitName: ""},

	unitToLab(context, unit, title)
	{
		console.log("Inside UnitTOLAB Function");
		this.unitClicked = true;
		this.unitsDetails.unitCode = unit;
		this.unitsDetails.unitName = title;
		console.log(this.unitsDetails.unitCode);
		console.log(this.unitsDetails.unitName);
		context.$router.push('/units/labs');
	}
}
