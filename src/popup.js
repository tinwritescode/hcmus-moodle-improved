const username = $("#username");
const password = $("#password");
const autoLogin = $("#autoLogin");
const token = $("#token");
const loginButton = $(`[role="loginButton"]`);
const editableLog = $(`[role="editableLog"]`);

const STORAGE_SELECTOR = "[id]";
let debounceTimer;

document.addEventListener("change", saveOnChange);
document.addEventListener("input", saveOnChange);

function saveOnChange(e) {
  if (e.target.closest(STORAGE_SELECTOR)) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doSave, 100);
  }
}

function doSave() {
  console.log("Saved");
  chrome.storage.sync.set({ autoSave: collectData() });
}

function loadFromStorage() {
  chrome.storage.sync.get((data) => {
    if (data.autoSave) data = data.autoSave;
    for (const [id, value] of Object.entries(data)) {
      const el = document.getElementById(id);
      if (el) el[el.type === "checkbox" ? "checked" : "value"] = value;
    }
  });
}

loadFromStorage();

function doSave() {
  chrome.storage.sync.set(collectData());
}

function collectData() {
  const data = {};
  for (const el of document.querySelectorAll(STORAGE_SELECTOR))
    data[el.id] = el.type === "checkbox" ? el.checked : el.value;
  return data;
}

//
loginButton.click(onLoginButtonClick);

async function onLoginButtonClick() {
  // get token
  const res = await fetch(`https://courses.ctda.hcmus.edu.vn/login/token.php?username=${username.val()}&password=${password.val()}&service=moodle_mobile_app`)
  const data = await res.json()

  token.val(data.token)
  //append log to editable log
  appendToEditableLog(`Get token thành công: ${data.token}, token đã được lưu`)
  //tính năng lấy event ở trang fb đã hoạt động
  appendToEditableLog(`<strong>Tính năng lấy event ở trang fb đã hoạt động</strong>`)

  // alert(JSON.stringify(data))
}

//append to editableLog
function appendToEditableLog(text) {
  editableLog.append(`${new Date().toLocaleString()} - ${text} <br>`)
}