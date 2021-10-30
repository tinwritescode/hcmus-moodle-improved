const username = $("#username");
const password = $("#password");
const autoLogin = $("#autoLogin");

$(function () {
  // check if chrome storage have username and password
  chrome.storage.sync.get(
    ["username", "password", "autoLogin"],
    function (result) {
      if (result.username && result.password) {
        username.val(result.username);
        password.val(result.password);
        autoLogin.prop("checked", true);
      }

      autoLogin.prop("checked", result.autoLogin);
    }
  );
});

username.change(() => {
  console.log("Username changed", username.val());

  setAlert(`Đã lưu username: ${username.val()}`);

  // save user name to chrome storage
  chrome.storage.sync.set({ username: username.val() }, () => {
    console.log("Username saved");
  });
});

password.change(() => {
  console.log("Password changed", password.val());

  setAlert(`Đã lưu password`);

  // save password to chrome storage
  chrome.storage.sync.set({ password: password.val() }, () => {
    console.log("Password saved");
  });
});

autoLogin.change(() => {
  console.log("Auto login changed", autoLogin.is(":checked"));

  setAlert(`Đã lưu tùy chọn auto login: ${autoLogin.is(":checked")}`);

  // save auto login to chrome storage
  chrome.storage.sync.set({ autoLogin: autoLogin.is(":checked") }, () => {
    console.log("Auto login saved");
  });
});

// helper functions
function setAlert(text) {
  $("#alert").remove();
  console.log("alert", alert);
  $("body").prepend(
    `<div id="alert" class="p-2 bg-green-400 text-white rounded shadow my-2">${text}</div>`
  );

  // set alert text to "" after 3 seconds
  setTimeout(() => {
    $("#alert").remove();
  }, 3000);

  // jquery remove from dom
}
