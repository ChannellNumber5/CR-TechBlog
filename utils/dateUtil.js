const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(date) {
    const newDate = date.split("-");
    console.log(newDate);
    let newDay = newDate[2].slice(0,1);
    // console.log(newDate[1] + "/" + newDay + "/" + newDate[0]);
    return months(newDate[1]-1) + " " + newDay + ", " + newDate[0];
}

module.exports = formatDate;

// formatDate("2022-08-30T03:16:01.000Z");
//2022-08-30T03:16:01.000Z,