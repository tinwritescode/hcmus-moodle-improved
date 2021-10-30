// autoLogin option must be enable
chrome.storage.sync.get(["autoLogin"], function (data) {
  if (!data.autoLogin) {
    notify(
      `Auto login đang tắt, bạn click vào icon trên extension bar để thiết lập nhé.`
    );
    return;
  }

  // check if chrome storage have username and password value
  chrome.storage.sync.get(["username", "password"], function (data) {
    console.log(data);

    // Login failed, username or password is not valid
    if (
      $(".alert.alert-danger").length > 0 ||
      $("#username")[0].value?.length == 0
    ) {
      notify(
        "Thông tin hiện tại không đúng, click vào popup để set thông tin đăng nhập của bạn!"
      );
      removeLoginData();
      return;
    }

    // append to body

    notify("Tự động đăng nhập sau 2s!");
    // Notify and remove after 2s
    setTimeout(function () {
      if (data.username && data.password) {
        $("#username")[0].value = data.username;
        $("#password")[0].value = data.password;
        $("#login")[0].submit(); // loginForm
      }
    }, 2000);
  });
});

function notify(message) {
  $("body")
    .append(`<div id="shortnotify" style="position: fixed; font-weight: bold; padding: 0.5rem; z-index: 9999; font-size: 1rem; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; top: 1rem; right: 1rem; background-color: white; border-radius: 1rem">
    <h4>Bạn đang dùng HCMUS Moodle Improved</h4>
    ${message}
  </div>`);

  // Notify and auto remove
  setTimeout(function () {
    $("#shortNotify").remove();
  }, 1000);
}

function removeLoginData() {
  // remove username and password key from chrome storage
  chrome.storage.sync.remove(["username", "password"], function () {
    console.log("username and password removed");
  });
}
