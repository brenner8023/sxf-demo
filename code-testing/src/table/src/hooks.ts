
import { computed, ref, Ref, watch, getCurrentInstance } from '@vue/composition-api';
import type { PagingPlugin, ValueOf, TableColumn } from './types';
import { sortType } from './const';

type SortType = ValueOf<typeof sortType>;
type SortDataFn = (sortFn: (...args: any[]) => number) => void;

export const useDataSource = (tableData: Ref<any[]>) => {
  const sortTableData: SortDataFn = sortFn => {
    tableData.value.sort(sortFn);
  };

  return {
    sortTableData,
  };
};

export const useSorter = (sortData: SortDataFn, columns: Ref<TableColumn[]>) => {
  const currentDirection = ref<SortType>(sortType.asc);
  const selectedColIndex = ref(-1);
  const setSorterState = (type: SortType, colIndex: number) => {
    currentDirection.value = type;
    selectedColIndex.value = colIndex;
  };
  const isAsc = computed(() => currentDirection.value === sortType.asc);

  watch([selectedColIndex, currentDirection], ([newVal, newArrow]) => {
    const target = columns.value.find((col: any, idx: number) => idx === newVal) as TableColumn;
    const sortFn = (...args: any[]) => target.sortFn!(...args) * (newArrow === sortType.asc ? 1 : -1);
    target && sortData(sortFn);
  });

  return {
    selectedColIndex,
    setSorterState,
    isAsc,
  };
};

const useLRPaging = (pageStart: Ref<number>, pageLimit: Ref<number>, pageTotal: Ref<number>, emitPagingChange: () => void) => {
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
    isLeftDisable,
    isRightDisable,
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
  const currentPage = computed<number>({
    get: () => Math.ceil(pageStart.value / pageLimit.value),
    set: (newPage) => {
      pageStart.value = (newPage - 1 ) * pageLimit.value + 1;
    },
  });

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
    pageStart,
    pageLimit,
    setPageLimit,
    pageTotal,
    onJumpPage,
    emitPagingChange,
  };
};
