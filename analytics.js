import { datadogRum } from '@datadog/browser-rum'

if (window.applicationEnvironment !== 'local') {
    datadogRum.init({
        applicationId: 'f5f86a83-92b7-4cc1-adb2-8bdd4a71846b',
        clientToken: 'pubc055aa0a88f8f27eda206ba0fbc1a4be',
        site: 'datadoghq.eu',
        service: 'savant',
        env: window.applicationEnvironment || 'unknown',
        // Specify a version number to identify the deployed version of your application in Datadog
        version: window.baseDeploy,
        sampleRate: 50,
        premiumSampleRate: 0,
        trackInteractions: true,
    })
}
