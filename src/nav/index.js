import {router} from '../router'



export default {
	unitClicked: false,
	unitCode: "",
	unitName: "",

	unitToLab(context, unit, title)
	{
		console.log("Inside Function");
		this.unitClicked = true;
		this.unitCode = unit;
		this.unitName = title;
		context.$router.push('/units/labs');
	}
}
