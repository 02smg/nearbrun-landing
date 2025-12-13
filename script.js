// 간단한 스크립트: CTA 스무스 스크롤 및 버튼 애니메이션
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // 작은 등장 애니메이션
  // Fade the whole page in
  setTimeout(()=>{
    document.body.classList.add('visible');
  }, 80);

  // Countdown to Dec 31 (현재 연도 기준, 지난 경우 다음 연도로 설정)
  function initCountdown(){
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    if(!daysEl || !hoursEl) return;

    function update(){
      const now = new Date();
      let target = new Date(now.getFullYear(), 11, 31, 0, 0, 0);
      if(now > target) target = new Date(now.getFullYear()+1, 11, 31, 0, 0, 0);
      const diff = target - now;
      if(diff <= 0){
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }
      const s = Math.floor(diff/1000);
      const days = Math.floor(s / (3600*24));
      const hours = Math.floor((s % (3600*24)) / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = s % 60;

      daysEl.textContent = String(days);
      hoursEl.textContent = String(hours).padStart(2,'0');
      minsEl.textContent = String(mins).padStart(2,'0');
      secsEl.textContent = String(secs).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);
  }

  initCountdown();

  // visual tweaks: animate seconds tick only (no CTA on minimal page)
  const secsEl = document.getElementById('seconds');
  if(secsEl) secsEl.classList.add('seconds-anim');
});
