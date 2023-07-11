const time = document.querySelectorAll(".time");
const batery = document.querySelectorAll(".battery__level");
const date = new Date();
const calendarDay = document.querySelector(".phone__content-big-calendar h5");
const calendarDate = document.querySelector(".phone__content-big-calendar h1");
const mainDate = document.querySelector(".phone__locked-main-date p");
const mainTime = document.querySelector(".phone__locked-main-date h1");
const openCamBtn = document.querySelector(".openCam");
const webCamEl = document.getElementById("cameraVideo");
const canvasEl = document.getElementById("camCanvas");
const webCam = new Webcam(webCamEl, "user", canvasEl);
const snapAudio = new Audio("./audio/COMCell_Iphone camera (ID 0448)_BSB.wav");
const lockAudio = new Audio("./audio/iPhone lock _ unlock (E863C26-MSB).mp3");
var detectSecond = 0;
var alarms = JSON.parse(localStorage.getItem("alarms")) || [];
const calcButons = document.querySelectorAll(
  ".phone__calculator-content-buttons button"
);
const passDots = document.querySelectorAll(
  ".phone__locked-password-top-dots-dot"
);
calcButons.forEach((calcBtn) =>
  calcBtn.addEventListener("click", () => {
    keyPressAudio.play();
  })
);
const keyPressAudio = new Audio(
  "./audio/iPhone Keyboard Typing Sound (mp3cut.net) (1).mp3"
);
var detectCameraPrev = "";
var password = "";
const week = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "SATURDAY",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];
const checkHour = (tm) => {
  if (tm < 10) {
    return "0" + tm;
  } else {
    return tm;
  }
};
navigator.geolocation.getCurrentPosition(pos => {
    let city;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
    .then(res => res.json())
    .then(data => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.address.city}?unitGroup=metric&key=YLDFDEM28Y6J63SSMR7LAFBHU&contentType=json`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".weather-cityName").innerHTML = `${data.address}`
            document.querySelector(".weather-max").innerHTML = `H:${data.days[0].tempmax.toPrecision(2)}&deg`
            document.querySelector(".weather-min").innerHTML = `L:${data.days[0].tempmin.toPrecision(2)}&deg`
            document.querySelector(".weather-condition").innerHTML = `${data.days[0].conditions}`
            document.querySelector(".weather-gradus").innerHTML = `${data.days[0].temp.toPrecision(2)}&deg`
        })
    })
})
if(navigator.onLine){
    document.querySelectorAll('.fa-wifi-slash').forEach(sg => {
        sg.classList.add('fa-wifi')
    })
    document.querySelectorAll('.fa-wifi').forEach(sg => {
        sg.classList.remove('fa-wifi-slash')
    })
} else {
    document.querySelectorAll('.fa-wifi-slash').forEach(sg => {
        sg.classList.add('fa-wifi-slash')
    })
    document.querySelectorAll('.fa-wifi').forEach(sg => {
        sg.classList.remove('fa-wifi')
    }) 
}
const addPassword = (num) => {
  passDots.forEach((pdt) => {
    pdt.style.borderColor = "white";
  });
  keyPressAudio.play();
  password += num;
  passDots[password.length - 1].style.backgroundColor = "white";
  if (password.length == 4 && password == "0000") {
    document.querySelector(".phone__locked").style.display = "none";
    document.querySelector(".phone__wrapper").style.display = "flex";
    lockAudio.play();
  } else if (password.length == 4 && password != "0000") {
    passDots.forEach((pdt) => {
      pdt.style.backgroundColor = "transparent";
      pdt.style.borderColor = "red";
      password = "";
    });
  }
};
setInterval(() => {
    alarms.forEach(alarm => {
        if(date.toLocaleTimeString('it-IT').slice(0, 5) == `${alarm.soat}:${alarm.minut}`){
            // console.log(alarm.music.slice(5))
            new Audio(alarm.music.slice(5)).play()
            // alarmAudio.autoplay = true;
            // alarmAudio.muted = true;
            // alarmAudio.play()
            alarms.splice((alarms.indexOf(alarm)), 1);
            localStorage.setItem("alarms", JSON.stringify(alarms))
        }
    })
}, 1000)
var audioo = '';
document.getElementById("alarmMusic").addEventListener("change", e => {
    audioo = URL.createObjectURL(e.target.files[0]);
    document.getElementById('musicName').innerHTML = e.target.files[0].name.slice(0, 15) + '... >'
})
document.querySelector(".addAlarm-btn").addEventListener("click", () => {
    if(document.getElementById('alarmSoat').value >= 24 || document.getElementById('alarmMinut').value > 60 ){
        alert('Mavjud vaqt kiriting')
        return;
    }
    alarms.push({
        soat: document.getElementById('alarmSoat').value,
        minut: document.getElementById('alarmMinut').value,
        music: audioo
    })
    localStorage.setItem("alarms", JSON.stringify(alarms))
})

document.querySelector(".capture").addEventListener("click", () => {
  snapAudio.play();
  document.querySelector(".capture").href = webCam.snap();
});
document.querySelector(".capture").addEventListener("touchmove", () => {
  snapAudio.play();
  document.querySelector(".capture").href = webCam.snap();
});
var startingX, startingY, movingX, movingY;
document
  .querySelector(".phone__camera-canvas")
  .addEventListener("touchstart", (e) => {
    startingX = e.touches[0].clientX;
    startingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__camera-canvas")
  .addEventListener("touchmove", (e) => {
    movingX = e.touches[0].clientX;
    movingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__camera-canvas")
  .addEventListener("touchend", (e) => {
    if (startingX + 200 < movingX) {
    } else if (startingX - 200 > movingX) {
    }
    if (startingY + 200 < movingY) {
    } else if (startingY - 100 > movingY) {
        document.querySelector(".phone__camera").style.display = "none";
        document.querySelector(`.phone__${detectCameraPrev}`).style.display =
          "flex";
        webCam.stop();
    }
  });

document
  .querySelector(".phone__locked-main")
  .addEventListener("touchstart", (e) => {
    startingX = e.touches[0].clientX;
    startingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__locked-main")
  .addEventListener("touchmove", (e) => {
    movingX = e.touches[0].clientX;
    movingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__locked-main")
  .addEventListener("touchend", (e) => {
    if (startingX + 200 < movingX) {
    } else if (startingX - 200 > movingX) {
    }
    if (startingY + 200 < movingY) {
    } else if (startingY - 200 > movingY) {
    if(startingY + 300 > movingY){
        document.querySelector(".phone__locked-main").style.display = "none";
        document.querySelector(".phone__locked-password").style.display = "flex";
    }
    }
  });

document.querySelector(".phone__locked").addEventListener("touchstart", (e) => {
  startingX = e.touches[0].clientX;
  startingY = e.touches[0].clientY;
});
document.querySelector(".phone__locked").addEventListener("touchmove", (e) => {
  movingX = e.touches[0].clientX;
  movingY = e.touches[0].clientY;
});
document.querySelector(".phone__locked").addEventListener("touchend", (e) => {
  if (startingX + 200 < movingX) {
  } else if (startingX - 200 > movingX) {
    detectCameraPrev = "locked";
    if(startingY + 300 > movingY){
            document.querySelector(".phone__locked").style.display = "none";
    document.querySelector(".phone__camera").style.display = "flex";
    }
    webCam.start();
  }
  if (startingY + 200 < movingY) {
  } else if (startingY - 200 > movingY) {
  }
});
document
  .querySelector(".phone__telephone")
  .addEventListener("touchstart", (e) => {
    startingX = e.touches[0].clientX;
    startingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__telephone")
  .addEventListener("touchmove", (e) => {
    movingX = e.touches[0].clientX;
    movingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__telephone")
  .addEventListener("touchend", (e) => {
    if (startingX + 700 < movingX) {
    } else if (startingX - 200 > movingX) {
    }
    if (startingY + 200 < movingY) {
    } else if (startingY - 200 > movingY) {
        if(startingY + 500 > movingY){
            document.querySelector(".phone__telephone").style.display = "none";
            document.querySelector(".phone__wrapper").style.display = "flex";
        }
        movingY = 5000000;
    }
  });
document
  .querySelector(".phone__calculator")
  .addEventListener("touchstart", (e) => {
    startingX = e.touches[0].clientX;
    startingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__calculator")
  .addEventListener("touchmove", (e) => {
    movingX = e.touches[0].clientX;
    movingY = e.touches[0].clientY;
  });
document
  .querySelector(".phone__calculator")
  .addEventListener("touchend", (e) => {
    if (startingX + 700 < movingX) {
    } else if (startingX + 100 > movingX) {
    }
    if (startingY + 200 < movingY) {
    } else if (startingY - 200 > movingY) {
        if(startingY + 300 > movingY){
            document.querySelector(".phone__calculator").style.display = "none";
            document.querySelector(".phone__wrapper").style.display = "flex";
        }
    }
  });
mainTime.textContent = `${checkHour(date.getHours())}:${checkHour(
  date.getMinutes()
)}`;
mainDate.textContent = `${week[date.getDay()]}, ${
  month[date.getMonth()]
} ${date.getDate()}`;
time.forEach(
  (tm) =>
    (tm.innerHTML = `<p>${checkHour(date.getHours())}:${checkHour(
      date.getMinutes()
    )}</p>`)
);
  navigator.getBattery().then((battery) => {
    batery.forEach(
      (bt) =>
        (bt.innerHTML = `${
          battery.level * 100 < 10
            ? (battery.level * 100).toPrecision(1)
            : (battery.level * 100).toPrecision(2)
        }`)
    );
  });
calendarDay.textContent = week[date.getDay()];
calendarDate.textContent = date.getDate();
openCamBtn.addEventListener("click", () => {
  detectCameraPrev = "wrapper";
  document.querySelector(".phone__wrapper").style.display = "none";
  document.querySelector(".phone__camera").style.display = "flex";
  webCam.start();
});
function openApp(app) {
  document.querySelector(".phone__wrapper").style.display = "none";
  document.querySelector(`.phone__${app}`).style.display = "flex";
  if (app == "camera") {
    webCam.start();
  }
  detectCameraPrev = "wrapper";
}
