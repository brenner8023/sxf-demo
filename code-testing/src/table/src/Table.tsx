
import { toRef, computed, defineComponent, provide } from '@vue/composition-api';
import { tableProps, TablePublicProps } from './types';
import { columnInjectKey, slotInjectKey, pagingInjectKey, sorterInjectKey } from './const';
import { useSorter, usePaging, useDataSource } from './hooks';

import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

import './table.less';

export default defineComponent<TablePublicProps>({
  name: 'Table',
  props: tableProps,
  setup(props, { slots }) {
    const columns = toRef(props, 'columns');
    const tableData = toRef(props, 'data');
    const tableOpts = toRef(props, 'options');

    const {
      sortTableData,
    } = useDataSource(tableData);

    const {
      isAsc,
      selectedColIndex,
      setSorterState,
    } = useSorter(sortTableData, columns);

    const pagingConfig = computed(() => props.plugin?.paging);

    provide(pagingInjectKey, {
      pagingState: usePaging(pagingConfig)
    });

    provide(sorterInjectKey, {
      isAsc,
      selectedColIndex,
      setSorterState,
    });

    provide(columnInjectKey, { columns });
    provide(slotInjectKey, { tableSlots: slots });

    const tableStyle = computed(() => {
      return {
        height: tableOpts.value?.height,
      };
    });

    return () => {
      return (
        <div class="sxf-table-wrap" style={tableStyle.value}>
          <table class="sxf-table">
            <TableHeader></TableHeader>
            <TableBody tableData={tableData.value}></TableBody>
          </table>
          <TableFooter pagingConfig={pagingConfig.value} />
        </div>
      );
    };
  },
});
