// Modelo inicial do service worker para copiar e completar.

// Complete cada TODO durante a atividade.



const NOME_DO_CACHE = 'cache-do-app-v1';



// TODO: acrescente somente caminhos de arquivos que já existem no projeto.

const ARQUIVOS_DO_APP = [

  './',

  'index.html',

  'style.css',

  'script.js',

  'manifest.webmanifest'

];



self.addEventListener('install', function (evento) {

  // TODO: abra o cache e salve ARQUIVOS_DO_APP com cache.addAll().

  console.log('Service worker instalado.');

});



self.addEventListener('activate', function (evento) {

  // TODO: remova caches cujo nome seja diferente de NOME_DO_CACHE.

  console.log('Service worker ativado.');

});



self.addEventListener('fetch', function (evento) {

  // TODO: procure a solicitação no cache e use a rede como alternativa.

});