(function () {
  let modalShown = false;

  function showModal() {
    if (modalShown) return;
    modalShown = true;

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    const modal = document.createElement('div');
    modal.style.background = '#fff';
    modal.style.color = '#000';
    modal.style.padding = '2rem';
    modal.style.borderRadius = '8px';
    modal.style.maxWidth = '400px';
    modal.style.textAlign = 'center';
    modal.style.fontFamily = 'sans-serif';

    const title = document.createElement('h2');
    title.innerText = 'Ad Blocker Detectado';

    const message = document.createElement('p');
    message.innerText = 'Este sitio se mantiene gracias a la publicidad. Por favor desactiva tu bloqueador de anuncios para continuar.';

    const button = document.createElement('button');
    button.innerText = 'Ya lo desactivé';
    button.style.backgroundColor = '#000';
    button.style.color = '#fff';
    button.style.padding = '0.75rem 1.5rem';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.fontSize = '.9rem';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
    button.style.transition = 'background-color 0.3s, transform 0.2s';

    button.onclick = () => window.location.reload();

    modal.appendChild(title);
    modal.appendChild(message);
    modal.appendChild(button);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  function createBaitScript(src) {
    const baitScript = document.createElement('script');
    baitScript.src = src;
    baitScript.async = true;

    baitScript.onerror = (e) => {
      const failedSrc = e?.target?.src;

      fetch(failedSrc, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            console.log(`[🚫] Script bloqueado por AdBlock (${failedSrc})`);
            showModal();
          } else {
            console.log(`[📛] Script no encontrado (${res.status})`);
          }
        })
        .catch((err) => {
          console.log(`[🚫] Script posiblemente bloqueado (${failedSrc})`, err);
          showModal();
        });
    };

    baitScript.onload = () => {
      console.log(`[✅] Script cargado correctamente (${src})`);
    };

    document.body.appendChild(baitScript);
  }

  createBaitScript('https://pagead2.googlesyndication.com/pagead/show_ads.js');
  createBaitScript('https://stats.g.doubleclick.net/dc.js');
})();
