/**
 * SVG Utility Suite for NexVora SVG
 * Handles formatting, minification, SVGO-style optimization, React JSX conversion, Data URI, and canvas image export.
 */

export interface SvgStats {
  byteSize: number;
  formattedSize: string;
  width?: string;
  height?: string;
  viewBox?: string;
  elementsCount: number;
  pathsCount: number;
  hasGradients: boolean;
  isValid: boolean;
  error?: string;
}

export interface OptimizerOptions {
  removeXmlProcInst: boolean;
  removeComments: boolean;
  removeMetadata: boolean;
  removeDoctype: boolean;
  removeTitleDesc: boolean;
  removeEmptyAttrs: boolean;
  removeHiddenElements: boolean;
  collapseGroups: boolean;
  roundDecimals: boolean;
  decimalPlaces: number;
  convertColors: boolean;
  cleanupIds: boolean;
  removeUselessStrokeAndFill: boolean;
}

export const defaultOptimizerOptions: OptimizerOptions = {
  removeXmlProcInst: true,
  removeComments: true,
  removeMetadata: true,
  removeDoctype: true,
  removeTitleDesc: false,
  removeEmptyAttrs: true,
  removeHiddenElements: true,
  collapseGroups: true,
  roundDecimals: true,
  decimalPlaces: 2,
  convertColors: true,
  cleanupIds: false,
  removeUselessStrokeAndFill: false,
};

/**
 * Format / Prettify SVG XML with clean indentation and line breaks
 */
export function formatSvg(svgString: string): string {
  try {
    let clean = svgString
      .replace(/>\s*</g, '><')
      .replace(/<!--[\s\S]*?-->/g, (match) => match.trim())
      .trim();

    let formatted = '';
    let indentLevel = 0;
    const indent = '  ';

    // Tokenize tags
    const reg = /(<\/?[^>]+>)|([^<]+)/g;
    let match;

    while ((match = reg.exec(clean)) !== null) {
      const token = match[0];

      if (token.startsWith('</')) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
        formatted += '\n' + indent.repeat(indentLevel) + token;
      } else if (token.startsWith('<') && !token.startsWith('<!') && !token.startsWith('<?')) {
        // Tag
        const isSelfClosing = token.endsWith('/>');
        formatted += (formatted ? '\n' : '') + indent.repeat(indentLevel) + token;
        if (!isSelfClosing) {
          indentLevel++;
        }
      } else if (token.startsWith('<?') || token.startsWith('<!')) {
        // Processing instruction or doctype or comment
        formatted += (formatted ? '\n' : '') + indent.repeat(indentLevel) + token;
      } else {
        // Text node
        const text = token.trim();
        if (text) {
          formatted += text;
        }
      }
    }

    return formatted || svgString;
  } catch {
    return svgString;
  }
}

/**
 * Minify SVG by stripping whitespace between tags and collapsing spaces
 */
export function minifySvg(svgString: string): string {
  return svgString
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments
    .replace(/>\s+</g, '><') // remove whitespace between tags
    .replace(/\s{2,}/g, ' ') // collapse multiple spaces to one
    .replace(/\s*([=:,{}])\s*/g, '$1') // trim around symbols
    .trim();
}

/**
 * Perform high-fidelity SVGO-style optimization in the browser
 */
export function optimizeSvg(svgString: string, options: Partial<OptimizerOptions> = {}): string {
  const opts = { ...defaultOptimizerOptions, ...options };
  let result = svgString;

  if (opts.removeXmlProcInst) {
    result = result.replace(/<\?xml[\s\S]*?\?>/gi, '');
  }

  if (opts.removeDoctype) {
    result = result.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
  }

  if (opts.removeComments) {
    result = result.replace(/<!--[\s\S]*?-->/g, '');
  }

  if (opts.removeMetadata) {
    result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
  }

  if (opts.removeTitleDesc) {
    result = result
      .replace(/<title[\s\S]*?<\/title>/gi, '')
      .replace(/<desc[\s\S]*?<\/desc>/gi, '');
  }

  if (opts.removeEmptyAttrs) {
    result = result.replace(/\s+([a-zA-Z0-9_-]+)=""/g, '');
  }

  if (opts.roundDecimals) {
    const places = opts.decimalPlaces ?? 2;
    // Round floating point numbers in attributes
    result = result.replace(/(\d+\.\d{3,})/g, (m) => {
      const num = parseFloat(m);
      return isNaN(num) ? m : parseFloat(num.toFixed(places)).toString();
    });
  }

  if (opts.convertColors) {
    // Convert 6-digit hex to 3-digit hex where possible: #ffffff -> #fff
    result = result.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3\b/g, '#$1$2$3');
    result = result.replace(/rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/gi, '#fff');
    result = result.replace(/rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)/gi, '#000');
  }

  if (opts.collapseGroups) {
    // Remove empty groups <g></g> or <g />
    result = result.replace(/<g[^>]*>\s*<\/g>/gi, '');
    result = result.replace(/<g\s*\/>/gi, '');
  }

  return formatSvg(result);
}

