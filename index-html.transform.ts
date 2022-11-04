/*
 * index-html.transform.ts
 * This exists to modify index.html, after build, for prod,
 * to insert the google tag manager
 */
import { TargetOptions } from '@angular-builders/custom-webpack';
import { environment } from './src/environments/environment.prod';

export default (targetOptions: TargetOptions, indexHtml: string) => {
  let insertTag = `<!-- No script for gtm, non-prod -->`;
  if (targetOptions.configuration || 'production') {
    insertTag = `<script nonce=CSP_NONCE src=https://www.googletagmanager.com/gtm.js?id=${environment.gtmTag} async></script>`;
  }

  const i = indexHtml.indexOf('</head>');
  return `${indexHtml.slice(0, i)}
            ${insertTag}
            ${indexHtml.slice(i)}`;
};