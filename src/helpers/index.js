import dayjs from 'dayjs'
export const getInitials = (name) => {
    const initials = name
    .match(/\b\w/g) // Match word boundary followed by a single word character
    .join('') // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials.substring(0, 2); // Take the first two characters as initials
}

export const weekdays = () => {
    let s = dayjs().startOf('week')
    let e = dayjs().endOf('week')
    let days = []
    // for (var d = dayjs(s); d.isBefore(dayjs(e)); d.add(1, 'day')) {
    //     days.push({ id: d.format('d'), value: d.format('DD') });
    // }
    console.log('s', s)
    console.log('e', e)
    return days;    

}
export * from './showToast'
export * from './getAuthToken'
export * from './setAuthToken'