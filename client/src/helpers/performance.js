export function debounce(event, ms) {
  let timeout;
  return function () {
    const eventCall = () => event.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(eventCall, ms);
  };
}
