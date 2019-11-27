import React from "react";
import { create } from "react-test-renderer"
import StatusWithHooks from "./StatusWithHooks";



describe("Status component", () => {
    const component = create(<StatusWithHooks status="test status"/>);
    it("status should be created successfully", () => {
        expect(component.toJSON()).toMatchSnapshot();
    })

    it("test", () => {
        expect(component.toJSON()).toMatchSnapshot();
    })
});