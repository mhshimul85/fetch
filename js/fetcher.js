"use strict";

let ltp_min, ltp_max, change_min, change_max, volume_min, volume_max;
const CROSSURL = "https://peaceful-mountain-17529.herokuapp.com/";

function data_input(){
  ltp_min     = $('.ltp_min').val() * 1;
  ltp_max     = $('.ltp_max').val() * 1;
  change_min  = $('.change_min').val() * 1;
  change_max  = $('.change_max').val() * 1;
  volume_min  = $('.volume_min').val() * 1;
  volume_max  = $('.volume_max').val() * 1;
  
}

function row_color_by_change(input_value){

  if(input_value > 0){
    return 'green'
  }else if(input_value < 0){
    return 'red'
  }else if(input_value == 0){
    return 'blue'
  }

}

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
let data = [];

async function dse_all() {
  
  let tr = await fetchDataFromUrl(
    "https://www.dsebd.org/latest_share_price_scroll_by_value.php",
    ".shares-table > tbody"
  );

  // let tr = await fetchDataFromUrl(
  //   "https://dsebd.org/day_end_archive.php?startDate=2021-08-23&endDate=2021-08-23&inst=All%20Instrument&archive=data",
  //   ".shares-table > tbody"
  // );

    // let tr = await fetchDataFromUrl(
    //   "https://investing.com/equities/first-janata-bank-fund-technical",
    //   // "#techinalContent > .float_lang_base_1 > .technicalIndicatorsTbl > tbody"
    //   ".genTbl .closedTbl .technicalIndicatorsTbl .smallTbl .float_lang_base_1 > tbody"
    // );

    // console.log(tr);
  // let data = [];
  if (tr.length > 0) {
    for (let i = 0; i <= tr.length - 1; i++) {
      let td = tr[i].querySelectorAll("td");
      
      // let obj = {
      //   indicator: td[0].innerText.replaceAll(/\s/g,''),
      //   value: Number(td[1].innerText.replaceAll(/,/g,''))
      // }

      let obj = {
        no: Number(td[0].innerText.replaceAll(/,/g,'')),
        tradingCode: td[1].innerText.replaceAll(/\s/g,''),
        ltp: Number(td[2].innerText.replaceAll(/,/g,'')),
        high: Number(td[3].innerText.replaceAll(/,/g,'')),
        low: Number(td[4].innerText.replaceAll(/,/g,'')),
        closep: Number(td[5].innerText.replaceAll(/,/g,'')),
        ycp: Number(td[6].innerText.replaceAll(/,/g,'')),
        change: Number(td[7].innerText.replaceAll(/,/g,'')),
        changeInPercentage: Number(((Number(td[7].innerText.replaceAll(/,/g,'')) * 100) / Number(td[6].innerText.replaceAll(/,/g,''))).toFixed(2)),
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
        $('.dse > table').append(`<tr style="color: ${row_color_by_change(data[i].change)}"> <td>${data[i].no}</td><td>${data[i].tradingCode}</td><td>${data[i].ltp}</td><td>${data[i].high}</td><td>${data[i].low}</td><td>${data[i].closep}</td><td>${data[i].ycp}</td><td>${data[i].change}</td><td>${data[i].changeInPercentage}%</td><td>${data[i].trade}</td><td>${data[i].value}</td><td>${data[i].volume}</td> </tr>`);
      }
    }

    $('.filter_results').click(function(){
      data_input();
    
      if(data.length > 0){
        $('.dse > table').html(`
            <tr>
            <th>NO</th>
            <th>TRADING CODE</th>
            <th>LTP</th>
            <th>HIGH</th>
            <th>LOW</th>
            <th>CLOSEP</th>
            <th>YCP</th>
            <th>CHANGE</th>
            <th>CHANGE(%)</th>
            <th>TRADE</th>
            <th>VALUE(mn)</th>
            <th>VOLUME</th>
            </tr>`)
        for(let i = 0; i <= data.length - 1; i++){
          if(data[i].ltp > ltp_min && data[i].ltp < ltp_max && data[i].changeInPercentage > change_min && data[i].changeInPercentage < change_max && data[i].volume > volume_min && data[i].volume < volume_max){
            
            $('.dse > table').append(`<tr style="color: ${row_color_by_change(data[i].change)}"> <td>${data[i].no}</td><td>${data[i].tradingCode}</td><td>${data[i].ltp}</td><td>${data[i].high}</td><td>${data[i].low}</td><td>${data[i].closep}</td><td>${data[i].ycp}</td><td>${data[i].change}</td><td>${data[i].changeInPercentage}%</td><td>${data[i].trade}</td><td>${data[i].value}</td><td>${data[i].volume}</td> </tr>`);
          }
        }
      }
    })
    
  })

}

