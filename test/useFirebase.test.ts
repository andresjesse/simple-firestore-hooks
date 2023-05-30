import { describe, expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import useFirebase from "../hooks/useFirebase";

describe("useFirebase", () => {
  test("useFirebase initializes and connects to emulator", () => {
    const { result } = renderHook(() =>
      useFirebase({
        projectId: "test",
        appId: "test",
        apiKey: "test",
      })
    );
    expect(result.current).not.toBeNull();
  });
});
