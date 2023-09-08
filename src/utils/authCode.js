// Original code from https://github.com/Argo-Client/Web-Archived/blob/main/src/magister/getAuthCode.ts
// Fix by Discord user @harrydekat (672910889535668225) in channel #magister-api (845264701624418325) on the Gemairo guild (711261718315008082)

const baseUrl = 'https://accounts.magister.net';

var accountJsUrl;
var authCode;

const jsURL = async () => {
  var returnUrl = encodeURIComponent(
    '/connect/authorize/callback?client_id=iam-profile&redirect_uri=https://accounts.magister.net/&response_type=id_token token&scope=openid profile email magister.iam.profile&state=a&nonce=a'
  );
  var url = `${baseUrl}/account/login?returnUrl=${returnUrl}`;
  var res = await fetch(url);

  var html = await res.text();
  return baseUrl + '/' + html.match(/js\/account-.*\.js/)[0];
};

const authCodeFromUrl = async (url) => {
  var res = await fetch(url);
  if (res.status === 200) {
    var js = await res.text();
    var tokens = JSON.parse(js.match(/\["[\d\w]*","[\d\w]*","[\d\w]*","[\d\w]*"\]/gm).reverse()[0]);
    var which = JSON.parse(js.match(/\["\d","\d"\]/));
    return which.map((g) => tokens[parseInt(g)]).join('');
  }
  throw new Error(`res.status != 200, status: ${res.status}`);
};

const getAuthCode = async () => {
  var newUrl = await jsURL();
  if (authCode && newUrl == accountJsUrl) {
    return authCode;
  }
  accountJsUrl = newUrl;
  authCode = await authCodeFromUrl(newUrl);
  return authCode;
};

export { getAuthCode };