dse_all();

// console.log(data)

// $(function(){

  // $('.filter_results').click(function(){
  //   data_input();
  
  //   if(data.length > 0){
  //     for(let i = 0; i <= data.length - 1; i++){
  //       if(data[i].ltp > ltp_min && data[i].ltp < ltp_max && data[i].changeInPercentage > change_min && data[i].changeInPercentage < change_max && data[i].volume > volume_min && data[i].volume < volume_max){
  //         $('.dse > table').html(`<tr style="color: ${row_color_by_change(data[i].change)}"> <td>${data[i].no}</td><td>${data[i].tradingCode}</td><td>${data[i].ltp}</td><td>${data[i].high}</td><td>${data[i].low}</td><td>${data[i].closep}</td><td>${data[i].ycp}</td><td>${data[i].change}</td><td>${data[i].changeInPercentage}%</td><td>${data[i].trade}</td><td>${data[i].value}</td><td>${data[i].volume}</td> </tr>`);
  //       }
  //     }
  //   }
  // })

// })


function ema(previous_ema, ltp, period){
  return (ltp * (2 / (period + 1))) + (previous_ema * (1 - (2 / (period + 1))));
}

function macd(ema_12, ema_26, previous_signal, previous_histogram){
  let direction;
  let macd      = ema_12 - ema_26;
  let signal    = ema(previous_signal, macd, 9);
  let histogram = macd - signal;

  if(histogram > previous_histogram){
    direction = 'up'
  }else if(histogram < previous_histogram){
    direction = 'down'
  }else if(histogram === previous_histogram){
    direction = 'nutral'
  }

  return {
    macd      : macd,
    signal    : signal,
    histogram : histogram,
    direction : direction
  }
}

function rsi(gain_or_loss, previous_gain_ema, previous_loss_ema, previous_rsi){
  let gain_ema, loss_ema, rs, rsi, direction, period = 14;

  if(gain_or_loss > 0){
    gain_ema = ema(previous_gain_ema, Math.abs(gain_or_loss), period);
    loss_ema = ema(previous_loss_ema, 0, period);
  }else if(gain_or_loss < 0){
    gain_ema = ema(previous_gain_ema, 0, period);
    loss_ema = ema(previous_loss_ema, Math.abs(gain_or_loss), period)
  }else if(gain_or_loss === 0){
    gain_ema = ema(previous_gain_ema, 0, period);
    loss_ema = ema(previous_loss_ema, 0, period);
  }

  rs  = gain_ema / loss_ema;
  rsi = 100 - (100 / (1 + rs));

  if(rsi > previous_rsi){
    direction = 'up'
  }else if(rsi < previous_rsi){
    direction = 'down'
  }else if(rsi === previous_rsi){
    direction = 'nutral'
  }

  return {
    gain_ema  : gain_ema,
    loss_ema  : loss_ema,
    rsi       : rsi,
    direction : direction
  }
}

function atr(previous_atr, high, low, previous_closing){
  let tr, atr, direction, period = 14;

  tr = Math.max(high - low, Math.abs(high - previous_closing), Math.abs(low - previous_closing));
  atr = ((previous_atr * (period - 1)) + tr) / period;

  if(atr > previous_atr){
    direction = 'up'
  }else if(atr < previous_atr){
    direction = 'down'
  }else if(atr === previous_atr){
    direction = 'nutral'
  }

  return {
    atr       : atr,
    direction : direction
  }
}

