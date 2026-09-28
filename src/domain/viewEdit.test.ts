import { closeCam, reopenCam } from "./viewEdit";

describe("closeCam", () => {
  it("removes the camera and remembers where it was", () => {
    expect(closeCam(["a", "b", "c"], "b")).toEqual({
      view: ["a", "c"],
      closed: { camId: "b", index: 1 },
    });
  });

  it("returns the view unchanged and nothing to undo when the camera is not open", () => {
    expect(closeCam(["a"], "z")).toEqual({ view: ["a"], closed: null });
  });
});

describe("reopenCam", () => {
  it("puts the camera back at the place it was closed from", () => {
    expect(reopenCam(["a", "c"], { camId: "b", index: 1 }, 4)).toEqual(["a", "b", "c"]);
  });

  it("puts the lead back in front", () => {
    expect(reopenCam(["b"], { camId: "a", index: 0 }, 4)).toEqual(["a", "b"]);
  });

  it("appends when the view has shrunk meanwhile", () => {
    expect(reopenCam([], { camId: "c", index: 2 }, 4)).toEqual(["c"]);
  });

  it("moves the camera to its old place when it was opened again meanwhile", () => {
    expect(reopenCam(["b", "a"], { camId: "b", index: 1 }, 4)).toEqual(["a", "b"]);
  });

  it("keeps the upper limit, dropping the last one", () => {
    expect(reopenCam(["a", "b", "c", "d"], { camId: "x", index: 0 }, 4)).toEqual([
      "x",
      "a",
      "b",
      "c",
    ]);
  });
});
