# 如何使用

在demo中引入：

```ts
import { TestTable } from '../src/table';
```

在页面中使用：

```html
<TestTable></TestTable>
```
# TestTable
## TestTable 参数

| 参数 | 类型 | 默认 | 说明 |
| :-: | :-: | :-: | - |
|   data  | `any[]` | `[]` | 必选，表格数据 |
| columns | `TableColumn[]` | ''  | 必选，表格列配置|
| options | `TableOption` | `{ height: 'auto' }` | 可选，表格配置 |
| plugin  | `TablePlugin` | `{}` | 可选，表格插件配置 |

## TestTable 事件

| 参数 | 类型 | 说明 |
| :-: | :-: | - |
| pagingChange | `EventEmitter` | 可选，分页变化事件，返回当前页起始索引`pageStart`和当前页数量上限`pageLimit`，业务可以根据这两个值动态修改data，实现分页 |

# 接口 & 类型定义

TableOption
```ts
interface TableOption {

  /**
   * @default 'auto'
   */
  height: string;
}
```

TableColumn
```ts
export interface TableColumn {

  /**对应的数据字段 */
  field: string;

  /**列头显示的文案 */
  title: string;

  /**排序方法 */
  sortFn?: (...args: any[]) => number;
}
```

TablePlugin
```ts
interface TablePlugin {

  /**分页插件 */
  paging?: PagingPlugin;
}
```

pagingPlugin
```ts
export type PagingPlugin = false | {

  /**
   * @description 配置每页的数量上限
   * @default [20,50]
   */
  pageSize: number[];

  /**数据总数 */
  total: number;
};
```
