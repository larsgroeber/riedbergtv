export function debounce(func: any, wait: number, immediate: boolean = false) {
  var timeout: any;
  return function() {
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func();
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func();
  };
}

export function isHTML(str: string) {
  var doc = new DOMParser().parseFromString(str, 'text/html');
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}

export function maybeParse(json: string | null | undefined): any {
  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {}
  }
}
