
import { defineComponent, PropType } from '@vue/composition-api';
import TablePaging from './plugin/TablePaging';
import type { PagingPlugin } from '../types';

export default defineComponent({
  name: 'TableFooter',
  props: {
    pagingConfig: {
      type: [Boolean, Object] as PropType<PagingPlugin>,
      default: false,
    },
  },
  setup (props) {
    return () => {
      return <div class="sxf-table-footer">
        {
          props.pagingConfig &&
            <TablePaging></TablePaging>
        }
      </div>;
    };
  }
});
