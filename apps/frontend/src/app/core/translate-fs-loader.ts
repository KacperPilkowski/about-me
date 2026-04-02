import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Filesystem-based TranslateLoader for SSR/prerender context.
 * Reads translation files directly from the public/assets directory,
 * which is the source for the Angular dev server and is copied to dist/ at build time.
 */
export class TranslateFsLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    const filePath = join(
      process.cwd(),
      'public',
      'assets',
      'i18n',
      `${lang}.json`
    );
    const data = JSON.parse(readFileSync(filePath, 'utf8')) as TranslationObject;
    return of(data);
  }
}
