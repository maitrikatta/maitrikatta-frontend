function observeLastDiv(lastDiv) {
  const options = {
    rootMargin: '100px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(callback, options);
  console.log(lastDiv);
  observer.observe(lastDiv);
  function callback(entries, ob) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('load more');
        observer.unobserve(entry.target);
      }
    });
  }
}
export default observeLastDiv;
