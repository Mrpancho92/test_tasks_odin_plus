window.addEventListener("DOMContentLoaded", () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1";

  async function request(url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      console.log("error");
      throw e;
    }
  }
  request(url).then((data) => table(data));

  function table(data) {
    const propertyList = ["id", "symbol", "name"];
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    table.appendChild(thead).appendChild(tr);
    propertyList.forEach((propertyName) => {
      let foodProperty = document.createElement("th");
      foodProperty.setAttribute("id", propertyName);
      tr.appendChild(foodProperty).textContent = propertyName;
    });
    table.appendChild(tbody);
    let count = 0;
    data.forEach((item) => {
      let tr = document.createElement("tr");
      tbody.appendChild(tr);
      for (key in item) {
        if (key === "id") {
          let foodProperty = document.createElement("td");
          foodProperty.setAttribute("id", "1");
          tr.appendChild(foodProperty).textContent = item[key];
        }
        if (key === "symbol") {
          let foodProperty = document.createElement("td");
          foodProperty.setAttribute("id", "2");
          if (item[key] === "usdt" && count < 5) {
            foodProperty.style.backgroundColor = "green";
          } else if (count < 5) {
            foodProperty.style.backgroundColor = "blue";
          }
          tr.appendChild(foodProperty).textContent = item[key];
          count++;
        }
        if (key === "name") {
          let foodProperty = document.createElement("td");
          foodProperty.setAttribute("id", "3");
          tr.appendChild(foodProperty).textContent = item[key];
        }
      }
    });
    tbody.childNodes.forEach((item) => {
      [...item.childNodes].sort((a, b) => (a.id > b.id ? 1 : -1)).forEach((node) => item.appendChild(node));
    });
    document.body.appendChild(table);
  }
});
