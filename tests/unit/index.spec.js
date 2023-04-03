import createOutput from "../tools/create-output";

describe("rollup-plugin-ternary-replacement", () => {
  it("correctly transforms all given nodes", async () => {
    const dist = await createOutput();

    expect(dist).toMatchSnapshot();
  });


  it("correctly excludes files from transform", async () => {
    const dist = await createOutput({ exclude: ["exclude"] });

    expect(dist).toMatchSnapshot();
  });


  it("correctly excludes files from transform by extentions", async () => {
    const dist = await createOutput({ excludeExtentions: ["js"] });

    expect(dist).toMatchSnapshot();
  });


  it("correctly transforms only non null merges", async () => {
    const dist = await createOutput({ nonNullMergesOnly: true });

    expect(dist).toMatchSnapshot();
  });
  

  it("correctly transforms only logical assignments", async () => {
    const dist = await createOutput({ assignmentsOnly: true });

    expect(dist).toMatchSnapshot();
  });
});