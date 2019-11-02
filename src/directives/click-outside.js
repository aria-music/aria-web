const isSp = (function () {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent
  return ua.indexOf('iPhone') > 0
    || ua.indexOf('iPad') > 0
    || ua.indexOf('iPod') > 0
    || ua.indexOf('Android') > 0
}());

const directive = {
  instances: [],
  events: isSp ? ['touchstart', 'click'] : ['click']
}

directive.onEvent = function (event) {
  directive.instances.forEach(({ el, callback }) => {
    if (event.target !== el && !el.contains(event.target) && directive.isOpen) {
      callback && callback()
    }
  })
}

directive.bind = function (el, binding) {
  const { callback, isOpen } = binding.value

  directive.isOpen = isOpen
  directive.instances.push({ el, callback })
  if (directive.instances.length === 1) {
    directive.events.forEach(e =>
      setTimeout(() => document.addEventListener(e, directive.onEvent), 0)
    )
  }
}

directive.unbind = function (el) {
  const index = directive.instances.findIndex((ins) => ins.el === el)
  if (index === -1) return

  directive.events.forEach(e => document.removeEventListener(e, directive.onEvent))
  directive.instances.splice(index, 1)
}

directive.update = function (el, binding) {
  const { callback, isOpen } = binding.value
  const instance = directive.instances.find(ins => ins.el === el)

  instance.callback = callback
  directive.isOpen = isOpen
}

export default directive