# Expo Camera State Access After Unmount

This repository demonstrates a bug in accessing the Expo Camera API's internal state after the component has unmounted.  The bug occurs when attempting to read properties such as `isRecording` from the camera after the component is no longer in the DOM. This results in a runtime error because the component's internal state is no longer accessible.  The solution involves using the `useEffect` hook with a cleanup function to ensure that any camera resources are released before the component unmounts, preventing these errors.

## Bug Description

Attempting to read the camera's state after it has unmounted, such as checking `isRecording`, results in an error because the state object is undefined.

## Solution

The provided solution uses the `useEffect` hook and its cleanup function to properly manage the camera's resources and prevent this error. The cleanup function ensures the camera is stopped and resources are released before the component is removed from the DOM.