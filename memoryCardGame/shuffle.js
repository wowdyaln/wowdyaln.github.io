// ? 似乎只有 node js 的 fs 可以存取檔案的名稱 ？
const cards = [
  "001-youtube",
  "002-yelp",
  "003-wordpress",
  "004-wikipedia",
  "005-whatsapp",
  "006-vine",
  "007-vimeo",
  "008-twitter",
  "009-tumblr",
  "010-trello",
  "011-stumbleupon",
  "012-spotify",
  "013-soundcloud",
  "014-snapchat",
  "015-skype",
  "016-shutterstock",
  "017-scribd",
  "018-reddit",
  "019-quora",
  "020-plaxo",
  "021-pinterest",
  "022-periscope",
  "023-paypal",
  "024-path",
  "025-myspace",
  "026-medium",
  "027-linkedin",
  "028-kickstarter",
  "029-instagram",
  "031-howcast",
  "032-hi5",
  "033-google-plus",
  "034-foursquare",
  "035-flickr",
  "036-facebook",
  "037-etsy",
  "038-envato",
  "039-dropbox",
  "040-dribbble",
  "041-deviantart",
  "042-delicious",
  "043-creative-market",
  "044-buffer",
  "045-box",
  "046-bing",
  "047-behance",
  "048-android",
  "049-amazon"
]

//  pick up 8 cards randomly
function pick8(array){
  let copyArray = array
  let output = []
  for (let i=0; i<8; i++){
    let item = copyArray[Math.floor(Math.random() * copyArray.length)]
    output.push(item)
    copyArray.splice(copyArray.indexOf(item), 1)  // take away from copyArray
  }
  return output
}

let card8 = pick8(cards)

let htmlArray = []

card8.forEach( card => {
 htmlArray.push(
   `
    <div class="memory__card sun">
      <img src="./svg/${card}.svg" alt="${card}" class="card__front">
      <img src="./svg/030-html-5.svg" alt="${card}" class="card__back">
    </div>
   `
 ) 
 htmlArray.push(
   `
    <div class="memory__card moon">
      <img src="./svg/${card}.svg" alt="${card}" class="card__front">
      <img src="./svg/030-html-5.svg" alt="${card}" class="card__back">
    </div>
   `
 ) 
})

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

htmlArray = shuffle(htmlArray);

htmlArray.forEach( html => {
  document.querySelector('.container').innerHTML += html
})
