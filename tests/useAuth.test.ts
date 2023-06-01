import { beforeAll, describe, expect, jest, test } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import useFirebase from "../hooks/useFirebase";
import useAuth from "../hooks/useAuth";
import { act } from "react-dom/test-utils";

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

  test("a new user can be registered and automatically receives a logged-in session", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    await act(async () => {
      await result.current.registerUser("user@example.com", "123456");
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    expect(result.current.user?.email).toBe("user@example.com");
  });

  test("a new user can logout and login using his credentials", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    // clean previous session
    await act(async () => {
      await result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    // login
    await act(async () => {
      await result.current.login("user@example.com", "123456");
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });
  });

  test("a new user cannot be created with an existing email", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    await expect(
      result.current.registerUser("user@example.com", "123456")
    ).rejects.toThrowError();
  });

  test("a wrong password raises an error when trying to login", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    await expect(
      result.current.login("user@example.com", "123456-wrong")
    ).rejects.toThrowError();
  });

  test("the loading state returns to false after a failing login try", async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).not.toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    await expect(
      result.current.login("user@example.com", "123456-wrong")
    ).rejects.toThrowError();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });
  });
});
