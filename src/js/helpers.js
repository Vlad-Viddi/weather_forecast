export const getCurrentDate = () => {
  const dateObj = new Date();
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = ["January", "Fabruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const weekDay = weekDays[dateObj.getDay()];
  const date = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const result = `${weekDay}, ${month} ${date}, ${year}`;

  return result;
}

export const alreadyHasCity = (favCities, city) => favCities.includes(city);
