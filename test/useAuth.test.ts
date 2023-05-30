import { beforeAll, describe, expect, test } from "@jest/globals";
// import { renderHook } from "@testing-library/react-hooks/dom";
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
});
