/* API calls on Student side */

//API call which gets the required devices for the lab
export function iniCall () {
  var url = '/api/required_devices.php'
  return url
}
//API call which gets the booked devices of the user in smartrack
export function bookedDevicesCall () {
  var url = '/api/booked_devices.php'
  return url
}
//API call for collection of user work
export function collectCall () {
  var url = '/api/collect_work.php'
  return url
}
//API call which gets the status of the current collection
export function collectStatusCall () {
  var url = '/api/collect_status.php'
  return url
}
//API call which gets the feedback for a particular lab
export function feedbackCall () {
  var url = '/api/assess_work.php'
  return url
}

//API call to download the feedback
export function downloadFeedbackCall()
{
   var url = '/api/download_feedback.php?'
   return url
}

//API call to download the students configurations
export function downloadConfigCall()
{
   var url = '/api/download_config.php?'
   return url
}

//API call to download the lab
export function downloadLabCall()
{
   var url = '/api/download_labsheet.php?'
   return url
}

//API call to send an email of the current lab feedback
export function sendEmailCall()
{
   var url = '/api/send_email.php'
   return url
}


/* API calls on staff side */

//API call to add a unit - Staff
export function addUnit()
{
   var url = '/api/add_unit.php'
   return url
}
//API call to edit a unit
export function editUnit()
{
   var url = '/api/edit_unit.php'
   return url
}
//API call to add a lab
export function addLab()
{
   var url = '/api/add_lab.php'
   return url
}
//API call to edit a lab
export function editLab()
{
   var url = '/api/edit_lab.php'
   return url
}


/* API calls used on both student and staff side */

//API call to get the labs for a particular unit and week
export function labsCall () {
  var url = '/api/get_labs.php'
  return url
}
//API call to get the units
export function unitsCall () {
  var url = '/api/get_units.php'
  return url
}



