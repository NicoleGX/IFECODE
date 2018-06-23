/*
 *  Document    : checkbox.js
 *  Description: create checkbox
 */

 var Checkbox = function () {
  //  id: parent div id; data: value and text
  var create = function (id, data) {
    // the html of checkbox-all
    var checkboxAll = '<input type="checkbox" id="all-'+ id +'" name="items" value="全选" checkbox-type="all" /><label for="all-'  + id + '">全选</label>';
    // the html of checkbox-single
    var box = '';
    for(i in data) {
      box += '<input type="checkbox" id="'+ data[i]['value'] +'" name="items" value="'+ data[i]['text'] +'" checkbox-type="single" /><label for="'+ data[i]['value'] +'">'+ data[i]['text'] +'</label>';
    }
    // add the checkbox to dom
    switch(id)
    {
      case 'region-checkbox-wrapper':
        document.getElementById(id).innerHTML = '<p>地区：</p>' + box + checkboxAll
        break;
      case 'product-checkbox-wrapper':
        document.getElementById(id).innerHTML = '<p>商品种类：</p>' + box + checkboxAll
        break;
    }
  }

  var checked = function () {
    if(event.target.type === 'checkbox') {
      var input = document.getElementById(event.target.parentNode.id).getElementsByTagName("input");
      if(event.target.getAttribute('checkbox-type') === 'all') {
        // check-all
        for(let i in input) {
          if(input[i].type === 'checkbox') {
            input[i].checked = 'checked';
          }
        }
      } else {
        var count = 0
        for(let i = 0; i < input.length - 1; i++) {
          if(input[i].type === 'checkbox' && input[i].checked) {
            count++; // the checked count
          }
        }
        // single count
        var singleCount = input.length - 1;
        if(!count) {
          // the only checked
          event.target.checked = 'checked';
          alert('至少选择一个。');
        }
        else if(count < singleCount && input[singleCount].checked) {
          input[singleCount].checked = false
        }
        else if(count === singleCount) {
          input[singleCount].checked = 'checked';
        }
      }
    }
  }

  return {
    init: function() {
      var data = {
        'region-checkbox-wrapper': [
          {
            value: 'huabei',
            text: '华北'
          },
          {
            value: 'huanan',
            text: '华南'
          },
          {
            value: 'huadong',
            text: '华东'
          }
        ],
        'product-checkbox-wrapper': [
          {
            value: 'phone',
            text: '手机'
          },
          {
            value: 'pc',
            text: '笔记本'
          },
          {
            value: 'audio',
            text: '智能音箱'
          }
        ]
      }
      for(let key in data) {
        create(key, data[key]);
        // add listener
        document.getElementById(key).addEventListener('click', checked);
      }
    }
  }
 }();

// Initialize checkobx when page loads
jQuery(function(){ Checkbox.init(); });