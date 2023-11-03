import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Contextmenu from "./index";

describe("Contextmenu", () => {
  it("render contextmenu", () => {
    render(
      <div className="canvas">
        <div role="other" style={{ width: 300, height: 100 }}>other</div>
        <div
          id="container"
          role="container"
          style={{ width: 300, height: 300 }}
        >
          <Contextmenu
            targetId="container"
            menus={[
              {
                label: "Copy",
                key: ["⌘", "C"],
              },
              {
                label: "Paste",
                key: ["⌘", "V"],
              },
              {
                label: "Delete",
                key: ["⇧", "⌘", "D"],
                command: () => console.log("Delete"),
              },
              {
                label: "Setting",
                key: ["⇧", "⌘", "S"],
                command: () => console.log("Setting"),
              },
            ]}
          />
        </div>
      </div>
    );
    expect(screen.getByRole("container")).toBeTruthy();
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByText("Setting"));

    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 83,
      shiftKey: true,
      ctrlKey: true,
    });

    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 67,
      ctrlKey: true,
    });

    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 86,
      ctrlKey: true,
    });

    fireEvent.keyUp(screen.getByRole("container"));

    fireEvent.mouseDown(screen.getByRole("container"));

    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.contextMenu(screen.getByRole("other"));

    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByRole("other"));
  });
});
