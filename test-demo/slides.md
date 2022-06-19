---
theme: vuetiful

info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
---

# 前端测试分享

https://github.com/brenner8023

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# 带来的意义

- 缺陷左移
- 质量后盾
- 提升个人能力

---

## 缺陷左移

前期修改bug，很简单。后期修改bug：
1. 需要复现
2. 需要评估改动影响，写改动点，写测试建议
3. 需要走流程审核
4. 需要测试发散
5. bug可能会阻塞进度、可能还会被reopen

bug越到后面抛出，项目人员付出的时间越多，开发所承担的风险也越高。

<img src="/bug.jpg" alt="" style="width: 70%;">

---

## 质量后盾

- 改代码很容易存在漏测、改动引发。升级第三方库影响面广，但是有问题比较难提前感知
- `CodeReview`、代码走读等机制都是以**人**为主体的保障，Review效果受人的当前状态、人的技术水平影响，比如发烧感冒、失恋、基金亏损导致头脑不清醒，不能仅仅通过`CodeReview`去保障
- 组件难用会导致单测难写，可以从单测反映出组件代码封装得好不好
- 单测可以用来支撑未来模块的重构优化，项目的架构演进

<div v-click></div>
<div v-after>
  <img src="/vt.jpg" alt="" style="margin-top: -60px; height: 340px; float: right;">
</div>

---

## 提升个人能力

测试跟前端不一样，属于不同的领域，需要学很多东西：
- 项目引入测试框架，肯定会遇到很多问题，比如内网代理、测试框架与技术栈的冲突，锻炼你的解决问题能力
- 如何测试一个vue组件？如何测试ts的类型声明？这些都是要自学的，锻炼你的学习上手能力
- 如何封装好用的测试API？如何做好复杂项目的e2e测试和组件测试？锻炼你的设计策略能力
- 如何做测试框架选型？何时用`jest`？何时用`jest-in-case`？锻炼你的预研探索能力

---

# 如何使用

- 测试规划设计
- 使用建议
- 调试

---

测试规划设计：
- 版本前期做到测试用例覆盖业务主流程
- 版本后期测试用例沉淀，测试用例补充一些在边界场景下出现的bug
- 对于迭代很快、生命周期短的页面（商家活动页、运营页），不做前端测试
- 图表页面，一般不对图表做前端测试  
- 大粒度结合小粒度，大粒度测业务流程，小粒度测独立组件

---

大粒度：
- 通常是页面级别的，干扰项多，需要mock的依赖多
- 运行时间长
- 业务不变的情况下，重构代码，不需要修改测试代码
- 标题可以与需求点、QA测试点对应起来： `it('已知xxx，进行xxx，期望xxx', () => {})`

小粒度：
- 通常是组件、函数、类级别的，干扰项少
- 运行速度快
- 模块重构，相关的测试代码可能被重构或重写
- 标题对应组件的实现细节：`it('prop username work', () => {})`

---

对于组件测试：

1. 不要测试内部实现API，内部API在使用组件时对开发者是隐藏的，我们应该测试组件的使用场景，一般是测试传入的prop、slot，测试对外暴露的API，像浮层类组件可能还需要测试父组件销毁时，浮层类组件是否销毁。
2. 不要把所有的单测代码都写在一个用例里面，这样会导致很难阅读和维护，而且会降低单测运行速度。
3. 像`Math.random`、`new Date`等尽量不在单测中使用，因为这些API带有不确定性，应使用固定的具体值。

<div>

```js
describe('n-checkbox', () => {
  it('should work with `label` prop', async () => {})

  it('should work with `on-update:checked` & `onUpdateChecked` prop', () => {})

  it('should work with default slots', async () => {})
  
  it('should show correct style with `NForm` component', () => {})

  describe('accessibility', () => {
    it('should have a role of "checkbox"', () => {})

    it('should set a default aria-labelledby', () => {})
  })
})
```
</div>

---

测试代码不完善导致测试是通过的，但是功能是有bug的。

<div class="flex">

```js
/** 期望实现 */
function test (a, b) {
  return a ** b;
}
```
<div v-click></div>
<div v-after style="margin-left: 50px;">

```js
/** 错误实现 */
function test (a, b) {
  return a * b;
}
```
</div>
</div>

<div class="flex">
<div v-click></div>
<div v-after>

Bad：
```js
// 测试通过，并且覆盖率100%，以为很完美。
describe('测试test函数', () => {
  it('测试传两个参数', () => {
    expect(test(2, 2)).toBe(4);
    expect(test(0, 2)).toBe(0);
  });
});
```
</div>
<div v-click></div>
<div v-after style="margin-left: 60px;">

