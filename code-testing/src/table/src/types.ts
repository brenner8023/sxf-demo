/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropOptions, PropType } from 'vue-types/dist/types'
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>
type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type InnerRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } | { default: any } ? K : never
}[keyof T]

type InnerOptionalKeys<T> = Exclude<keyof T, InnerRequiredKeys<T>>

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D>
          ? unknown extends V
            ? D
            : V
          : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & { [K in PublicOptionalKeys<O>]?: InferPropType<O[K]> }
  : { [K in string]: any }

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxInnerPropTypes<O> = O extends object
? { [K in InnerRequiredKeys<O>]: InferPropType<O[K]> } & { [K in InnerOptionalKeys<O>]?: InferPropType<O[K]> }
: { [K in string]: any }

export type TablePublicProps = IxInnerPropTypes<typeof tableProps>

export type ValueOf<T> = T[keyof T];

export interface TableColumn {

  /**对应的数据字段 */
  field: string;

  /**列头显示的文案 */
  title: string;

  /**排序方法 */
  sortFn?: (...args: any[]) => number;
}

interface TableOption {

  /**
   * @default 'auto'
   */
  height: string;
}

export type PagingPlugin = false | {

  /**
   * @description 配置每页的数量上限
   * @default [20,50]
   */
  pageSize: number[];

  /**数据总数 */
  total: number;
};

interface TablePlugin {

  /**分页插件 */
  paging?: PagingPlugin;
}

// Props 定义在这里
export const tableProps = {
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
    reqired: true,
  },
  options: {
    type: Object as PropType<TableOption>,
    default: () => ({
      height: 'auto'
    }),
  },
  plugin: {
    type: Object as PropType<TablePlugin>,
    default: () => ({}),
  },
}