/**
 * Convert SVG kebab-case attributes to React JSX camelCase attributes
 */
const attributeMap: Record<string, string> = {
  class: 'className',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'alignment-baseline': 'alignmentBaseline',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'vector-effect': 'vectorEffect',
  'shape-rendering': 'shapeRendering',
  'letter-spacing': 'letterSpacing',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
  tabindex: 'tabIndex',
  crossorigin: 'crossOrigin',
};

export interface ReactExportOptions {
  componentName: string;
  typescript: boolean;
  target: 'react' | 'react-native';
  memo: boolean;
  passProps: boolean;
}

export function svgToReact(svgString: string, options: Partial<ReactExportOptions> = {}): string {
  const opts: ReactExportOptions = {
    componentName: 'SvgIcon',
    typescript: true,
    target: 'react',
    memo: false,
    passProps: true,
    ...options,
  };

  // Convert attributes to JSX camelCase
  let jsx = svgString;

  Object.entries(attributeMap).forEach(([kebab, camel]) => {
    const reg = new RegExp(`\\b${kebab}=`, 'g');
    jsx = jsx.replace(reg, `${camel}=`);
  });

  // Convert inline styles like style="stop-color: #f00; opacity: 0.5" to style={{ stopColor: '#f00', opacity: 0.5 }}
  jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr) => {
    const rules = styleStr
      .split(';')
      .map((r: string) => r.trim())
      .filter(Boolean);
    const objProps = rules.map((r: string) => {
      const [key, val] = r.split(':').map((s: string) => s.trim());
      const camelKey = key.replace(/-([a-z])/g, (_: string, l: string) => l.toUpperCase());
      return `${camelKey}: '${val}'`;
    });
    return `style={{ ${objProps.join(', ')} }}`;
  });

  if (opts.target === 'react-native') {
    // React Native SVG conversion
    let rnImports = new Set<string>(['Svg']);
    const tags = ['Path', 'G', 'Rect', 'Circle', 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Text', 'Defs', 'LinearGradient', 'RadialGradient', 'Stop', 'ClipPath'];
    tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      if (new RegExp(`<${lower}[\\s>]`, 'i').test(jsx)) {
        rnImports.add(tag);
        // Replace lowercase tag with uppercase
        jsx = jsx.replace(new RegExp(`<${lower}\\b`, 'gi'), `<${tag}`);
        jsx = jsx.replace(new RegExp(`</${lower}>`, 'gi'), `</${tag}>`);
      }
    });

    jsx = jsx.replace(/<svg\b/i, '<Svg');
    jsx = jsx.replace(/<\/svg>/i, '</Svg>');

    if (opts.passProps) {
      jsx = jsx.replace('<Svg', '<Svg {...props}');
    }

    const typeDef = opts.typescript ? ': React.FC<SvgProps>' : '';
    const propArg = opts.passProps ? (opts.typescript ? 'props: SvgProps' : 'props') : '';
    const importType = opts.typescript ? ', { SvgProps }' : '';

    return `import React from 'react';\nimport Svg, { ${Array.from(rnImports).filter((t) => t !== 'Svg').join(', ')} }${importType} from 'react-native-svg';\n\nexport const ${opts.componentName}${typeDef} = (${propArg}) => (\n  ${jsx.trim()}\n);\n\nexport default ${opts.memo ? `React.memo(${opts.componentName})` : opts.componentName};\n`;
  }

  // Standard React JSX
  if (opts.passProps) {
    jsx = jsx.replace(/<svg\b/i, '<svg {...props}');
  }

  const typeDef = opts.typescript ? ': React.FC<React.SVGProps<SVGSVGElement>>' : '';
  const propArg = opts.passProps ? (opts.typescript ? 'props: React.SVGProps<SVGSVGElement>' : 'props') : '';

  let code = `import React from 'react';\n\n`;
  code += `export const ${opts.componentName}${typeDef} = (${propArg}) => (\n`;
  code += `  ${formatSvg(jsx).split('\n').join('\n  ')}\n`;
  code += `);\n\n`;
  code += `export default ${opts.memo ? `React.memo(${opts.componentName})` : opts.componentName};\n`;

  return code;
}

