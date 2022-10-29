const dialog = (function () {
  let element, dialog, cancelBtn, okBtn;

const getNeedelementent = () => {
    element = document.querySelector('.dialog-wrapper');
    dialog = element.querySelector('.dialog');
    cancelBtn = element.querySelector('.cancel-btn');
    okBtn = element.querySelector('.ok-btn');
}

const show =(options = {}) => {
  let {
      content = 'Please entry content',
      okText = 'ok',
      cancelText = 'cancel',
      onOk = null,
      onCancel = null,
      maskDisabled = false
  } = options;

  const html = `
    <div class="dialog-wrapper">
      <div class="dialog">
        <div class="content">${content}</div>
        <div class="buttons">
          <div class="btn ok-btn">${okText}</div>
          <div class="btn cancel-btn">${cancelText}</div>
        </div>
      </div>
    </div>
  `;
  document.body.innerHTML += html;
  getNeedelementent();
  bindEvent(onOk, onCancel, maskDisabled);
  return element;
}

const bindEvent = (onOk, onCancel, maskDisabled) => {
  okBtn?.addEventListener('click', e => {
    hide();
    onOk && onOk();
  })
  cancelBtn?.addEventListener('click', e => {
    hide();
    onCancel && onCancel();
  })
  if (maskDisabled) {
    element.addEventListener('click', e => {
      let target = e?.target;
      if (/dialog-wrapper/.test(target.className)) {
        hide();
      }
    })
  }
}

const hide = () => {
  setTimeout(() => {
    element.remove();
  }, 200);
}
  return {
    show,
    hide
  }
})();

window.dialog = dialog;