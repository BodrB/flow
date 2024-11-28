import React from "react";
import ResizeObserver from "resize-observer-polyfill";

// Make React globally available for your test environment
global.React = React;

// Make ResizeObserver globally available
global.ResizeObserver = ResizeObserver;
