import { EMPTY, Observable, interval, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

/**
 * Types text character by character.
 * @param text     The string to type.
 * @param charDelay  Milliseconds between characters (default 80).
 * @param startDelay Milliseconds before the first character (default 0).
 */
export function typeText(text: string, charDelay = 80, startDelay = 0): Observable<string> {
  const chars = text.split('');
  if (!chars.length) return EMPTY;
  return timer(startDelay).pipe(
    switchMap(() =>
      interval(charDelay).pipe(
        take(chars.length),
        map(i => chars.slice(0, i + 1).join(''))
      )
    )
  );
}

/**
 * Erases text character by character from the right.
 * @param text      The string to erase.
 * @param charDelay Milliseconds between each erasure step (default 50).
 */
export function eraseText(text: string, charDelay = 50): Observable<string> {
  if (!text) return EMPTY;
  return interval(charDelay).pipe(
    take(text.length),
    map(i => text.slice(0, text.length - i - 1))
  );
}
