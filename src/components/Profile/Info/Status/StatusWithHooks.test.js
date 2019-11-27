import React from "react";
import { create, act } from "react-test-renderer"
import StatusWithHooks from "./StatusWithHooks";


describe("Status component", () => {
    let root;

    test("status from props should be in the state", () => {
       act(() => {
           root = create(<StatusWithHooks status="test status"/>)
       });

       expect(root.toJSON()).toMatchSnapshot();
    })
});