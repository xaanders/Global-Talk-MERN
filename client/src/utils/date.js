const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const todayDate = `${day}-${month}-${year}`

export default todayDate;