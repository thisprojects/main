export const key = "Obscured";

export const GeoLocation = () => {
  return new Promise((res, rej) => {
    let timer = setTimeout(function() {
      return rej("GeoLocation Time Out");
    }, 10000);
    navigator.geolocation.getCurrentPosition(pos => {
      clearTimeout(timer);
      res({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  });
};

export const unixTimeConverter = timestamp => {
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
  return ` ${date} / ${month} / ${year}  at  ${hour}:${min}:${sec}`;
};

export const locationApiCall = selector => {
  let location = document.querySelector(selector).value;
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
  )
    .then(r => r.json())
    .then(r => r.results[0].geometry.location)
    .catch(e => {
      console.log("Location API Error - Invalid Location ----->", e);
      return "Location Error - Location is invalid.";
    });
};

export const callSpaceStationApi = (lat, lng) => {
  return new Promise((res, rej) => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lng}&alt=20&n=3`
    )
      .then(r => r.json())
      .then(data => {
        // data.response is a succesful result array , data.reason is a string literal explaining why the request was unsuccesful.
        return res(data.response || data.reason || "Unknown Error");
      })
      .catch(() => rej("Network Request Failed"));
  });
};

export const getResults = source => {
  return new Promise((res, rej) => {
    if (source === "api") {
      return res(locationApiCall("#location-input"));
    } else if (source === "geo") {
      return res(GeoLocation());
    }
  });
};
