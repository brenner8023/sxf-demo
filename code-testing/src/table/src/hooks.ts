
import {
  computed,
  ref,
  Ref,
  watch,
  getCurrentInstance,
  toRef,
} from '@vue/composition-api';
import type { PagingPlugin, ValueOf, TablePublicProps } from './types';
import { sortType } from './const';

type SortType = ValueOf<typeof sortType>;

const getSortFn = (newDirection: SortType, sortFn: (...args: any[]) => number) => {
  return (...args: any[]) => {
    return sortFn(...args) * (newDirection === sortType.asc ? 1 : -1);
  };
};

export const useDataSource = (props: TablePublicProps) => {
  const tableData = toRef(props, 'data');
  const columns = toRef(props, 'columns');
  const sortTableData = (direction: SortType, targetIdx: number) => {
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

export const useSorter = (sortDataFn: (...args: any[]) => void) => {
  const currentDirection = ref<SortType>(sortType.asc);
  const selectedColIndex = ref(-1);
  const setSorterState = (type: SortType, colIndex: number) => {
    if (currentDirection.value !== type) {
      currentDirection.value = type;
    }
    if (selectedColIndex.value !== colIndex) {
      selectedColIndex.value = colIndex;
    }
  };
  const isAsc = computed(() => currentDirection.value === sortType.asc);

  watch<[Ref<number>, Ref<SortType>]>([selectedColIndex, currentDirection], ([newVal, newDirection]) => {
    sortDataFn(newDirection, newVal);
  });

  return {
    selectedColIndex,
    setSorterState,
    isAsc,
  };
};

export const useLRPaging = (pageStart: Ref<number>, pageLimit: Ref<number>, pageTotal: Ref<number>, emitPagingChange: () => void) => {
  const isLeftDisable = computed(() => pageStart.value === 1);
  const isRightDisable = computed(() => pageStart.value - 1 + pageLimit.value >= pageTotal.value);

  const onLeftClick = () => {
    if (isLeftDisable.value) {
      return;
    }
    pageStart.value -= pageLimit.value;
    emitPagingChange();
  };
  const onRightClick = () => {
    if (isRightDisable.value) {
      return;
    }
    pageStart.value += pageLimit.value;
    emitPagingChange();
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

  const setPageLimit = (newVal: string | number) => {
    pageLimit.value = +newVal;
    emitPagingChange();
  };

  /**当前页 */
  const currentPage = computed(() => Math.ceil(pageStart.value / pageLimit.value));

  /**跳转到指定页 */
  const onJumpPage = (currPage: number) => {
    pageStart.value = (currPage - 1) * pageLimit.value + 1;
    emitPagingChange();
  };
  const emitPagingChange = () => {
    vm?.emit('paging-change', {
      pageStart: pageStart.value,
      pageLimit: pageLimit.value,
    });
  };

  return {
    ...useLRPaging(pageStart, pageLimit, pageTotal, emitPagingChange),
    pageSize,
    currentPage,
    pageLimit,
    setPageLimit,
    pageTotal,
    onJumpPage,
  };
};
