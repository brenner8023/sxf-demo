
import { toRef, computed, defineComponent, provide } from '@vue/composition-api';
import { tableProps, TablePublicProps } from './types';
import { slotInjectKey, pagingInjectKey, sorterInjectKey, columnInjectKey } from './const';
import { useSorter, usePaging, useDataSource, useSortColumn } from './hooks';

import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

import './table.less';

export default defineComponent<TablePublicProps>({
  name: 'Table',
  props: tableProps,
  setup(props, { slots }) {
    const tableOpts = toRef(props, 'options');

    const {
      columns,
      sortTableData,
      tableData,
      isTableEmpty,
    } = useDataSource(props);
    provide(columnInjectKey, { columns });

    const {
      isAsc,
      currentDirection,
      setSortDirection,
    } = useSorter();
    const {
      selectedColIndex,
      changeSortColumn,
    } = useSortColumn(
      currentDirection,
      setSortDirection,
      sortTableData,
    );

    provide(sorterInjectKey, {
      isAsc,
      selectedColIndex,
      changeSortColumn,
    });

    const pagingConfig = computed(() => props.plugin?.paging);
    provide(pagingInjectKey, {
      pagingState: usePaging(pagingConfig),
    });

    /**自定义插槽注入到td组件中 */
    provide(slotInjectKey, { tableSlots: slots });

    const tableStyle = computed(() => ({
      height: tableOpts.value?.height,
    }));

    return () => {
      return (
        <div class="sxf-table-wrap" style={tableStyle.value}>
          <table class="sxf-table">
            <TableHeader></TableHeader>
            <TableBody tableData={tableData.value} isTableEmpty={isTableEmpty.value}></TableBody>
          </table>
          <TableFooter pagingConfig={pagingConfig.value} />
        </div>
      );
    };
  },
});
