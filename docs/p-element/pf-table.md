### pf-table
<ClientOnly>
<complex-table></complex-table>
</ClientOnly>

<<< docs/.vuepress/components/complex-table.vue

上面的代码展示了分页,查询表格的使用.可以看到,只需要很简单的模板,就能完成查询分页功能,以及自带`loading`,此示例为`pf-table`组件

#### pf-table属性
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| pagination     | 是否显示分页 | boolean |true|
| pageConfig    |  分页配置 ,值为`el-pagination`的属性 |-|-|
| total    | 总条数 |number|0|
| syncFormQuery    | 是否同步表单数据,如填写了表单,但未点击搜索按钮,如果切换页码,是否携带搜索条件 |boolean|true|
| initGetData    |  是否组件自己触发`get-table-data方法` |boolean|true|
| autoLoading    |  是否让组件自动loading |boolean|true|
其他的表格和表单的属性与p-form和p-table一致

#### pf-table事件
- `get-table-data`:
当分页发生页码,每页个数改变,以及查询表格点击查询和重置的时候,都会触发此事件,此事件会自动加载`loading`,传递两个参数,第一个参数是`query对象`,第二个参数是`done`回调函数,用于消除`loading`.该组件默认初始化的时候就会触发此方法,需配置`initGetData`属性
- `search`: 调用重置搜索方法,可用于主动刷新表格数据
#### pf-table slots
  `formItem`的slot和`table`的slot在相应项中配置,此处固定名称的slot有
  `form-after`,如上例添加按钮
  
添加/编辑用户`edit-user`组件

<<< docs/.vuepress/components/edit-user.vue

此示例为p-dialog-form组件的示例,
下面介绍p-form和p-dialog-form的api
#### p-form 属性
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| formOptions     | 表单配置属性,值为`el-form`的属性 | - |-|
| formItems    | 见下文详细说明 |-|-|
| formClass    | form的class |-|-|
| originData    | form的原始数据,用于编辑等情况 |-|-|

#### `formItems`配置
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| type     | 表单项类型,渲染出类似`el-input`对应的表单组件 |  input/select/checkbox/date/radio/rate/slider/switch/time/input-number/grid
| label   |  相对于el-form-item的label|-|-|
| prop    | 相对于el-form-item的prop |-|-|
| required    | 添加表单项的必填校验属性 |boolean|-|
| idCard    | 添加表单项的身份证检验 |boolean|-|
| carNumber    | 添加表单项的车牌号检验 |boolean|-|
| integer    | 添加表单项的正整数校验 |boolean|-|
| tel    | 添加表单项的手机号码校验 |boolean|-|
| price    | 添加表单项的金额(10位,最多两位小数)校验 |boolean|-|
| towPoint    | 添加表单项的小数校验 |boolean|-|
| precent    | 添加表单项的百分比校验(0-100最多两位小数) |boolean|-|
| rules    | 添加表单项的其他校验 |array/object|-|
| attrs    | 表单项组件如`el-select`的其他属性 |-|-|
| trim    | input组件v-model.trim |-|-|
| formItemsAttrs    | 表单项`el-form-item`的其他属性 |-|-|
| slot    | 表单项slot名称,如果表单项是复杂组件则可以用slot |-|-|
| columns    | 如果表单项需要添加`el-row`,则`type`为`grid`,此时添加`columns`数组属性,columns每一项有`span`属性为`el-col`的`span`值,其他的配置则跟`formItems`配置一样 |-|-|

### p-form 事件
- `submit`:返回表单结果,已内置表单校验,返回promise,如果通过则resolve表单结果,不通过则reject
- `validate`:校验表单,与submit类似
 t-dialog-from 已内置取消和确定按钮点击确定按钮会提交confirm
### p-dialog-form属性
| 属性名        | 说明           | 类型  |默认值|
| ------------- |:-------------:| -----:|-----:
| title     | `el-dialog`的`title` | - |-|
| dialogConfig    | `el-dialog`的配置 |-|-|
| customClass    | `el-dialog`的`customClass` |-|-|

### p-dialog-form事件
- `confirm`:校验后提交表单,如果表单校验不通过则不会触发,如表单通过则会自动调用loading,以防止重复提交表单.通过则提交confirm事件,两个参数`formResult`结果对象和`done`回调, 调用则销毁loading
详细用法可参见上面的`edit-user` 组件的代码
