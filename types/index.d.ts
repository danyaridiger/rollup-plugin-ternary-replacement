import { SourceMap } from "magic-string";

/**
 * Plugin options
 */
export interface PluginOptions {
  exclude?: string[];
  excludeExtentions?: string[];
  includeSourceMap?: boolean;
  nonNullMergesOnly?: boolean;
  assignmentsOnly?: boolean;
}

/**
 * Plugin transform method
 */
export interface PluginTransform {
  transform(code: string, path: string): PluginTransformResult;
}

/**
 * Plugin transform result
 */
export interface PluginTransformResult {
  code: string;
  map?: SourceMap;
}

/**
 * Root type
 */
declare function rollupPluginTernaryReplacement(
  options: PluginOptions
): PluginTransform;