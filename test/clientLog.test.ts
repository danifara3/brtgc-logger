import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { clientLog } from '../src/clientLog';

describe('clientLog', () => {
  let originalEnv: typeof process.env;

  beforeEach(() => {
    originalEnv = process.env;
    vi.resetModules();
    vi.stubGlobal('navigator', {
      userAgent: 'Vitest',
      platform: 'Test',
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('logs to console in development', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Mock NODE_ENV
    process.env = { ...originalEnv, NODE_ENV: 'development' };

    clientLog("Client side test", { level: "info" });

    expect(spy).toHaveBeenCalledOnce();
  });

  it('does not log in production', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    process.env = { ...originalEnv, NODE_ENV: 'production' };

    clientLog("Should not log", { level: "info" });

    expect(spy).not.toHaveBeenCalled();
  });

  it('sends to server when sendToServer is true', async () => {
    const fetchMock = vi.fn().mockResolvedValue({});
    vi.stubGlobal('fetch', fetchMock);

    process.env = { ...originalEnv, NODE_ENV: 'development' };

    clientLog("Client test", { level: "warn", sendToServer: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);

    expect(body.message).toContain("Client test");
    expect(body.level).toBe("warn");
    expect(body.userAgent).toBe("Vitest");
  });
});
