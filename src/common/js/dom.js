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

let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    } else {
      return false
    }
  }
})()

export function prefixStlye (style) {
  if (vendor === false) {
    return false
  } else if (vendor === 'standard') {
    return stye
  } else {
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
  }

}





