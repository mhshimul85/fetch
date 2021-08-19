"use strict";

const CROSSURL = "https://peaceful-mountain-17529.herokuapp.com/";

const fetchDataFromUrl = async (uri, selector) => {
  let endPoint = CROSSURL + "?url=" + uri;
  let response = await fetch(endPoint).then(response => response.text());
  let documentObject = await new DOMParser().parseFromString(
    response,
    "text/html"
  );
  let node = await [...documentObject.querySelectorAll(selector)];
  return node;
};

//Dhaka Stock Exchage Total Data Table
async function dse_all() {
  let tr = await fetchDataFromUrl(
    "https://www.dsebd.org/latest_share_price_scroll_by_value.php",
    ".shares-table > tbody"
  );

  let data = [];
  if (tr.length > 0) {
    for (let i = 0; i <= tr.length - 1; i++) {
      let td = tr[i].querySelectorAll("td");
      
      let obj = {
        no: Number(td[0].innerText.replaceAll(/,/g,'')),
        tradingCode: td[1].innerText.replaceAll(/\s/g,''),
        ltp: Number(td[2].innerText.replaceAll(/,/g,'')),
        high: Number(td[3].innerText.replaceAll(/,/g,'')),
        low: Number(td[4].innerText.replaceAll(/,/g,'')),
        closep: Number(td[5].innerText.replaceAll(/,/g,'')),
        ycp: Number(td[6].innerText.replaceAll(/,/g,'')),
        change: Number(td[7].innerText.replaceAll(/,/g,'')),
        trade: Number(td[8].innerText.replaceAll(/,/g,'')),
        value: Number(td[9].innerText.replaceAll(/,/g,'')),
        volume: Number(td[10].innerText.replaceAll(/,/g,''))
      };
      data.push(obj);
    }
  } else {
    console.error(
      "something wrong!"
    );
  }
  // console.log(data)
  // return data;

  $(function(){
    
    if(data.length > 0){
      for(let i = 0; i <= data.length - 1; i++){
        $('.dse > table').append(`<tr> <td>${data[i].no}</td><td>${data[i].tradingCode}</td><td>${data[i].ltp}</td><td>${data[i].high}</td><td>${data[i].low}</td><td>${data[i].closep}</td><td>${data[i].ycp}</td><td>${(Number(data[i].closep) - Number(data[i].ycp)).toFixed(2)}</td><td>${data[i].trade}</td><td>${data[i].value}</td><td>${data[i].volume}</td></tr>`);
      }
    }
    
  })

}

dse_all();