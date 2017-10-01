import {router} from '../router'



export default {
	unitClicked: false,
	unitCode: "",

	unitToLab(context, unit)
	{
		console.log("Inside Function");
		this.unitClicked = true;
		this.unitCode = unit;
		context.$router.push('/units/labs');
	}
}
