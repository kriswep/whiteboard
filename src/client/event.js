// eslint-disable-next-line import/prefer-default-export
export function addListenerMulti(el, s, fn) {
  if (el && s && fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
  }
}
