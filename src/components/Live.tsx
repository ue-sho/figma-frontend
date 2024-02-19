"use client";

import { useCallback } from "react";

import {  useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "@/components/cursor/LiveCursors";

const Live = () => {
  /**
   * useOthers returns the list of other users in the room.
   *
   * useOthers: https://liveblocks.io/docs/api-reference/liveblocks-react#useOthers
   */
  const others = useOthers();

  /**
   * useMyPresence returns the presence of the current user in the room.
   * It also returns a function to update the presence of the current user.
   *
   * useMyPresence: https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence
   */
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  // Listen to mouse events to change the cursor state
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    // get the cursor position in the canvas
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    // broadcast the cursor position to other users
    updateMyPresence({
      cursor: {
        x,
        y,
      },
    });
  }, []);

  // Hide the cursor when the mouse leaves the canvas
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({
      cursor: null,
      message: null,
    });
  }, []);

  // Show the cursor when the mouse enters the canvas
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    },
    []
  );


  return (
    <div
      className="h-[100vh] w-full flex items-center justify-center text-center border-2 border-gray-500"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
