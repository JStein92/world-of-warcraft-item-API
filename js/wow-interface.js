import {Stats} from './../js/stats.js';

$(document).ready(function() {
  $('#character-form').submit(function(e) {
    e.preventDefault();
    let realm = $('#realm-input').val();
    let character = $('#character-input').val();


    $('#realm-input').val("");
    $('#character-input').val("");

    let promise = new Promise(function(resolve, reject){

      let request = new XMLHttpRequest();
      let url = `https://us.api.battle.net/wow/character/${realm}/${character}?fields=items&locale=en_US&apikey=u64rwpjasursauypf354e6djqjyxdvdp`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      $('#result').show();
      let body = JSON.parse(response);
        $('#playerIcon').text("");
      $('#playerIcon').append(`<img src = 'http://render-api-us.worldofwarcraft.com/static-render/us/${body.thumbnail}' alt = '${body.name}'>`);

      $('#playerName').text(`${body.name}`);

      $('#charLevel').text(`${body.level}`);

      const itemArray = ['head', 'neck', 'shoulder', 'back', 'chest', 'shirt', 'wrist', 'mainHand', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2'];

      for (var i = 0; i < itemArray.length; i++) {
        $(`#${itemArray[i]}`).text("");
        $(`#${itemArray[i]}Name`).text("");
        $(`#${itemArray[i]}Level`).text("");
      }

      itemArray.forEach(function(itemSlot) {
        let currentItem = body.items[itemSlot];
        $(`#${itemSlot}`).text("");
        $(`#${itemSlot}`).prepend(`<a href="http://www.wowhead.com/item=${currentItem.id}"><img src = 'http://media.blizzard.com/wow/icons/56/${currentItem.icon}.jpg' alt = '${currentItem.name}'></a>`);
          $(`#${itemSlot}Name`).text(`${currentItem.name}`);
          $(`#${itemSlot}Level`).text(`${currentItem.itemLevel}`);

      });
      // }



    // }, function(error) {
    //   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    // });
  });
});
});
