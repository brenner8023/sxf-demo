
import { defineComponent, PropType } from '@vue/composition-api';
import TableTr from './TableTr';

export default defineComponent({
  name: 'TableBody',
  props: {
    tableData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    isTableEmpty: {
      type: Boolean,
      default: true,
    },
  },
  setup (props) {
    return () => {
      if (props.isTableEmpty) {
        return <tbody>
          <div class="sxf-empty">空状态</div>
        </tbody>;
      }

      return <tbody>
        {
          props.tableData.map(rowData => {
            return <TableTr rowData={rowData}></TableTr>
          })
        }
      </tbody>;
    };
  }
});
