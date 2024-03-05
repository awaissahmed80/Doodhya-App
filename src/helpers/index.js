import dayjs from 'dayjs'
var isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

export const getInitials = (name) => {
    const initials = name
    .match(/\b\w/g) // Match word boundary followed by a single word character
    .join('') // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials.substring(0, 2); // Take the first two characters as initials
}

export const  getColor = (str) =>  {
    // Generate a hash code from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate color hex code
    let color = '#';
    for (let j = 0; j < 3; j++) {
        const value = (hash >> (j * 8)) & 0xFF;
        const hexComponent = ('00' + value.toString(16)).slice(-2);
        color += hexComponent;
    }

    return color;
}

export const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}

export const weekdays = () => {
    let s = dayjs().isoWeekday(1)    
    let days = []
    for(let i = 0; i<7; i++){        
        days.push(s.add(i, 'day'))        
    }
    
    return days;    
}

export const addOrRemove = (array, value) => {
    if(array && value){
        var index = array.indexOf(value);
        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }
    return array;
}

export const moneyFormat = (number, format=false, token="Rs.", code="PKR") => {
    let value = parseFloat(number)
    if(!format)
        return token+(value).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    else
        return code + " "+(value).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export * from './showToast'
export * from './getAuthToken'
export * from './setAuthToken'