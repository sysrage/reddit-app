(async () => {
  const cookies = Object.fromEntries(
    document.cookie
      .split('; ')
      .map(s => s.split('='))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
  document.querySelector('#reddit_access_token').textContent = cookies['reddit_access_token'];
  document.querySelector('#reddit_token_expires').textContent = cookies['reddit_token_expires'];
  document.querySelector('#reddit_refresh_token').textContent = cookies['reddit_refresh_token'];

  document.querySelector('#reddit_api_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const rEndpoint = document.querySelector('#reddit_endpoint').value;
    const elRawOutput = document.querySelector('.raw_output');
    try {
      const res = await fetch(`/reddit-api?endpoint=${rEndpoint}`);
      const data = await res.text();
      try {
        const jsonData = JSON.parse(data);
        elRawOutput.textContent += `\n## Endpoint ${rEndpoint}:\n`;
        elRawOutput.textContent += JSON.stringify(jsonData, null, 4);
      } catch (error) {
        elRawOutput.textContent += `\n## Endpoint ${rEndpoint}:\n`;
        elRawOutput.textContent += data;
      }
      elRawOutput.textContent += '\n';
      elRawOutput.scrollTop = elRawOutput.scrollHeight;
      elRawOutput.scrollLeft = 0;
    } catch (error) {
      console.log('error', error);
    }
  });

})();
