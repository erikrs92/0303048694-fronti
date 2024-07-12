module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // Deja los resultados de las pruebas en el navegador
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage-istanbul'],
    junitReporter: {
      outputDir: require('path').join(__dirname, 'test-results'), // results will be saved as $outputDir/$browserName.xml
     outputFile: 'junit.xml', 
     useBrowserName: false
   },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    //eporters: ['progress', 'kjhtml'],
     // the default configuration 
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Observa archivos y ejecuta pruebas en cambios
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    browsers: ['ChromeHeadlessNoSandbox',], //ChromeHeadless.  Puedes añadir 'PhantomJS' si aún lo utilizas
    flags: ['--no-sandbox','--disable-setuid-sandbox', '--disable-gpu', '--disable-translate', '--disable-extensions'],
    singleRun: true, // Ejecuta pruebas una sola vez si se configura a true
    concurrency: Infinity, // Permite una cantidad infinita de instancias de navegador
    restartOnFileChange: true // Reinicia los navegadores si cambian los archivos de pruebas
  });
};
