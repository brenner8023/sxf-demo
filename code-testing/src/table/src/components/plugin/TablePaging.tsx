import { defineComponent, inject } from '@vue/composition-api';
import { pagingInjectKey } from '../../const';

export default defineComponent({
  name: 'TablePaging',
  setup () {
    const {
      pagingState: {
        currentPage,
        pageTotal,
        pageSize,
        pageLimit,
        setPageLimit,
        onLeftClick,
        onRightClick,
        onJumpPage,
      }
    } = inject(pagingInjectKey)!;

    const onSelectChange = (event: Event) => {
      setPageLimit(event.target?.value);
    };
    const onInputChange = (event: Event) => {
      onJumpPage(+event.target?.value);
    };

    return () => {
      return <div class="sxf-paging">
        <div>
          total：{ pageTotal.value }
        </div>
        <div
          class="sxf-paging__arrow sxf-paging__arrow--left"
          onClick={onLeftClick}></div>
        <input
          class="sxf-paging__input"
          type="text"
          value={currentPage.value}
          onChange={onInputChange} />
        页
        <div class="sxf-paging__arrow sxf-paging__arrow--right" onClick={onRightClick}></div>
        每页
        <select class="sxf-paging-select" name="" id="" value={pageLimit.value} onChange={onSelectChange}>
          {
            pageSize.value.map(item => <option>{ item }</option>)
          }
        </select>
        条
      </div>;
    };
  }
});
