(function () {
  var menuToggle = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');

  function closeMenu() {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  var MAIL = 'bell8asset@gmail.com';

  var inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();
        return;
      }

      var data = new FormData(inquiryForm);
      var name = (data.get('name') || '').trim();
      var email = (data.get('email') || '').trim();
      var phone = (data.get('phone') || '').trim();
      var category = (data.get('category') || '').trim();
      var message = (data.get('message') || '').trim();

      var subject = 'ホームページからのお問い合わせ（' + category + '）';
      var bodyLines = [
        'お名前：' + name,
        'メールアドレス：' + email,
        '電話番号：' + (phone || '（未入力）'),
        'ご相談の種類：' + category,
        '',
        'お問い合わせ内容：',
        message
      ];
      var body = bodyLines.join('\n');
      var mailtoUrl = 'mailto:' + MAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      var resultBox = document.getElementById('inquiry-result');
      var resultText = document.getElementById('inquiry-result-text');
      if (resultText) { resultText.value = '宛先：' + MAIL + '\n件名：' + subject + '\n\n' + body; }
      if (resultBox) { resultBox.hidden = false; resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }

      window.location.href = mailtoUrl;
    });
  }

  var copyBtn = document.getElementById('inquiry-copy-btn');
  if (copyBtn) {
    var copyOriginal = copyBtn.textContent;
    copyBtn.addEventListener('click', function () {
      var resultText = document.getElementById('inquiry-result-text');
      var text = resultText ? resultText.value : '';
      function done() {
        copyBtn.textContent = 'コピーしました';
        setTimeout(function () { copyBtn.textContent = copyOriginal; }, 3000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          if (resultText) { resultText.focus(); resultText.select(); }
        });
      } else if (resultText) {
        resultText.focus();
        resultText.select();
      }
    });
  }
})();
