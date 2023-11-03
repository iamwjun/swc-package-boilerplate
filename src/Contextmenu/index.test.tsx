import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Contextmenu from "./index";

describe("Contextmenu", () => {
  it("render contextmenu", () => {
    render(
      <div className="canvas">
        <div role="other" style={{ width: 300, height: 100 }}>
          other
        </div>
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

    // test component render
    expect(screen.getByRole("container")).toBeTruthy();

    // text click copy menu
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByText("Copy"));

    // test click paste menu
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByText("Paste"));

    // test click delete menu
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByText("Delete"));

    // test click setting menu
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByText("Setting"));

    // test key combination: shift + ctrl + s
    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 83,
      shiftKey: true,
      ctrlKey: true,
    });

    // test key combination: shift + c
    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 67,
      ctrlKey: true,
    });

    // test key combination: ctrl + c
    fireEvent.keyDown(screen.getByRole("container"), {
      charCode: 86,
      ctrlKey: true,
    });

    // test keyUp
    fireEvent.keyUp(screen.getByRole("container"));

    // test mouseDown
    fireEvent.mouseDown(screen.getByRole("container"));

    // test contextmenu other area when contextmenu is show
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.contextMenu(screen.getByRole("other"));

    // test contextmenu when contextmenu is show
    fireEvent.contextMenu(screen.getByRole("container"), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.contextMenu(screen.getByRole("container"), {
      clientX: 100,
      clientY: 100,
    });

    // test click other area when contextmenu is show
    fireEvent.contextMenu(screen.getByRole("container"));
    fireEvent.click(screen.getByRole("other"));
  });
});
