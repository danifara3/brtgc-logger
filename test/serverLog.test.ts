import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { serverLog } from '../src/serverLog'; // adjust the path

describe('serverLog', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeAll(() => {
    process.env.NODE_ENV = 'development';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('logs to console with correct level and message', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await serverLog("Test message", { foo: "bar" }, { level: "debug" });

    expect(spy).toHaveBeenCalled();
    const args = spy.mock.calls[0];
    expect(args[0]).toContain('[DEBUG]');
    expect(args[1]).toContain('Test message');

    spy.mockRestore();
  });

  it('does not log if NODE_ENV is production and always is false', async () => {
    process.env.NODE_ENV = 'production';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await serverLog("Should not log", { level: "info" });

    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
    process.env.NODE_ENV = 'development'; // reset for next test
  });

  it('logs in production if always is true', async () => {
    process.env.NODE_ENV = 'production';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await serverLog("Force log in prod", { always: true });

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
    process.env.NODE_ENV = 'development';
  });
});
