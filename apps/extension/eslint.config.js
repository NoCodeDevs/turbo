import baseConfig from "@turbostarter/eslint-config/base";
import reactConfig from "@turbostarter/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...reactConfig];
