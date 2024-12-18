export const convertFormat = (hours, minutes) => {
    // Convert hours and minutes to integers
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    // Convert the hour to 12-hour format
    hours = hours % 12 || 12; // Converts '0' or '12' to '12'
  
    // Format the hours and minutes with leading zeros if needed
    let formattedHours = hours < 10 ? '0' + hours : hours;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Return the formatted time
    return `${formattedHours}:${formattedMinutes}`;
  };
  
  export const calculateFajrAsr = (timeest) => {
    var time = timeest.split(' ')[0];
    var hour = Number(time.split(':')[0]);
    var hour2 = hour;
    var min = Number(time.split(':')[1]);
    var min2 = min;
    console.log(Number(hour));
    console.log(Number(min));
    var calculatetime = "";
    if (min2 >= 15) {
      min2 = min2 - 15;
      hour2 += 1;
    } else {
      min2 = min2 + 45;
    }
    calculatetime = convertFormat(hour2, min2);
    return calculatetime;
  };
  
  export const calculateIsha = (timeest) => {
    var time = timeest.split(' ')[0];
    var hour = Number(time.split(':')[0]);
    var hour2 = hour;
    var min = Number(time.split(':')[1]);
    var min2 = min;
    console.log(Number(hour));
    console.log(Number(min));
    var calculatetime = "";
    if (min2 >= 15) {
      min2 = min2 - 15;
      hour2 += 1;
    } else {
      min2 = min2 + 45;
    }
    calculatetime = convertFormat(hour2, min2);
    return calculatetime;
  };
  
  export const calculateZuhr = (timeest) => {
    var time = timeest.split(' ')[0];
    var hour = Number(time.split(':')[0]);
    var hour2 = hour;
    var min = Number(time.split(':')[1]);
    var min2 = min;
    console.log(Number(hour));
    console.log(Number(min));
    var calculatetime = "";
    if (min2 >= 15) {
      min2 = min2 - 15;
      hour2 += 1;
    } else {
      min2 = min2 + 45;
    }
    calculatetime = convertFormat(hour2, min2);
    return calculatetime;
  };
  
  export const calculateMaghrib = (timeest) => {
    var time = timeest.split(' ')[0];
    var hour = Number(time.split(':')[0]);
    var hour2 = hour;
    var min = Number(time.split(':')[1]);
    var min2 = min;
    console.log(Number(hour));
    console.log(Number(min));
    var calculatetime = "";
    if (min2 >= 15) {
      min2 = min2 - 15;
      hour2 += 1;
    } else {
      min2 = min2 + 45;
    }
    calculatetime = convertFormat(hour2, min2);
    return calculatetime;
  };