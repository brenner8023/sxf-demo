
import { defineComponent, inject } from '@vue/composition-api';
import type { Ref } from '@vue/composition-api';
import type { TableColumn } from '../types';
import { columnInjectKey } from '../const';
import TableSorter from './plugin/TableSorter';

export default defineComponent({
  name: 'TableHeader',
  setup () {
    const {
      columns,
    }: {
      columns?: Ref<TableColumn[]>
    } = inject(columnInjectKey)!;

    return () => {
      return <thead>
        {
          columns?.value.map((col, colIndex) => <th title={col.title}>
            <div class="sxf-table__header">
              { col.title }
              { typeof col.sortFn === 'function' && <TableSorter colIndex={colIndex}></TableSorter> }
            </div>
          </th>)
        }
      </thead>;
    };
  }
});
