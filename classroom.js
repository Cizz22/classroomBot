const puppeteer = require("puppeteer");

const BASE_URL = "https://presensi.its.ac.id";

const classroom = {
  browser: null,
  page: null,
  cookie: [],
  data: null,
  list:[],

  initialize: async () => {
    classroom.browser = await puppeteer.launch({
      headless: false,
    });

    classroom.page = await classroom.browser.newPage();
  },

  login: async (username, password) => {
    await classroom.initialize();
    await classroom.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    await classroom.page.type("input[id=username]", username, { delay: 500 });

    let nextButton = await classroom.page.$x(
      "//button[contains(text(), 'Next')]"
    );
    await nextButton[0].click();
    await classroom.page.type("input[id=password]", password, { delay: 500 });

    let signinButton = await classroom.page.$x(
      "//button[contains(text(), 'Sign in')]"
    );

    await signinButton[0].click();
    await classroom.page.waitForNavigation({ waitUntil: "networkidle2" });
    classroom.cookie = await classroom.page.cookies();
    return await classroom.browser.close();
  },
  
  listMatkul: async () => {
    await classroom.initialize();
    await classroom.page.setCookie(...classroom.cookie);
    await classroom.page.goto(`${BASE_URL}/dashboard`, {
      waitUntil: "networkidle2",
    });

    await classroom.page.waitForTimeout(2000);

    classroom.list = await classroom.page.evaluate(() => {
      let listMatkul = [];
      const matkul = document.querySelectorAll("li");
      matkul.forEach((list) => {
        const matkul = list.firstElementChild.innerText.split("\n")
        listMatkul.push(matkul[0]);
      });
      return listMatkul;
    });
    console.log(classroom.list)
    await classroom.browser.close();
  },
};

module.exports = classroom;
