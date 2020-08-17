const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
require('dotenv').config()

const facebookurl = "https://mbasic.facebook.com";
let url_terakhir = "";
let url_now = facebookurl;
const cookies = process.env.COOKIES

function extrastr(mystr){
  if(mystr.match(/\?ft_id=(.*)&origin_uri=/)){
    return mystr.match(/\?ft_id=(.*)&origin_uri=/)[1]
  }else if(mystr.match(/\?ft_ent_identifier=(.*)&reaction_type=/)){
    return mystr.match(/\?ft_ent_identifier=(.*)&reaction_type=/)[1]
  }
  return mystr
}

function header_set(){
  headernya = {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": cookies
    },
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }
  if(url_terakhir === ""){
    headernya.referrerPolicy = "no-referrer-when-downgrade"
  }else{
    headernya.referrer = url_terakhir
    headernya.referrerPolicy = "origin-when-cross-origin"
  }
  return headernya
}

async function getHome() {
  console.log("gethome "+url_now);
  try {
    url_terakhir = "";
    const response = await axios.get(facebookurl,header_set());
    url_now = facebookurl
    list_link(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

async function reaction_select(url) {
  try {
    const response = await axios.get(facebookurl+''+url,header_set());
    url_now = facebookurl+''+url
    if(url_terakhir !== ""){
      url_terakhir = facebookurl
    }
    proses_reac(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

async function execute_reaction(url) {
  try {
    const id = extrastr(url_now)
    const response = await axios.get(facebookurl+''+url,header_set());
    console.log(`execute react ${id} sukses `);
    fs.appendFileSync('logs.txt',id+"|")
    url_now = facebookurl+''+url
    if(url_terakhir !== ""){
      url_terakhir = facebookurl
    }
    setTimeout(() => {
      list_link(response.data);
    }, getRndInteger(3000,30000));
  } catch (error) {
    console.error(error.message);
  }
}

function list_link(res){
  if(res.includes(" Masuk atau Daftar")){
    console.log("list_link cookie hilang");
  }else{
    const $ = cheerio.load(res);
    var hasil_arr = []
    var hasil_arr_friend = []
    $('a').each((i, link) => {
      const href = link.attribs.href;
      if(href.includes('reactions/picker')){
        if(!fs.readFileSync('logs.txt').toString().includes(extrastr(href))){
          if(href.includes("page_id_type")){
            hasil_arr.push(href);
          }else{
            hasil_arr_friend.push(href)
          }
        }
      }
    });
    if(hasil_arr_friend.length > 0){
      reaction_select(hasil_arr_friend[Math.floor(Math.random() * hasil_arr_friend.length)])
    }else if(hasil_arr.length > 0){
      reaction_select(hasil_arr[Math.floor(Math.random() * hasil_arr.length)])
    }else{
      getHome()
    }
  }
}

function proses_reac(res){
  const $ = cheerio.load(res);
  var hasil_arr = []
  $("a").each((i, link) => {
    const href = link.attribs.href;
    if(href.includes("ufi/reaction/")){
      hasil_arr.push(href);
    }
  });
  execute_reaction(hasil_arr[Math.floor(Math.random() * hasil_arr.length)])
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

getHome()
