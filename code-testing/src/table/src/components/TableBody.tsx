
import { defineComponent } from '@vue/composition-api';
import TableTr from './TableTr';

export default defineComponent({
  name: 'TableBody',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup (props) {
    return () => {
      if (!Array.isArray(props.tableData) || props.tableData.length === 0) {
        return <tbody>
          <span>空状态</span>
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
