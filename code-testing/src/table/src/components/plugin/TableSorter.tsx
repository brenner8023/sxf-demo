import { defineComponent, computed, inject } from "@vue/composition-api";
import { sorterInjectKey, sortType } from '../../const';

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
      setSorterState,
    } = inject(sorterInjectKey) || {};

    const isSelected = computed(() => selectedColIndex.value === props.colIndex);
    const ascClass = computed(() =>
      'sxf-table-sorter sxf-table-sorter__asc' + (isSelected.value && isAsc.value ? ' sxf-table-sorter__asc--selected' : '') );
    const descClass = computed(() =>
    'sxf-table-sorter sxf-table-sorter__desc' + (isSelected.value && !isAsc.value ? ' sxf-table-sorter__desc--selected' : '') );

    const onAscClick = () => {
      setSorterState(sortType.asc, props.colIndex);
    };
    const onDescClick = () => {
      setSorterState(sortType.desc, props.colIndex);
    };

    return () => {
      return <div>
        <div class={ascClass.value} onClick={onAscClick}></div>
        <div class={descClass.value} onClick={onDescClick}></div>
      </div>;
    };
  }
});
