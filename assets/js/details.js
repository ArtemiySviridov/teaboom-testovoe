'use strict';

(() => {
  const details = document.querySelector('#product-details');
  if (!details) return;

  const tabList = details.querySelector('.details__tabs');
  if (!tabList) return;

  const tabs = [...tabList.querySelectorAll('.details__tab')];
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute('aria-controls')),
  );
  if (!tabs.length || panels.some((panel) => !panel)) return;

  function selectTab(index, focus = false) {
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[tabIndex].hidden = !active;
    });
    if (focus) tabs[index].focus({ preventScroll: true });
  }

  tabList.setAttribute('role', 'tablist');
  tabList.setAttribute('aria-label', 'Информация о чае');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      let next;
      switch (event.key) {
        case 'ArrowRight':
          next = (index + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          next = (index - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = tabs.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      selectTab(next, true);
    });
  });

  selectTab(0);
  tabList.hidden = false;
})();
