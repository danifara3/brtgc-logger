// test/timestampFormat.test.ts
import { describe, it, expect } from 'vitest';
import { formatTimestamp } from '../src/utils/timestampFormat';

describe('formatTimestamp', () => {
  it('returns timestamp in "YYYY-MM-DD HH:mm:ss" format', () => {
    const ts = formatTimestamp();
    expect(ts).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
});
