import { defineComponent, inject } from '@vue/composition-api';
import type { Ref } from '@vue/composition-api';
import type { TableColumn } from '../types';
import TableTd from './TableTd';
import { columnInjectKey } from '../const';

export default defineComponent({
  name: 'TableTr',
  props: {
    rowData: {
      type: Object,
      default: undefined,
    },
  },
  setup (props) {
    const {
      columns,
    }: {
      columns?: Ref<TableColumn[]>
    } = inject(columnInjectKey)!;

    return () => {
      return <tr class="sxf-table__row">
        {
          columns?.value.map(col => {
            return <TableTd rowData={props.rowData} currentColumn={col}></TableTd>;
          })
        }
      </tr>;
    };
  },
});
