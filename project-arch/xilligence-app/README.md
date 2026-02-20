# React Native Scheme Details Evaluation

This project implements a Mutual Fund Scheme Details screen following best practices for React Native (Expo) development. It closely follows the evaluation criteria guidelines using modular architecture and dynamic data mapping.

## Setup Steps
1. Clone the repository and navigate to the project directory.
2. Ensure you have the latest Node.js and Expo CLI installed.
3. Run `npm install` to install dependencies.
4. Run `npx expo start` to launch the development server.
5. Choose your target platform (iOS Simulator `i`, Android Emulator `a`, or Web `w`). *Note: Web support for `@shopify/react-native-skia` requires additional `Canvas` polyfills, so testing on a mobile simulator/device is highly recommended.*

## Architecture Explanation
- **`/src/components`**: Contains reusable feature components (`NavGraph`, `AccordionSection`, `SchemeHeader`, `ReturnAnalysis`, `ReturnCalculator`, `Riskometer`). Components are kept strictly generic where possible and state-contained.
- **`/src/screens`**: Contains main screen compositions. `SchemeDetailsScreen.tsx` orchestrates the parsing of JSON data into the subcomponents.
- **`/src/locales` & `/src/utils`**: Implemented `i18n-js` for localization to abstract string constants.
- **`/src/constants`**: Centralized dynamic theme properties (colors, typography sizing, spacing).
- **`/src/data`**: Houses the dummy `scheme.json` used for local testing.

## Assumptions Made
1. The Figma design specifically focuses on a clean layout with accordion behavior. We used modular toggles using Reanimated to simulate the exact layout flow constraints since images weren't perfectly available interactively.
2. Skia graph axes, tooltips, and pan-gestures weren't explicitly demanded beyond "Smooth curve rendering and proper scaling" so we mapped the `nav` and temporal data relative to graph size securely to show exact scaling dynamically.
3. The "Return Calculator" calculates fixed assumed SIP/Lump values using a base generic formulation since complex tax logic rules were not specified.
4. i18n translates primary static blocks but defers dynamically derived values (like Risk Level generic names) from the API.

## Time Taken
Implementation of all criteria items took roughly ~1 hour focusing on clean architecture segregation and typing overhead.

## Third Party Libraries used
- `@shopify/react-native-skia` - High performance graph rendering.
- `react-native-reanimated` - Fluid accordion and micro-interactions.
- `i18n-js`, `expo-localization` - Robust dictionary abstraction.
