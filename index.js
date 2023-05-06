$(function () {
  var gmt = 99;

  $(".change li:nth-child(1)").addClass("selected");
  $(".change li").click(function () {
    gmt = $(this).attr("role");
    $(".change li").removeClass("selected");
    $(this).addClass("selected");
  });
  setInterval(function () {
    var rotate_angle = -15;
    var rotate_angle2 = -165;

    change_hour = formatHour() * 30 + rotate_angle;
    change_hour2 = formatHour() * 30 + rotate_angle2;
    var rotate_hour = "rotate(" + change_hour + "deg)";
    var rotate_hour2 = "rotate(" + change_hour2 + "deg)";
    $(".hours_capsule").css({ transform: rotate_hour });
    $(".hours_capsule.fill").css({ transform: rotate_hour2 });

    change_minute = formatMinute() * 30 + rotate_angle;
    change_minute2 = formatMinute() * 30 + rotate_angle2;
    var rotate_minute = "rotate(" + change_minute + "deg)";
    var rotate_minute2 = "rotate(" + change_minute2 + "deg)";
    $(".minutes_capsule").css({ transform: rotate_minute });
    $(".minutes_capsule.fill").css({ transform: rotate_minute2 });
  }, 1000);

  /**function changeTimeZone(offset) {
    d = new Date();
    const rabatOffset = 0; // Rabat's time offset from UTC
    const diff = offset - rabatOffset;
    const utc2 = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd2 = new Date(utc2 + 3600000 * diff);
    const hours = nd2.getHours();
    const minutes = nd2.getMinutes();
    const sign = diff >= 0 ? "+" : "-";
    if (diff === 0) {
      diffStr = "00:00";
    }
    diffStr = `${sign}${Math.abs(diff)}:00`;
    $("#time-diff").text(diffStr);
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
    nd = new Date(utc + 3600000 * offset).getHours();
    return nd.toLocaleString();
  }**/
  function changeTimeZone(offset) {
    const d = new Date();
    const rabatOffset = 0; // Rabat's time offset from UTC
    const diff = offset - rabatOffset;
    const utc2 = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd2 = new Date(utc2 + 3600000 * diff);
    const sign = diff >= 0 ? "+" : "-";
    let diffStr;
    if (diff === 0) {
      diffStr = "00:00";
    } else {
      diffStr = `${sign}${Math.abs(diff)}:00`;
    }
    $("#time-diff").text(diffStr);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const nd = new Date(utc + 3600000 * offset).getHours();
    return nd.toLocaleString();
  }

  function formatHour() {
    if (gmt == 99) var hours = new Date().getHours();
    else var hours = changeTimeZone(gmt);

    changeDayLight(hours);

    var hour = hours;
    if (hour >= 12) {
      hour = hours - 12;
    }
    return hour;
  }

  function formatM(s) {
    return Math.floor(s / 5);
  }
  function formatMinute() {
    return formatM(new Date().getMinutes());
  }

  function changeDayLight(hours) {
    if (hours < 7 || hours >= 19) {
      $("#maskwatch").css("background-color", "#000");
      $(".container").removeClass("day").addClass("night");
      $(".day_icon").hide();
      $(".night_icon").fadeIn(300);
    } else {
      $("#maskwatch").css("background-color", "transparent");
      $(".container").removeClass("night").addClass("day");
      $(".night_icon").hide();
      $(".day_icon").fadeIn(300);
    }
  }
});
