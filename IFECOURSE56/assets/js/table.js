/*
 *  Document    : table.js
 *  Description: create table
 */

 var Table = function () {

  var drawTable = function (data, type) {
    if(data.length) {
      var tableDom = document.getElementById('table-wrapper')
      tableDom.innerHTML = '<table border="1" id="table"><tr><th>' + type[0][0].toUpperCase() + '</th><th>' + type[0][1].toUpperCase() + '</th><th>一月</th><th>二月</th><th>三月</th><th>四月</th><th>五月</th><th>六月</th><th>七月</th><th>八月</th><th>九月</th><th>十月</th><th>十一月</th><th>十二月</th></tr></table>'
      var table = document.getElementById('table');
      if(type[1]) {
        for(let key in type[2]) {
          var count = 1
          for(let n in data) {
            if(data[n][type[1]] === key) {
              var tr = document.createElement('tr');
              if(count === 1) {
                // add rowspan
                tr.innerHTML = '<td rowspan=' + type[2][key] + '>' + key + '</td><td>' + data[n][type[0][1]] + '</td>';
              } else {
                tr.innerHTML = '<td>' + data[n][type[0][1]] + '</td>';
              }
              for(let month = 1; month < 13; month++) {
                tr.innerHTML += '<td label="' + 'product:' + data[n]['product'] + ',region:' + data[n]['region'] + '"><input type="text" name="' + month + '" value="' + data[n]['sale'][month-1] + '" onblur="isNum()" /></td>';
              }
              tr.setAttribute('class', 'trEvent');
              table.appendChild(tr);
              count += 1;
            } 
          }
        }
      } else {
        for(let i in data) {
          var tr = document.createElement('tr');
          for(let n in type[0]) {
            tr.innerHTML += '<td>' + data[i][type[0][n]] + '</td>';
          }
          for(let month = 1; month < 13; month++) {
            tr.innerHTML += '<td label="' + 'product:' + data[i]['product'] + ',region:' + data[i]['region'] + '"><input type="text" name="' + month + '" value="' + data[i]['sale'][month-1] + '" onblur="isNum()" /></td>';
          }
          tr.setAttribute('class', 'trEvent');
          table.appendChild(tr);
        }
      }
    }
  }

  // the style of table, the return: [[col1, col2], merge-column, rowspan]
  var drawType = function (data) {
    var region = [];
    var product = [];
    for(let i in data) {
      if(!contains(region, data[i]['region'])) {
        region.push(data[i]['region'])
      }
      if(!contains(product, data[i]['product'])) {
        product.push(data[i]['product'])
      }
    }
    if(region.length == 1) {
      if(product.length == 1) {
        return [['product', 'region'], ''];
      } else {
        var res = {}
        for(let i in data) {
          if(!res.hasOwnProperty(data[i]['region'])) {
            res[data[i]['region']] = 0
          }
          res[data[i]['region']] += 1
        }
        return [['region', 'product'], 'region', res];
      }
    } else if(region.length > 1) {
      var res = {}
      for(let i in data) {
        if(!res.hasOwnProperty(data[i]['product'])) {
          res[data[i]['product']] = 0
        }
        res[data[i]['product']] += 1
      }
      return [['product', 'region'], 'product', res];
    }
  }

  // add mouseover event to tr
  var mouseOver = function (data) {
    var trEvent = document.getElementsByClassName('trEvent');
    for(let i = 0; i < trEvent.length; i++) {
      var dom = trEvent[i];
      dom.addEventListener('mouseover', function(event) {
        var filterData = data;
        // 过滤的数据条件
        if(event.target.nodeName === 'INPUT') {
          var filter = event.target.parentNode.getAttribute('label').split(',');
        }
        for(let i in filter) {
          var res = [];
          var arr = filter[i].split(':');
          var key = arr[0];
          var value = arr[1];
          for(let n in filterData) {
            if(filterData[n][key] === value) {
              res.push(filterData[n]);
            }
          }
          filterData = res;
        }
        Line.drawLines(filterData);
      });
      dom.addEventListener('mouseleave', function(event) {
        Line.drawLines(data);
      });
    }
  }

  return {
    init: function (data) {
      var type = drawType(data);
      drawTable(data, type);
      mouseOver(data);
    }
  }
 }();

 // Initialize table when page loads
// jQuery(function(){ Table.init(); });