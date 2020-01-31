export const GeoLocation = () => {
  return new Promise((res, rej) => {
    let timer = setTimeout(function() {
      return rej("GeoLocation Time Out");
    }, 10000);
    navigator.geolocation.getCurrentPosition(pos => {
      clearTimeout(timer);
      return res({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  });
};

export const unixTimeConverter = timestamp => {
  const addZeroToSingleDigits = unit => (unit < 10 ? 0 : "");
  let a = new Date(timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  //
  return ` ${date} / ${month} / ${year}  at  ${addZeroToSingleDigits(
    hour
  )}${hour}:${addZeroToSingleDigits(min)}${min}:${addZeroToSingleDigits(
    sec
  )}${sec}`;
};

export const callSpaceStationApi = (lat, lng) => {
  return new Promise((res, rej) => {
    fetch(
      `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lng}&alt=20&n=3`
    )
      .then(r => r.json())
      .then(data => {
        // data.response is a succesful result array , data.reason is a string literal explaining why the request was unsuccesful.
        return res(data.response || data.reason || "Unknown Error");
      })
      .catch(() => rej("Network Request Failed"));
  });
};
