module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // Deja los resultados de las pruebas en el navegador
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/my-app'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true, // Observa archivos y ejecuta pruebas en cambios
    browsers: ['FirefoxHeadless'], //ChromeHeadless.  Puedes añadir 'PhantomJS' si aún lo utilizas
    flags: ['--no-sandbox','--disable-setuid-sandbox', '--disable-gpu', '--disable-translate', '--disable-extensions'],
    singleRun: false, // Ejecuta pruebas una sola vez si se configura a true
    concurrency: Infinity, // Permite una cantidad infinita de instancias de navegador
    restartOnFileChange: true // Reinicia los navegadores si cambian los archivos de pruebas
  });
};
