# /IFECOURSE53

#### 1.1html
----
- [ ] 表单：我们先从最简单的表单开始，我们的数据维度有：月、地区、商品种类，表单选项的任务就是做这几个维度的筛选或者组合的设置。我们先只做一个，用来做示例，比如我们选择用地区，请用一个Select或者单选，让用户可以选择地区。选项应该包括华东、华南、华北三个地区。
- [ ] 数据处理：接下来，我们根据用户选择的地区表单，从完整数据中，把对应选择地区的数据取出来。
- [ ] 表格：最后，将上一步取出来数据渲染成表格，表格有一个表头，用于显示数据标题：商品、地区、1月、2月……12月，然后共有14列：商品、地区、以及12个月的销售情况

- [x] 我们现在加入第二个表单，商品种类，依然是select或者radio，自选。
- [x] 两个表单项都存在，做并集的选择，比如选了华北，和手机，表示要看华北地区手机的销售情况
- [x] 两个表单项的选择互相不干扰，即改变其中一个时候，不会导致另外一个的选项的变化

#### 1.2html
----
- [x] 点击全选时，如果单个选项中只要有一个不是被选上的状态，则进行全选操作
- [x] 点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
- [x] 点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
- [x] 如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
- [x] 不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选

#### 1.3html (/IFECOURSE53/1)
----
- [x] 当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
- [x] 当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
- [x] 当商品和地区都选择了多于一个的情况下，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
- [x] 当商品和地区都只选择一个的情况下，以商品为第一列，地区为第二列

#### /IFECOURSE53/1/index.html
----
- [x] 文件拆分

# /IFECOURSE55

#### bar.html
----
柱状图
- [x] 横轴
- [x] 纵轴
- [x] 数据项
- [x] 固定只显示华东地区手机12个月的数据

#### line1.html
----
折线图
- [x] 横轴
- [x] 纵轴
- [x] 每个数据对应在坐标中的数据点，可以用一个直径为5的实心圆
- [x] 每个数据点之间连接的直线
- [x] 固定只显示华东地区手机12个月的数据

#### index.html
- [x] 根据表单的选择，在折线图中显示相应的折现，和对应表格中的数据对应
- [ ] 每一条线选择不同的颜色
- [x] 另外保留上面的鼠标hover某一行时显示某一行数据的图表，但鼠标移开表格后，再恢复到显示表单对应的所有数据