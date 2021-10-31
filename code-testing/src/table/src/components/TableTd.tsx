import { defineComponent, PropType, inject } from '@vue/composition-api';
import type { TableColumn } from '../types';
import { slotInjectKey } from '../const';

export default defineComponent({
  name: 'TableTd',
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
    currentColumn: {
      type: Object as PropType<TableColumn>,
      default: () => ({}),
    },
  },
  setup (props) {

    const {
      tableSlots
    } = inject(slotInjectKey) || {};

    return () => {
      return <td>
      {
        props.rowData[props.currentColumn.field] ??
          tableSlots?.[props.currentColumn.field]?.({ record: props.rowData })
      }
     </td>;
    };
  },
});