Good：
```js
// 应该根据使用场景来写
describe('测试test函数', () => {
  it('测试传两个参数', () => {
    expect(test(2, 2)).toBe(4); // 参数相等
    expect(test(0, 2)).toBe(0); // 第一个参数为0
    expect(test(2, 0)).toBe(1); // 第二个参数为0
    expect(test(2, 3)).toBe(8); // 参数不相等
    expect(test(4 -1)).toBe(0.25); // 参数可能为负数
  });
  it('测试传一个参数', () => {});
  it('测试不传参', () => {});
});
```
</div>
</div>

---

对应到vue组件：
```js {all|9|all}
describe('Button', () => {
  const ButtonMount = (options) => mount(IxButton, { ...options })

  test('prop mode work', async () => {
    const wrapper = ButtonMount({ props: { mode: 'primary' } })

    expect(wrapper.classes()).toContain('ix-button-primary')

    await wrapper.setProps({ mode: 'dashed' }) // 通过setProps切换使用场景

    expect(wrapper.classes()).toContain('ix-button-dashed')

    await wrapper.setProps({ mode: 'link' })

    expect(wrapper.classes()).toContain('ix-button-link')
  })
})
```
<span v-click></span><span v-after>你觉得上面这段单测有什么不足？</span>

---

调试技巧：指定执行某一个组件的单测

```js {12,13}
export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        configFile: path.resolve(__dirname, './cypress/vite.config.ts'),
      },
    },
    indexHtmlFile: path.resolve(__dirname, './cypress/support/component-index.html'),
    supportFile: path.resolve(__dirname, './cypress/support/component.ts'),
    // specPattern: 'packages/**/*.cy.ts',
    specPattern: 'packages/**/button.cy.ts',
  },
})
```

---

调试技巧：指定执行某一条测试用例

```js {6,7}
describe('Button', () => {
  const ButtonMount = (options) => mount(IxButton, { ...options })

  renderWork(IxButton)

  // test('mode work', async () => {})
  test.only('mode work', async () => {})

  test('danger work', async () => {})

  test('ghost work', async () => {})
})
```

dddd：
- `vitest`、`jest`支持断点调试
- `cypress`需要使用`cy.pause()`、`cy.debug()`进行调试

---

vitest和cypress的一些对比：

```js
// 模拟某个函数实现
const beforeClose = vi.fn().mockResolvedValue(false)
expect(beforeClose).toHaveBeenCalledTimes(1)
beforeClose.mockResolvedValue(true)
// cypress
const beforeClose = cy.stub().returns(false) // cy.spy(() => false)
expect(beforeClose).to.be.calledOnce
beforeClose.returns(true)

// 模拟延时
const sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))
await sleep(300)
// cypress
cy.wait(300)

// 判断元素是否可见
const isShow = (wrapper) => {
  return window.getComputedStyle(wrapper.element).display !== 'none'
}
expect(isShow(wrapper.find('.ix-back-top'))).toBe(false)
// cypress
cy.get('.ix-back-top').should('not.be.visible')
```

---

# 落地效果

cypress的测试用例即Demo文档：新人接手项目、接手模块，上手可以更快。

<img src="/cypress.jpg" alt="">

引入项目不到一月，发现弹窗组件的一个历史遗留Bug，当即修复，缺陷左移的作用发挥了。

---

## 带来的问题

- 引入项目会增加使用成本，不同测试框架，API存在差异，需要学习上手
- 写单测会加工作量，不会加工资
- 开发不愿意写，就像TypeScript不写类型写any一样，发挥不出单测的作用
- 一些防抖节流操作可能导致测试用例有时挂掉，有时通过，排查问题费时费力

<div v-click></div>
<div v-after>

1. 当项目沉淀的用例足够时，开发者一般可以从现有的用例参考。（其实这个问题不止体现在测试框架上，像公司有很多套自研组件库：idux、idux-vue2、ext-vue、vt-component、sf-vue、cloud-component、sase-component...都是成本）
</div>
<div v-click></div>
<div v-after>

2. 工作量评估的时候把写单测的时间算上
</div>
<div v-click></div>
<div v-after>

3. 做单测分享，鼓励大家写
</div>
<div v-click></div>
<div v-after>

4. 找下陈锐，有问题找陈锐
</div>

---

https://github.com/brenner8023

掘金分享文章，GitHub分享代码

<div class="flex" style="gap: 30px;">
  <div>
    <img src="/juejin.jpg" alt="" style="height: 150px; margin: 10px 0;">
    <img src="/juejin.svg" alt="" style="height: 200px;">
  </div>
  <div>
    <img src="/github.jpg" alt="" style="height: 150px; margin: 10px 0;">
    <img src="/github.svg" alt="" style="height: 200px;">
  </div>
</div>
