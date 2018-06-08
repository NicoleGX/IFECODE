function createCheckBox(boxId, data) {
  // 全选checkbox
  var checkboxAll = '<input type="checkbox" id="all-'+ boxId +'" name="items" value="全选" checkbox-type="all" /><label for="all-'  + boxId + '">全选</label>';
  var box = '';
  for(i in data) {
    box += '<input type="checkbox" id="'+ data[i]['value'] +'" name="items" value="'+ data[i]['text'] +'" checkbox-type="single" /><label for="'+ data[i]['value'] +'">'+ data[i]['text'] +'</label>'
  }
  switch(boxId)
  {
    case 'region-checkbox-wrapper':
      document.getElementById(boxId).innerHTML = '<p>地区：</p>' + box + checkboxAll
      break;
    case 'product-checkbox-wrapper':
      document.getElementById(boxId).innerHTML = '<p>商品种类：</p>' + box + checkboxAll
      break;
  }

  // 添加事件
  document.getElementById(boxId).addEventListener('click', function() {
      if(event.target.type === 'checkbox') {

        var input = document.getElementById(event.target.parentNode.id).getElementsByTagName("input");

        if(event.target.getAttribute('checkbox-type') === 'all') {
          // 全选
          for(let i in input) {
            if(input[i].type === 'checkbox') {
              input[i].checked = 'checked';
            }
          }
        } else {
          // checked count
          var count = 0
          for(let i = 0; i < input.length - 1; i++) {
            if(input[i].type === 'checkbox' && input[i].checked) {
              count++;
            }
          }
          // single count
          var singleCount = input.length - 1;
          if(!count) {
            // 唯一被勾选
            event.target.checked = 'checked';
          }
          else if(count < singleCount && input[singleCount].checked) {
            input[singleCount].checked = false
          }
          else if(count === singleCount) {
            input[singleCount].checked = 'checked';
          }
        }
      }
    })
  }

createCheckBox('region-checkbox-wrapper', [
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
])
createCheckBox('product-checkbox-wrapper', [
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
])