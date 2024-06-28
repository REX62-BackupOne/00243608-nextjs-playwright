async function getlink(url, page) {
    const f1 = Date.now();
    try {
      if (url) {
        console.log("url is : "+ url)
        await page.goto('https://webtor.io/#/torrent-to-ddl');
        await page.keyboard.press('Enter');
        await wait(1000);
        await page.waitForSelector('#__BVID__67');
        await page.type('#__BVID__67', url);
        await wait(1000);
        await page.keyboard.press('Enter');
        await wait(1000);
  
        await page.waitForSelector('#app > div.content > div > div > div > div:nth-child(1) > div > div.card > div.card-body.header > div > a.btn.my-btn-link.zip');
        await page.click('#app > div.content > div > div > div > div:nth-child(1) > div > div.card > div.card-body.header > div > a.btn.my-btn-link.zip');
  
        const dllink = await page.evaluate(() => {
          const range = document.createRange();
          const element = document.querySelector('#download-modal___BV_modal_body_ > div > div > div.input-group.copy');
          range.selectNodeContents(element);
          const copiedValue = range.startContainer.children[1]._value;
          return copiedValue;
        });
  
        const link = convertToURL(dllink);
  
        const f2= Date.now();
        console.log((f2-f1)/1000)
        return { status: true, link: link };
      } else {
        return {
          status: false,
          error: 'please add url',
        };
      }
    } catch (error) {
      return { status: false, error: error };
    }
  }
  
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function convertToURL(url) {
    url = url.replace(/ /g, '%20');
    url = url.replace(/\[/g, '%5B');
    url = url.replace(/]/g, '%5D');
    url = url.replace('abra--7537cb52.api.nocturnal-narwhal.buzz', 'abra--7537ca20.api.nocturnal-narwhal.buzz');
    url = url.replace('abra--2d8fde14.api.nocturnal-narwhal.buzz', 'abra--7537ca20.api.nocturnal-narwhal.buzz');
    return url;
  }
  
  export default getlink;
  