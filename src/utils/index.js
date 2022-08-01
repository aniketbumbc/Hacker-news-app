/**
 *  Method take iso timestamp and convert into en-us locale date
 * @param {*} timestamp
 */

export const convertDateTime = (timestamp) => {
  const actualDate = new Date(timestamp * 1000).toLocaleDateString('en-US');
  return actualDate;
};

export const debounce = (func, wait, immediate, args) => {
  let timeout;

  return () => {
    const context = this;
    const callNow = immediate && !timeout;
    const laterCall = () => {
      if (!immediate) func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(laterCall, wait);

    if (callNow) func.apply(context, args);
  };
};
