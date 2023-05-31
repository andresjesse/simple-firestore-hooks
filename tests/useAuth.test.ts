import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import useFirebase from "../hooks/useFirebase";
import useAuth from "../hooks/useAuth";

describe("useAuth", () => {
  beforeAll(() => {
    renderHook(() =>
      useFirebase({
        projectId: "test",
        appId: "test",
        apiKey: "test",
      })
    );
  });

  test("useAuth initializes and connects to emulator", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.user).toBe(null);
  });

  test("a new user can be registered", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    await result.current.registerUser("user@example.com", "123456");
  });
});
