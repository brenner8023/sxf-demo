import { defineComponent, computed, inject } from "@vue/composition-api";
import { sorterInjectKey, sortDirection } from '../../const';

export default defineComponent({
  name: 'TableSorter',
  props: {
    colIndex: {
      type: Number,
      default: -1,
    },
  },
  setup (props) {
    const {
      selectedColIndex,
      isAsc,
      changeSortColumn,
    } = inject(sorterInjectKey)!;

    const isSelected = computed(() => selectedColIndex.value === props.colIndex);
    const ascClass = computed(() =>
      'sxf-table-sorter sxf-table-sorter__asc' + (isSelected.value && isAsc.value ? ' sxf-table-sorter__asc--selected' : '') );
    const descClass = computed(() =>
    'sxf-table-sorter sxf-table-sorter__desc' + (isSelected.value && !isAsc.value ? ' sxf-table-sorter__desc--selected' : '') );

    const onAscClick = () => {
      changeSortColumn(sortDirection.asc, props.colIndex);
    };
    const onDescClick = () => {
      changeSortColumn(sortDirection.desc, props.colIndex);
    };

    return () => {
      return <div>
        <div class={ascClass.value} onClick={onAscClick} utid={`asc-${props.colIndex}`}></div>
        <div class={descClass.value} onClick={onDescClick} utid={`desc-${props.colIndex}`}></div>
      </div>;
    };
  }
});
