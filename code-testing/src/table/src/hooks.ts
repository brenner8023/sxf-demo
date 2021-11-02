
import {
  computed,
  ref,
  Ref,
  watch,
  getCurrentInstance,
  toRef,
} from '@vue/composition-api';
import type { PagingPlugin, ValueOf, TablePublicProps } from './types';
import { sortDirection } from './const';

type SortDirection = ValueOf<typeof sortDirection>;
type SortDirectionFn = (type: SortDirection) => void;

const getSortFn = (newDirection: SortDirection, sortFn: (...args: any[]) => number) => {
  return (...args: any[]) => {

    // 正序乘以1，倒序乘以-1
    return sortFn(...args) * (newDirection === sortDirection.asc ? 1 : -1);
  };
};

export const useDataSource = (props: TablePublicProps) => {
  const tableData = toRef(props, 'data');
  const columns = toRef(props, 'columns');
  const sortTableData = (direction: SortDirection, targetIdx: number) => {
    const target = columns.value.find((col, idx: number) => idx === targetIdx);
    if (target) {
      const sortFn = getSortFn(direction, target.sortFn!);
      tableData.value.sort(sortFn);
    }
  };
  const isTableEmpty = computed(() => !(Array.isArray(tableData.value) && tableData.value.length > 0));

  return {
    columns,
    isTableEmpty,
    tableData,
    sortTableData,
  };
};

/**列排序 */
export const useSortColumn = (
  currentDirection: Ref<SortDirection>,
  setSortDirection: SortDirectionFn,
  sortDataFn: (...args: any[]) => void
) => {

  const selectedColIndex = ref(-1);
  const changeSortColumn = (type: SortDirection, colIndex: number) => {
    setSortDirection(type);
    selectedColIndex.value = colIndex;
  };

  watch<[Ref<number>, Ref<SortDirection>]>([selectedColIndex, currentDirection], ([newVal, newDirection]) => {
    sortDataFn(newDirection, newVal);
  });

  return {
    selectedColIndex,
    changeSortColumn,
  };
};

/**排序 */
export const useSorter = () => {
  const currentDirection = ref<SortDirection>(sortDirection.asc);

  const setSortDirection: SortDirectionFn = (type) => {
    currentDirection.value = type;
  };

  const isAsc = computed(() => currentDirection.value === sortDirection.asc);

  return {
    currentDirection,
    setSortDirection,
    isAsc,
  };
};

/**左翻右翻 */
export const useLRPaging = (pageStart: Ref<number>, pageLimit: Ref<number>, pageTotal: Ref<number>) => {
  const isLeftDisable = computed(() => pageStart.value === 1);
  const isRightDisable = computed(() => pageStart.value - 1 + pageLimit.value >= pageTotal.value);

  const onLeftClick = () => {
    if (isLeftDisable.value) {
      return;
    }
    pageStart.value -= pageLimit.value;
  };
  const onRightClick = () => {
    if (isRightDisable.value) {
      return;
    }
    pageStart.value += pageLimit.value;
  };

  return {
    onLeftClick,
    onRightClick,
  };
};

export const usePaging = (pagingConfig: Ref<PagingPlugin | undefined>) => {
  const vm = getCurrentInstance();
  const defaultPageSize = [20, 50];
  const pageSize = computed(() => pagingConfig.value ?
    Object.assign([], defaultPageSize, pagingConfig.value.pageSize) :
    defaultPageSize
  );

  const pageTotal = computed(() => pagingConfig.value ? pagingConfig.value.total : 0);

  /**当前页开始的索引 */
  const pageStart = ref(1);

  /**每页的长度上限 */
  const pageLimit = ref(pageSize.value[0]);

  watch([pageStart, pageLimit], () => {
    emitPagingChange();
  })

  const setPageLimit = (newVal: string | number) => {
    pageLimit.value = +newVal;
  };

  /**当前页 */
  const currentPage = computed(() => Math.ceil(pageStart.value / pageLimit.value));

  /**跳转到指定页 */
  const onJumpPage = (currPage: number) => {
    pageStart.value = (currPage - 1) * pageLimit.value + 1;
  };
  const emitPagingChange = () => {
    vm?.emit('paging-change', {
      pageStart: pageStart.value,
      pageLimit: pageLimit.value,
    });
  };

  return {
    ...useLRPaging(pageStart, pageLimit, pageTotal),
    pageSize,
    currentPage,
    pageLimit,
    setPageLimit,
    pageTotal,
    onJumpPage,
  };
};
