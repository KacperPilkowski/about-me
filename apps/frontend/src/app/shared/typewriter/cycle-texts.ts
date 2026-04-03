import { Observable, concat, defer, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { eraseText, typeText } from './typewriter';

/**
 * Produces an infinite observable that cycles through phrases:
 * wait → erase current text → type next phrase → repeat.
 *
 * @param resolvePhrase  Called with the current cycle index; returns the phrase string to type.
 * @param getCurrentText Called just before each erase to get the current displayed text.
 * @param options        Timing overrides.
 */
export function cycleTexts(
  resolvePhrase: (index: number) => string,
  getCurrentText: () => string,
  options: { charDelay?: number; eraseDelay?: number; cycleDelay?: number } = {}
): Observable<string> {
  const { charDelay = 80, eraseDelay = 50, cycleDelay = 3000 } = options;
  let i = 0;
  const step = (): Observable<string> =>
    timer(cycleDelay).pipe(
      switchMap(() => {
        const phrase = resolvePhrase(i++);
        const current = getCurrentText();
        return concat(
          eraseText(current, eraseDelay),
          typeText(phrase, charDelay, 0),
          defer(step)
        );
      })
    );
  return step();
}