/**
 * Generate Data URI representations
 */
export function svgToDataUri(svgString: string, type: 'utf8' | 'base64' = 'utf8'): string {
  const minified = minifySvg(svgString);
  if (type === 'base64') {
    try {
      const b64 = btoa(unescape(encodeURIComponent(minified)));
      return `data:image/svg+xml;base64,${b64}`;
    } catch {
      return '';
    }
  }

  // UTF-8 URI encoding
  const encoded = encodeURIComponent(minified)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml;utf8,${encoded}`;
}

/**
 * Generate CSS and HTML Snippets
 */
export function getCssSnippet(svgString: string): string {
  const uri = svgToDataUri(svgString, 'utf8');
  return `background-image: url("${uri}");\nbackground-repeat: no-repeat;\nbackground-size: contain;`;
}

export function getHtmlImageSnippet(svgString: string, alt = 'SVG Graphic'): string {
  const uri = svgToDataUri(svgString, 'utf8');
  return `<img src="${uri}" alt="${alt}" width="100%" height="auto" />`;
}

/**
 * Parse SVG and extract metadata & dimensions
 */
export function extractSvgStats(svgString: string): SvgStats {
  const byteSize = new Blob([svgString]).size;
  const formattedSize =
    byteSize < 1024
      ? `${byteSize} B`
      : `${(byteSize / 1024).toFixed(2)} KB`;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');

    if (parserError) {
      return {
        byteSize,
        formattedSize,
        elementsCount: 0,
        pathsCount: 0,
        hasGradients: false,
        isValid: false,
        error: parserError.textContent || 'Syntax error in SVG XML markup',
      };
    }

    const svgEl = doc.querySelector('svg');
    if (!svgEl) {
      return {
        byteSize,
        formattedSize,
        elementsCount: 0,
        pathsCount: 0,
        hasGradients: false,
        isValid: false,
        error: 'No <svg> root element found',
      };
    }

    const width = svgEl.getAttribute('width') || undefined;
    const height = svgEl.getAttribute('height') || undefined;
    const viewBox = svgEl.getAttribute('viewBox') || undefined;
    const elementsCount = doc.querySelectorAll('*').length - 1;
    const pathsCount = doc.querySelectorAll('path').length;
    const hasGradients = doc.querySelectorAll('linearGradient, radialGradient').length > 0;

    return {
      byteSize,
      formattedSize,
      width,
      height,
      viewBox,
      elementsCount,
      pathsCount,
      hasGradients,
      isValid: true,
    };
  } catch (err: unknown) {
    return {
      byteSize,
      formattedSize,
      elementsCount: 0,
      pathsCount: 0,
      hasGradients: false,
      isValid: false,
      error: err instanceof Error ? err.message : 'Failed to parse SVG',
    };
  }
}

/**
 * Export SVG directly to PNG, JPEG, or WebP bitmap using HTMLCanvasElement
 */
export function exportSvgToImage({
  svgString,
  format = 'png',
  scale = 2,
  bgColor = 'transparent',
  fileName = 'nexvora-graphic',
}: {
  svgString: string;
  format?: 'png' | 'jpeg' | 'webp';
  scale?: number;
  bgColor?: string;
  fileName?: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');

      if (!svgEl) {
        throw new Error('Invalid SVG: missing root <svg> element');
      }

      // Determine dimensions
      let width = 300;
      let height = 300;

      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).filter(Boolean).map(Number);
        if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
          width = parts[2];
          height = parts[3];
        }
      } else {
        const wAttr = parseFloat(svgEl.getAttribute('width') || '300');
        const hAttr = parseFloat(svgEl.getAttribute('height') || '300');
        if (!isNaN(wAttr) && wAttr > 0) width = wAttr;
        if (!isNaN(hAttr) && hAttr > 0) height = hAttr;
      }

      const canvasWidth = Math.round(width * scale);
      const canvasHeight = Math.round(height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas 2D context not available');
      }

      // Draw background if not transparent or if JPEG
      if (format === 'jpeg' || (bgColor && bgColor !== 'transparent')) {
        ctx.fillStyle = bgColor === 'transparent' ? '#ffffff' : bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // Create blob image
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        URL.revokeObjectURL(url);

        const mimeType =
          format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, 0.95);

        // Download trigger
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${fileName}.${format === 'jpeg' ? 'jpg' : format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        resolve();
      };

      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to render SVG onto canvas: ' + String(e)));
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Download SVG file directly
 */
export function downloadSvgFile(svgString: string, fileName = 'graphic.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.endsWith('.svg') ? fileName : `${fileName}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
