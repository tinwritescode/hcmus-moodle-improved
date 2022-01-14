let data = []
let token = null
let moodleLink = null

chrome.storage.sync.get(["token", "moodleLink"], function (data) {
  console.log("data", data)
  token = data.token;
  moodleLink = data.moodleLink;

  if(token == null || moodleLink == null) {
    return
  }

  class Moodle {
    static async getEvents() {   
      const res = await fetch(`https://fervent-albattani-056c21.netlify.app/.netlify/functions/server/get-events/?wwwroot=${moodleLink}&token=${token}`)
    
      const data = await res.json()

      return data
    }
  }

  async function updateDialog() {
    const dialog = document.querySelector(`[role="moodle-dialog"]`)

    console.log(data)
    if(!dialog || !data || data?.length == 0) return

    const items = data.map((item) => {
      return `
      <div class="moodle-dialog-item" style="border-bottom: 1px #ccc solid; padding: .25rem; font-size: 1.1rem; width: 100%;">
        <a href="${item.url}" target="_blank" style="">
          <div class="moodle-dialog-item-title" style="grid-column: span 4 / span 4;"><span style="color:white!important">${item.name}</span></div>
          <div class="moodle-dialog-item-date" style="grid-column: span 1 / span 1;"><span style="color:white!important">${item.formattedtime}</span></div>
        </a>
      </div>
      `
    })

    dialog.innerHTML = `
    <div style="border-radius: 1rem; background: black; color:white; max-width: 100%; min-width: 12rem; min-height: 14rem; max-height:100%; padding: 0.5rem; animation: fadeIn 0.4s ease; display: flex; flex-direction: column; justify-content: space-between;">
      <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
        <h2 style="text-align: center; color: white; font-weight: bold; font-size: 1.3rem">Moodle Events</h2>
        ${items.join("")}
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
        <span>Bây giờ là: ${new Date().toLocaleString()}</span>
        <p>Made by <a href="https://fb.com/npmrunstart" title="fb của Tín">Tín</a>, mình minh bạch tài khoản facebook chính chủ, đảm bảo không lấy cắp thông tin gì của bạn. </p>

      </div>
    </div>
    `;
  }
  async function createDialog(relativeElement) {
    const dialog = document.createElement("div")
    dialog.setAttribute("role", "moodle-dialog") 
    dialog.setAttribute("aria-label", "Moodle Dialog")
    dialog.setAttribute("aria-modal", "true")
    dialog.style.position = "absolute"
    dialog.style.top = "3.25rem"
    dialog.style.left = "-5rem"
    dialog.style.right = "0"
    
    dialog.innerHTML = `
    <div style="border-radius: 1rem; background: black; color:white; height: 10rem; max-height:100%; padding: 0.5rem; animation: fadeIn 0.4s ease">
      <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; color: white;">
        Loading...
      </div>
    </div>
    `;

    //create style
    const style = document.createElement("style")
    style.innerHTML = `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    `;

    document.head.appendChild(style)


    relativeElement.appendChild(dialog)

    updateDialog()
  }


  //Load data
  const loadData = () => Moodle.getEvents().then(function(res) {
    data = res.events;

    //TODO: handle data not valid, mean wrong user password

    // console.log(data)
    updateDialog()
  });

  setInterval(() => loadData(), 1000 * 60)
  loadData()
    

  setTimeout(async function() {
    const target = document.querySelectorAll(`[role="navigation"]`)[1]

    // get 2nd element
    const element = target.children[1]

    //clone it
    const clone = element.cloneNode(true)

    //append it
    target.appendChild(clone)

    //get svg and replace it
    const svg = clone.querySelector("svg")
    const newSvg = svg.cloneNode(true)
    newSvg.setAttribute("viewBox", "1 8 20 10")
    newSvg.innerHTML = `
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    `

    //get a tag
    const link = clone.querySelector(`[role="link"]`)
    link.setAttribute("href", "#");

    console.log(link)

    //on link click
    link.addEventListener("click", function(e) {
      e.preventDefault()
      console.log("clicked")

      new Promise(function(resolve, reject) {
        updateDialog()
        resolve()
      });

      // toggle display none
      const dialog = document.querySelector(`[role="moodle-dialog"`);
      if (dialog.style.display === "none") {
        dialog.style.display = "block";
      } else {
        dialog.style.display = "none";
      }
      
      //open new tab
    });
    
    //replace svg with the clone
    svg.parentNode.replaceChild(newSvg, svg)

    //Dialog
    createDialog(clone)
  }, 2500);
})
