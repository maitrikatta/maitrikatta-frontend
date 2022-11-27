function observeLastDiv(lastDiv) {
  return new Promise((resolve, reject) => {
    const options = {
      rootMargin: '00px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(lastDiv);
    function callback(entries, ob) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          resolve('LOAD MORE');
        }
      });
    }
  });
}
export default observeLastDiv;
