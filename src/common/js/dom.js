export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  } else {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }

}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)

}

export function getOrSetAttributeData (element, name, value) {

  let prefix = 'data-',
    fullname = prefix + name

  if (value) {
    return element.setAttribute(fullname, value)

  } else {
    return element.getAttribute(fullname)
  }

}



