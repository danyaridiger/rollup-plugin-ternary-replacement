import { SourceMap } from 'magic-string';

/**
 * Plugin options
 */
interface PluginOptions {
  exclude?: string[];
  excludeExtentions?: string[];
  includeSourceMap?: boolean;
  nonNullMergesOnly?: boolean;
  assignmentsOnly?: boolean;
}

/**
 * Plugin transform method
 */
interface PluginTransform {
  transform(code: string, path: string): PluginTransformResult;
}

/**
 * Plugin transform result
 */
interface PluginTransformResult {
  code: string;
  map?: SourceMap;
}

/**
 * Root type
 */
declare function rollupPluginTernaryReplacement(
  options: PluginOptions
): PluginTransform;

export { PluginOptions, PluginTransform, PluginTransformResult, rollupPluginTernaryReplacement as default };
