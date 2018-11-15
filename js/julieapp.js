'use strict';

//make a constructor funtion
function Horns (obj) {
  this.url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horn = obj.horns;
}
Horns.allHornsArray = [];
Horns.listArrayKeys = [];
Horns.listArray = [];
Horns.filteredListArray = [];

Horns.prototype.render = function() {
  $('main').append('<div class="clone"></div>')
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);
  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
}

Horns.prototype.makeList = function () {
  if (!Horns.listArrayKeys.includes(this.keyword)) {
    Horns.listArrayKeys.push(this.keyword);
    Horns.listArray.push(this);
  }
}

Horns.prototype.list = function () {
  let filterList = $('select');
  filterList.append($('<option></option>').val(this.keyword).html(this.keyword))
};




//get information from json and populate template, which also then renders to screen.
Horns.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horns.allHornsArray.push(new Horns(obj));
      })
    })
    .then(Horns.loadHorns)
    .then(Horns.populateList)
    .then(Horns.populateForm)
}

Horns.loadHorns = () => {
  Horns.allHornsArray.forEach(horn => horn.render());
}

Horns.populateForm= () => {
  Horns.listArray.forEach(horn => horn.list());
}

Horns.populateList = () => {
  Horns.allHornsArray.forEach(horn => horn.makeList());
}

$(() => Horns.readJson());


Horns.clickHandler = () => {
  // console.log($('input:text')); //this logs a function and I still can't drill to val
  // console.log(this.val); //i keep getting an error this doesn't work, "this" isn't a thing

  //right now this walks through both arrays and i need to get the value of the selection to place in the if and THEN this will work. otherwise this is just reorganizing the array by keytype
  Horns.listArray.forEach( listObj => {
    // console.log('listObj.keyword outside of if ' + listObj.keyword);
    Horns.allHornsArray.forEach( hornObj => {
      if (hornObj.keyword === listObj.keyword) {
        // console.log('hornObj.keyword in if ' + hornObj.keyword);
        Horns.filteredListArray.push(hornObj);

      }
    })
  })
}

// $('select').change(Horns.clickHandler);

$('select').on('change', Horns.clickHandler);
