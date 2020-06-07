import React from "react";
import { create, act } from "react-test-renderer"
import StatusWithHooks from "./StatusWithHooks";


describe("Status component", () => {
    const componentStatusText = "test status";
    const component = create(<StatusWithHooks editingAbility={true} status={componentStatusText}/>);

    it("status should be created successfully", () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("status double click should be work", () => {
        let status = component.root.findByProps({className: "status status_editingAbility"});

        act(() => {
            status.props.onDoubleClick();
        });

        let input = component.root.findByType("input");

        expect(input.props.value).toBe(componentStatusText)
    });
});